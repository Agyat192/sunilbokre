import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';

interface MouseParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
}

const MouseParallaxImage = ({ src, alt, className = '' }: MouseParallaxImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Image pans opposite to mouse — scale up to allow panning room
  const imgX = useTransform(smoothX, [0, 1], [8, -8], { clamp: true });
  const imgY = useTransform(smoothY, [0, 1], [8, -8], { clamp: true });
  const imgScale = useTransform(smoothX, [0, 0.5, 1], [1.18, 1.15, 1.18]);

  // Subtle 3D tilt
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  // Spotlight that follows cursor
  const spotlightX = useTransform(smoothX, [0, 1], [0, 100]);
  const spotlightY = useTransform(smoothY, [0, 1], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        mouseX.set(0.5);
        mouseY.set(0.5);
      }}
      style={{
        perspective: 800,
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
    >
      {/* Parallax image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover pointer-events-none"
        style={{
          x: imgX,
          y: imgY,
          scale: imgScale,
        }}
        initial={{ scale: 1.5, filter: 'blur(12px)' }}
        animate={{ scale: 1.15, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.2 }}
      />

      {/* Cursor spotlight overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) =>
              `radial-gradient(circle 200px at ${x}% ${y}%, transparent 0%, rgba(0,0,0,0.25) 100%)`
          ),
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Shimmer line that follows mouse X */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            spotlightX,
            (x) =>
              `linear-gradient(90deg, transparent ${Number(x) - 5}%, rgba(255,255,255,0.12) ${x}%, transparent ${Number(x) + 5}%)`
          ),
          opacity: isHovering ? 1 : 0,
        }}
      />

      {/* Hover hint */}
      <motion.div
        className="absolute bottom-3 right-3 px-2 py-1 rounded-md bg-background/60 backdrop-blur-sm text-xs text-muted-foreground"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovering ? 0 : 0.7 }}
        transition={{ delay: 1 }}
      >
        ✦ Hover to explore
      </motion.div>
    </motion.div>
  );
};

export default MouseParallaxImage;
