import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import profilePhoto from '@/assets/sunil-bokare.png';

const ProfilePhoto = () => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Mouse position tracking for 3D effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), { stiffness: 300, damping: 30 });
  const scale = useSpring(isHovered ? 1.05 : 1, { stiffness: 400, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate mouse position relative to center (-0.5 to 0.5)
    const mouseX = (e.clientX - centerX) / rect.width;
    const mouseY = (e.clientY - centerY) / rect.height;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <div className="flex items-center justify-center p-8">
      <motion.div
        ref={ref}
        className="relative w-64 h-64 md:w-80 md:h-80 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          scale,
          transformStyle: 'preserve-3d',
          perspective: 1000,
        }}
      >
        {/* Main photo frame with glassmorphism */}
        <motion.div
          className="absolute inset-0 rounded-full overflow-hidden shadow-2xl"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
            backdropFilter: 'blur(20px)',
            border: '2px solid rgba(255,255,255,0.2)',
            boxShadow: isHovered
              ? '0 25px 50px -12px rgba(59, 130, 246, 0.5), 0 0 0 1px rgba(59, 130, 246, 0.1), inset 0 0 0 1px rgba(255,255,255,0.1)'
              : '0 20px 40px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255,255,255,0.1)',
          }}
          whileHover={{
            boxShadow: '0 30px 60px -12px rgba(59, 130, 246, 0.6), 0 0 0 1px rgba(59, 130, 246, 0.2), inset 0 0 0 1px rgba(255,255,255,0.2)',
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Profile photo */}
          <img
            src={profilePhoto}
            alt="Sunil Bokare"
            className="w-full h-full object-cover"
            style={{
              transform: 'translateZ(50px)',
            }}
          />

          {/* Gradient overlay */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, transparent 40%, rgba(59, 130, 246, 0.1) 100%)',
              opacity: isHovered ? 1 : 0.7,
            }}
            animate={{
              background: isHovered
                ? 'linear-gradient(135deg, transparent 30%, rgba(59, 130, 246, 0.2) 100%)'
                : 'linear-gradient(135deg, transparent 40%, rgba(59, 130, 246, 0.1) 100%)',
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Floating decorative elements */}
        <motion.div
          className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-80"
          animate={{
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            scale: { duration: 0.5, repeat: isHovered ? Infinity : 0 },
            rotate: { duration: 2, repeat: isHovered ? Infinity : 0, ease: "linear" },
          }}
          style={{
            boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)',
          }}
        />

        <motion.div
          className="absolute -bottom-2 -left-2 w-6 h-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-80"
          animate={{
            scale: isHovered ? [1, 1.3, 1] : 1,
            rotate: isHovered ? -360 : 0,
          }}
          transition={{
            scale: { duration: 0.6, repeat: isHovered ? Infinity : 0, delay: 0.1 },
            rotate: { duration: 2.5, repeat: isHovered ? Infinity : 0, ease: "linear", delay: 0.1 },
          }}
          style={{
            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.4)',
          }}
        />

        {/* Rotating ring effect */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{
            borderTopColor: 'rgba(59, 130, 246, 0.3)',
            borderRightColor: 'rgba(168, 85, 247, 0.3)',
            transform: 'translateZ(-20px)',
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{
            rotate: { duration: 3, repeat: isHovered ? Infinity : 0, ease: "linear" },
          }}
        />

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 30% 30%, rgba(59, 130, 246, 0.3), transparent 70%)',
            filter: 'blur(20px)',
          }}
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Particle effects */}
        {isHovered && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-blue-400"
                style={{
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [0, -20, -40],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </div>
  );
};

export default ProfilePhoto;
