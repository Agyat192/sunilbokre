import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef, useCallback } from 'react';

interface SectionMessage {
  id: string;
  message: string;
  emoji?: string;
}

const sectionMessages: Record<string, SectionMessage> = {
  hero: { id: 'hero', message: "Hey! I'm Sunil's AI — scroll down, there's more you'll like.", emoji: '👋' },
  about: { id: 'about', message: "You know the story now… want to connect or see what I've built?", emoji: '💡' },
  skills: { id: 'skills', message: "Skills are cool — but projects show real impact. Scroll down.", emoji: '👀' },
  clients: { id: 'clients', message: "Trusted by real teams — let's add yours to the list.", emoji: '🤝' },
  projects: { id: 'projects', message: "These solved real problems. Want to build something together?", emoji: '🚀' },
  techstack: { id: 'techstack', message: "The tech that powers innovation. Pretty cool, right?", emoji: '⚡' },
  contact: { id: 'contact', message: "Perfect timing. Let's talk.", emoji: '✨' },
};

const AIGuide = () => {
  const [currentSection, setCurrentSection] = useState<string>('hero');
  const [isVisible, setIsVisible] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [messageVisible, setMessageVisible] = useState(true);
  const [side, setSide] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState(false);
  const lastSectionRef = useRef<string>('hero');

  const posX = useMotionValue(0);
  const posY = useMotionValue(0);
  const springConfig = { stiffness: 100, damping: 25 };
  const x = useSpring(posX, springConfig);
  const y = useSpring(posY, springConfig);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const eyeX = useSpring(mouseX, { stiffness: 100, damping: 20 });
  const eyeY = useSpring(mouseY, { stiffness: 100, damping: 20 });

  const findBlankSpace = useCallback(() => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const aiSize = 100;
    const margin = 30;
    const container = document.querySelector('.max-w-6xl');
    let contentRight = viewportWidth * 0.9;
    let contentLeft = viewportWidth * 0.1;
    if (container) {
      const rect = container.getBoundingClientRect();
      contentLeft = rect.left;
      contentRight = rect.right;
    }
    const leftSpace = contentLeft - margin;
    const rightSpace = viewportWidth - contentRight - margin;
    let bestX: number;
    let bestSide: 'left' | 'right';
    if (rightSpace >= aiSize + margin) {
      bestX = contentRight + rightSpace / 2;
      bestSide = 'right';
    } else if (leftSpace >= aiSize + margin) {
      bestX = leftSpace / 2;
      bestSide = 'left';
    } else {
      bestX = viewportWidth - aiSize / 2 - margin;
      bestSide = 'right';
    }
    return { x: bestX, y: viewportHeight / 2, side: bestSide };
  }, []);

  useEffect(() => {
    let animationFrame: number;
    let hasAppeared = false;
    const updatePosition = () => {
      const position = findBlankSpace();
      if (!hasAppeared) {
        setTimeout(() => {
          setIsVisible(true);
          hasAppeared = true;
          posX.set(position.x);
          posY.set(position.y);
          setSide(position.side);
        }, 1500);
        return;
      }
      posX.set(position.x);
      posY.set(position.y);
      if (position.side !== side) setSide(position.side);
    };
    updatePosition();
    const handleUpdate = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updatePosition);
    };
    window.addEventListener('scroll', handleUpdate, { passive: true });
    window.addEventListener('resize', handleUpdate, { passive: true });
    const interval = setInterval(updatePosition, 500);
    return () => {
      window.removeEventListener('scroll', handleUpdate);
      window.removeEventListener('resize', handleUpdate);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      clearInterval(interval);
    };
  }, [findBlankSpace, posX, posY, side]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cx = x.get(), cy = y.get();
      mouseX.set(Math.max(-3, Math.min(3, (e.clientX - cx) / 200)));
      mouseY.set(Math.max(-2, Math.min(2, (e.clientY - cy) / 200)));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, mouseX, mouseY]);

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'clients', 'projects', 'techstack', 'contact'];
    const observers: IntersectionObserver[] = [];
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (!element) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
              if (lastSectionRef.current !== sectionId) {
                lastSectionRef.current = sectionId;
                setCurrentSection(sectionId);
                setIsSpeaking(true);
                setMessageVisible(false);
                setTimeout(() => setMessageVisible(true), 100);
                setTimeout(() => setIsSpeaking(false), 2000);
              }
            }
          });
        },
        { threshold: [0.3, 0.5] }
      );
      observer.observe(element);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const currentMessage = sectionMessages[currentSection] || sectionMessages.hero;

  return (
    <motion.div
      className="fixed z-50 hidden lg:flex flex-col items-center pointer-events-none"
      style={{ left: x, top: y, translateX: '-50%', translateY: '-50%' }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ opacity: { duration: 0.5 }, scale: { type: 'spring', stiffness: 200, damping: 20 } }}
    >
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        {messageVisible && (
          <motion.div
            key={currentSection}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className={`absolute -top-28 ${side === 'right' ? 'right-0' : 'left-0'} w-[200px] p-3 rounded-2xl glass glow-sm pointer-events-auto`}
          >
            <div className="flex items-start gap-2">
              <span className="text-base">{currentMessage.emoji}</span>
              <p className="text-xs text-foreground/90 leading-relaxed">{currentMessage.message}</p>
            </div>
            <div className={`absolute -bottom-2 ${side === 'right' ? 'right-6' : 'left-6'} w-4 h-4 bg-white/80 backdrop-blur-xl border-r border-b border-black/5 rotate-45`} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating animation wrapper */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* AI Face */}
        <motion.div
          className="relative w-20 h-20 pointer-events-auto cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {/* Outer rotating ring */}
          <motion.svg
            className="absolute -inset-3 w-[calc(100%+24px)] h-[calc(100%+24px)]"
            viewBox="0 0 120 120"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            <defs>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.6" />
              </linearGradient>
            </defs>
            <circle cx="60" cy="60" r="56" fill="none" stroke="url(#ringGrad)" strokeWidth="1.5" strokeDasharray="8 6" />
          </motion.svg>

          {/* Secondary counter-rotating ring */}
          <motion.svg
            className="absolute -inset-1.5 w-[calc(100%+12px)] h-[calc(100%+12px)]"
            viewBox="0 0 110 110"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="55" cy="55" r="52" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.8" strokeDasharray="4 8" />
          </motion.svg>

          {/* Glow backdrop */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: isSpeaking
                ? [
                    '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2), inset 0 0 15px hsl(var(--primary) / 0.1)',
                    '0 0 35px hsl(var(--primary) / 0.6), 0 0 70px hsl(var(--primary) / 0.3), inset 0 0 25px hsl(var(--primary) / 0.2)',
                    '0 0 20px hsl(var(--primary) / 0.4), 0 0 40px hsl(var(--primary) / 0.2), inset 0 0 15px hsl(var(--primary) / 0.1)',
                  ]
                : isHovered
                  ? '0 0 25px hsl(var(--primary) / 0.5), 0 0 50px hsl(var(--primary) / 0.25)'
                  : '0 0 12px hsl(var(--primary) / 0.3), 0 0 24px hsl(var(--primary) / 0.15)',
            }}
            transition={{ duration: isSpeaking ? 0.5 : 0.3, repeat: isSpeaking ? Infinity : 0 }}
          />

          {/* Face container */}
          <div className="absolute inset-0 rounded-full overflow-hidden border border-primary/20 bg-gradient-to-br from-background via-background to-primary/5">
            {/* Inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10" />

            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              {/* Hexagonal grid background */}
              <motion.g opacity={0.08}>
                <path d="M30 20 L40 15 L50 20 L50 30 L40 35 L30 30 Z" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.5" />
                <path d="M50 20 L60 15 L70 20 L70 30 L60 35 L50 30 Z" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.5" />
                <path d="M20 35 L30 30 L40 35 L40 45 L30 50 L20 45 Z" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.5" />
                <path d="M60 35 L70 30 L80 35 L80 45 L70 50 L60 45 Z" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.5" />
                <path d="M30 50 L40 45 L50 50 L50 60 L40 65 L30 60 Z" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.5" />
                <path d="M50 50 L60 45 L70 50 L70 60 L60 65 L50 60 Z" stroke="hsl(var(--primary))" fill="none" strokeWidth="0.5" />
              </motion.g>

              {/* Left eye — rounded rectangle style */}
              <motion.g>
                <rect x="25" y="34" width="18" height="14" rx="5" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
                <motion.rect
                  x="30" y={isBlinking ? 40 : 37}
                  width="8" height={isBlinking ? 2 : 8}
                  rx={isBlinking ? 1 : 3}
                  fill="hsl(var(--primary))"
                  style={{ x: eyeX, y: eyeY }}
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {/* Eye reflection */}
                {!isBlinking && (
                  <motion.circle cx="36" cy="39" r="1.5" fill="white" opacity={0.7}
                    style={{ x: eyeX, y: eyeY }}
                  />
                )}
              </motion.g>

              {/* Right eye */}
              <motion.g>
                <rect x="57" y="34" width="18" height="14" rx="5" fill="hsl(var(--primary) / 0.06)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
                <motion.rect
                  x="62" y={isBlinking ? 40 : 37}
                  width="8" height={isBlinking ? 2 : 8}
                  rx={isBlinking ? 1 : 3}
                  fill="hsl(var(--primary))"
                  style={{ x: eyeX, y: eyeY }}
                  animate={{ opacity: [0.9, 1, 0.9] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {!isBlinking && (
                  <motion.circle cx="68" cy="39" r="1.5" fill="white" opacity={0.7}
                    style={{ x: eyeX, y: eyeY }}
                  />
                )}
              </motion.g>

              {/* Nose dot */}
              <circle cx="50" cy="55" r="1.5" fill="hsl(var(--primary) / 0.2)" />

              {/* Mouth — dynamic expression */}
              <motion.path
                fill="none"
                stroke="hsl(var(--primary))"
                strokeWidth="1.5"
                strokeLinecap="round"
                animate={{
                  d: isSpeaking
                    ? ['M 38 65 Q 50 76 62 65', 'M 40 64 Q 50 68 60 64', 'M 38 65 Q 50 76 62 65']
                    : isHovered
                      ? 'M 36 64 Q 50 76 64 64'
                      : 'M 40 64 Q 50 71 60 64',
                }}
                transition={{ duration: isSpeaking ? 0.25 : 0.3, repeat: isSpeaking ? Infinity : 0 }}
              />

              {/* Cheek blush — appears on hover */}
              <motion.circle cx="24" cy="58" r="6" fill="hsl(var(--primary) / 0.08)"
                animate={{ opacity: isHovered ? 0.15 : 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.circle cx="76" cy="58" r="6" fill="hsl(var(--primary) / 0.08)"
                animate={{ opacity: isHovered ? 0.15 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Circuit lines from forehead */}
              <motion.path d="M 50 18 L 50 12" stroke="hsl(var(--primary))" strokeWidth="1" opacity={0.3} strokeLinecap="round" />
              <motion.path d="M 35 22 L 28 16" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity={0.2} strokeLinecap="round" />
              <motion.path d="M 65 22 L 72 16" stroke="hsl(var(--primary))" strokeWidth="0.8" opacity={0.2} strokeLinecap="round" />

              {/* Forehead gem / core */}
              <motion.g>
                <motion.circle cx="50" cy="24" r="4" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary) / 0.4)" strokeWidth="0.8" />
                <motion.circle
                  cx="50" cy="24" r="2"
                  fill="hsl(var(--primary))"
                  animate={{
                    opacity: isSpeaking ? [0.5, 1, 0.5] : [0.3, 0.6, 0.3],
                    r: isSpeaking ? [2, 2.5, 2] : 2,
                  }}
                  transition={{ duration: isSpeaking ? 0.5 : 2, repeat: Infinity }}
                />
              </motion.g>

              {/* Data flow particles */}
              <motion.circle cx="20" cy="40" r="1" fill="hsl(var(--primary))"
                animate={{ cy: [40, 25, 40], opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              />
              <motion.circle cx="80" cy="35" r="0.8" fill="hsl(var(--primary))"
                animate={{ cy: [35, 20, 35], opacity: [0, 0.4, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
              />
              <motion.circle cx="15" cy="60" r="0.6" fill="hsl(var(--primary))"
                animate={{ cy: [60, 45, 60], opacity: [0, 0.3, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              />
            </svg>

            {/* Scanning line */}
            <motion.div
              className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent"
              animate={{ top: ['15%', '85%', '15%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            {/* Inner glow pulse */}
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-t from-primary/5 to-transparent"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {/* Orbiting dots */}
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: -360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <motion.div
              className="absolute top-1/2 -right-1 -translate-y-1/2 w-1 h-1 rounded-full bg-primary/60"
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-primary/30"
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      {/* Status */}
      <motion.div className="mt-2 flex items-center gap-1.5 text-[10px] text-muted-foreground glass px-2.5 py-1 rounded-full">
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-primary"
          animate={{ opacity: [0.5, 1, 0.5], scale: isSpeaking ? [1, 1.4, 1] : 1 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <span className="opacity-80">AI Guide</span>
      </motion.div>
    </motion.div>
  );
};

export default AIGuide;
