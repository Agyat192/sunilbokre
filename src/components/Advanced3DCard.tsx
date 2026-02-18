import { motion, useMotionValue, useSpring, useTransform, useInView } from 'framer-motion';
import { useRef, useState } from 'react';

interface Advanced3DCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'extreme';
}

const Advanced3DCard = ({ children, className = "", intensity = 'medium' }: Advanced3DCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const isInView = useInView(ref, { once: false, amount: 0.3 });

  // Mouse position values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring animations
  const mouseX = useSpring(x, { stiffness: 100, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 100, damping: 20 });

  // Transform values based on intensity and screen size
  const isMobile = typeof window !== 'undefined' ? window.innerWidth <= 640 : false;
  
  const intensityMultipliers = {
    subtle: { rotate: isMobile ? 3 : 5, scale: isMobile ? 1.01 : 1.02, translate: isMobile ? 3 : 5 },
    medium: { rotate: isMobile ? 8 : 15, scale: isMobile ? 1.02 : 1.05, translate: isMobile ? 5 : 10 },
    extreme: { rotate: isMobile ? 12 : 25, scale: isMobile ? 1.03 : 1.1, translate: isMobile ? 10 : 20 }
  };

  const config = intensityMultipliers[intensity];

  // 3D transforms - reduced on mobile for better performance
  const rotateX = useTransform(mouseY, [-1, 1], [config.rotate, -config.rotate]);
  const rotateY = useTransform(mouseX, [-1, 1], [-config.rotate, config.rotate]);
  const translateX = useTransform(mouseX, [-1, 1], [-config.translate, config.translate]);
  const translateY = useTransform(mouseY, [-1, 1], [-config.translate, config.translate]);
  const scale = useSpring(isHovered ? config.scale : 1, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseXPos = (e.clientX - centerX) / (rect.width / 2);
    const mouseYPos = (e.clientY - centerY) / (rect.height / 2);
    
    x.set(mouseXPos);
    y.set(mouseYPos);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        perspective: isMobile ? '600px' : '1000px'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          translateX,
          translateY,
          scale,
          transformStyle: 'preserve-3d'
        }}
        className="relative w-full h-full"
      >
        {/* 3D Shadow - reduced on mobile */}
        <motion.div
          className="absolute inset-0 bg-black/20 rounded-2xl blur-xl"
          style={{
            transform: 'translateZ(-50px) rotateX(90deg)',
            opacity: isInView ? (isMobile ? 0.2 : 0.3) : 0
          }}
          animate={{ opacity: isInView ? (isMobile ? 0.2 : 0.3) : 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Main content */}
        <motion.div
          className="relative w-full h-full"
          style={{ transform: 'translateZ(0px)' }}
        >
          {children}
        </motion.div>

        {/* Floating particles when hovered - reduced on mobile */}
        {isHovered && intensity === 'extreme' && !isMobile && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary"
                style={{
                  left: `${20 + (i * 15)}%`,
                  top: `${20 + (i * 12)}%`
                }}
                animate={{
                  scale: [0, 1.5, 0],
                  opacity: [0, 1, 0],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Advanced3DCard;
