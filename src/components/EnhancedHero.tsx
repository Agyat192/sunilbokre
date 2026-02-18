import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { ArrowDown, Sparkles, Zap, Star, Rocket } from 'lucide-react';
import Advanced3DCard from './Advanced3DCard';
import ProfilePhoto from './ProfilePhoto';

const roles = [
  "Co-Founder @ Bhoomivardhan Agritech",
  "Full-Stack Developer",
  "IoT & AI Engineer",
  "System Architect",
  "ENTC Engineer"
];

const EnhancedHero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });

  const { scrollY } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollY, [0, 1], [0, 200]);
  const opacity = useTransform(scrollY, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollY, [0, 0.5], [1, 0.8]);

  // Track mouse position for background effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentText = roles[currentRole];

    if (isTyping) {
      if (displayText.length < currentText.length) {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setIsTyping(true);
      }
    }
  }, [displayText, isTyping, currentRole]);

  const scrollToWork = () => {
    document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Letter animation variants
  const letterVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.6, -0.05, 0.01, 0.99] as [number, number, number, number]
      }
    })
  };

  const name = "Sunil Bokare";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Advanced 3D Background with mouse tracking */}
      <div className="absolute inset-0">
        {/* Dynamic gradient orbs that follow mouse */}
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, hsl(var(--primary) / 0.15), transparent 50%)`,
            left: `${mousePosition.x - 20}%`,
            top: `${mousePosition.y - 20}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        <motion.div
          className="absolute w-96 h-96 rounded-full blur-[120px]"
          style={{
            background: `radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, hsl(0 0% 20% / 0.1), transparent 50%)`,
            right: `${mousePosition.x - 20}%`,
            bottom: `${mousePosition.y - 20}%`,
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        />

        {/* Floating geometric shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border border-primary/20"
            style={{
              left: `${15 + (i * 15)}%`,
              top: `${20 + (i * 12)}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
              x: [0, 20, -20, 0],
              y: [0, -20, 20, 0]
            }}
            transition={{
              duration: 10 + i * 2,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}

        {/* Particle field */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full bg-primary"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -100, -200]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          {/* Enhanced Badge with 3D effects */}
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.8, rotateX: -45 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
            transition={{
              duration: 0.8,
              type: "spring",
              bounce: 0.4
            }}
            whileHover={{ 
              scale: 1.05, 
              rotateZ: 2,
              boxShadow: "0 0 40px hsl(var(--primary) / 0.4)"
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass glow-sm mb-8 mx-auto lg:mx-0 relative overflow-hidden"
          >
            {/* Animated background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="relative z-10"
            >
              <Sparkles className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="text-sm text-muted-foreground relative z-10">Designing Secure & Scalable Digital Systems</span>
          </motion.div>

          {/* 3D Animated Name - Mobile Optimized */}
          <motion.h1
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 tracking-tight relative"
          >
            {name.split('').map((letter, i) => (
              <motion.span
                key={i}
                custom={i}
                variants={letterVariants}
                className={`inline-block ${letter === ' ' ? 'w-2 sm:w-4' : ''} ${i >= 6 ? 'text-gradient' : 'text-foreground'} relative`}
                whileHover={{
                  scale: window.innerWidth > 640 ? 1.2 : 1.1,
                  color: 'hsl(var(--primary))',
                  rotateZ: window.innerWidth > 640 ? [0, 5, -5, 0] : [0, 2, -2, 0],
                  transition: { duration: 0.3 }
                }}
              >
                {letter === ' ' ? '\u00A0' : letter}
                {/* 3D shadow effect - reduced on mobile */}
                <motion.div
                  className="absolute inset-0 bg-primary/10 blur-sm -z-10"
                  animate={{ opacity: [0, window.innerWidth > 640 ? 0.5 : 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
              </motion.span>
            ))}
          </motion.h1>

          {/* Enhanced Typing Animation - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="h-8 sm:h-10 md:h-12 lg:h-16 mb-6 sm:mb-8 flex items-center justify-center lg:justify-start"
          >
            <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground font-light relative">
              {displayText}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="inline-block w-0.5 h-4 sm:h-5 md:h-6 lg:h-8 bg-primary ml-1 align-middle"
              />
              {/* Typing glow effect - reduced on mobile */}
              <motion.div
                className="absolute -inset-1 sm:-inset-2 bg-primary/20 blur-sm"
                animate={{ opacity: [0, window.innerWidth > 640 ? 0.5 : 0.3, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </p>
          </motion.div>

          {/* Enhanced Description with word animations */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 mb-8 sm:mb-12 px-2 lg:px-0 relative"
          >
            {"I help startups build high-performance SaaS platforms, backend systems, and cloud infrastructure designed for long-term scale and security.".split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10, rotateX: -45 }}
                animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                transition={{ delay: 1.2 + i * 0.05, type: "spring" }}
                className="inline-block mr-1.5 relative"
                whileHover={{
                  scale: 1.1,
                  color: 'hsl(var(--primary))',
                  rotateZ: [0, 2, -2, 0]
                }}
              >
                {word}
                <motion.div
                  className="absolute inset-0 bg-primary/10 blur-sm -z-10"
                  animate={{ opacity: [0, 0.3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                />
              </motion.span>
            ))}
          </motion.p>

          {/* Enhanced CTA Buttons - Mobile Optimized */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4"
          >
            <motion.button
              onClick={scrollToWork}
              data-magnetic
              whileHover={{ 
                scale: window.innerWidth > 640 ? 1.05 : 1.02,
                y: window.innerWidth > 640 ? -2 : -1,
                boxShadow: window.innerWidth > 640 ? "0 10px 40px hsl(var(--primary) / 0.3)" : "0 5px 20px hsl(var(--primary) / 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden text-xs sm:text-sm lg:text-base"
            >
              {/* Animated background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary via-gray-600 to-primary"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ opacity: 0.3 }}
              />
              
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2">
                <Rocket className="w-4 h-4 sm:w-5 h-5" />
                <span className="hidden sm:inline">Request Architecture Review</span>
                <span className="sm:hidden">Get Review</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>

              {/* Hover particles - disabled on mobile for performance */}
              <AnimatePresence>
                {window.innerWidth > 640 && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-1 h-1 rounded-full bg-white"
                        style={{
                          left: `${20 + (i * 15)}%`,
                          top: '50%'
                        }}
                        animate={{
                          scale: [0, 1.5, 0],
                          opacity: [0, 1, 0],
                          y: [0, -20, -40]
                        }}
                        transition={{
                          duration: 1,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={scrollToContact}
              data-magnetic
              whileHover={{ 
                scale: window.innerWidth > 640 ? 1.05 : 1.02,
                y: window.innerWidth > 640 ? -2 : -1,
                boxShadow: window.innerWidth > 640 ? "0 10px 30px hsl(var(--muted-foreground) / 0.2)" : "0 5px 15px hsl(var(--muted-foreground) / 0.1)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3 lg:py-4 rounded-full glass font-medium transition-all duration-300 hover:shadow-xl hover:shadow-black/20 text-xs sm:text-sm lg:text-base relative overflow-hidden"
            >
              <span className="text-gradient relative z-10">Let's Collaborate</span>
              
              {/* Subtle background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Right Side - Enhanced 3D Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
          transition={{ duration: 1, delay: 0.5, type: "spring" }}
          className="order-first lg:order-last mb-10 lg:mb-0"
        >
          <Advanced3DCard intensity="extreme" className="w-full max-w-sm mx-auto md:mr-auto md:ml-0">
            <ProfilePhoto />
          </Advanced3DCard>
        </motion.div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground cursor-pointer"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          whileHover={{ scale: 1.1 }}
        >
          <motion.span
            className="text-sm font-medium"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll to explore
          </motion.span>
          <motion.div className="relative">
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <ArrowDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default EnhancedHero;
