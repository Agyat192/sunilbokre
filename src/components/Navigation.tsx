import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import signImage from '@/assets/sign.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/work', label: 'Work' },
  // { href: '#skills', label: 'Skills' }, // Skills is part of About now
  { href: '/contact', label: 'Contact' },
];

import { useNavigate, useLocation } from 'react-router-dom';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset scroll to top when route changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const handleNavigation = (href: string) => {
    setIsOpen(false);
    
    // Use setTimeout to ensure navigation completes before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }, 0);
    
    navigate(href);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      >
        <motion.div
          style={{ opacity: bgOpacity }}
          className="absolute inset-0 glass border-b border-black/5"
        />

        <div className="max-w-6xl mx-auto flex items-center justify-between relative z-10">
          {/* Animated Logo */}
          <motion.a
            href="#"
            className="relative w-12 h-12 flex items-center justify-center"
            data-magnetic
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-full h-full rounded-full overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm"
              initial={{ opacity: 0, rotate: -180 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <img
                src={signImage}
                alt="Sunil Bokare Signature"
                className="w-full h-full object-contain p-1"
              />
            </motion.div>
            <motion.div
              className="absolute -inset-2 rounded-full bg-primary/10"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          </motion.a>

          {/* Desktop Nav with enhanced animations */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
                onClick={() => handleNavigation(link.href)}
                className="relative text-muted-foreground hover:text-foreground transition-colors group py-2"
                data-magnetic
                whileHover={{ y: -2 }}
              >
                <span className={location.pathname === link.href ? 'text-primary' : ''}>
                  {link.label}
                </span>
                {/* Underline animation */}
                <motion.span
                  className="absolute -bottom-0 left-0 h-0.5 bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: location.pathname === link.href ? '100%' : 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.2 }}
                />
                {/* Hover dot */}
                <motion.span
                  className="absolute -right-1 -top-1 w-1.5 h-1.5 rounded-full bg-primary"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                />
              </motion.button>
            ))}

            {/* CTA Button */}
          </div>

          {/* Mobile Menu Button with animation */}
          <motion.button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-full glass flex items-center justify-center relative"
            data-magnetic
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="w-5 h-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="w-5 h-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu with enhanced animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-background/95 backdrop-blur-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {/* Animated circles */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.5 }}
            />

            <div className="relative h-full flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -50, rotateY: -15 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  onClick={() => handleNavigation(link.href)}
                  className="font-display text-3xl font-bold hover:text-gradient transition-all relative"
                  whileHover={{ scale: 1.1, x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  <motion.span
                    className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                  />
                </motion.button>
              ))}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
