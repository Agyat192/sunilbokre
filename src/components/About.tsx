import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Cpu, Globe, Shield, Leaf, Zap, Code2 } from 'lucide-react';

const floatingIcons = [
  { Icon: Cpu, position: 'top-0 left-0', delay: 0, rotate: 15 },
  { Icon: Globe, position: 'top-0 right-0', delay: 0.2, rotate: -15 },
  { Icon: Shield, position: 'bottom-0 left-0', delay: 0.4, rotate: 10 },
  { Icon: Leaf, position: 'bottom-0 right-0', delay: 0.6, rotate: -10 },
  { Icon: Zap, position: 'top-1/2 -left-4', delay: 0.8, rotate: 20 },
  { Icon: Code2, position: 'top-1/2 -right-4', delay: 1, rotate: -20 },
];

const About = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <section id="about" className="section-padding relative" ref={containerRef}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2 
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            whileInView={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            About <span className="text-gradient">Me</span>
          </motion.h2>
          <motion.p 
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            A journey from engineering to innovation
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Profile Card with enhanced animations */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -50, rotateY: -15 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative perspective-1000"
          >
            <motion.div 
              className="relative p-8 rounded-3xl glass glow"
              whileHover={{ 
                scale: 1.02,
                rotateY: 5,
                rotateX: -5,
                transition: { duration: 0.3 }
              }}
            >
              {/* Floating icons with enhanced animation */}
              {floatingIcons.map(({ Icon, position, delay, rotate }, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0, rotate: rotate }}
                  animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                  transition={{ 
                    duration: 0.5, 
                    delay: delay + 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                  whileHover={{ 
                    scale: 1.3, 
                    rotate: rotate,
                    boxShadow: "0 0 20px hsl(var(--primary) / 0.5)"
                  }}
                  className={`absolute ${position} w-10 h-10 sm:w-12 sm:h-12 rounded-xl glass flex items-center justify-center cursor-pointer hidden sm:flex`}
                  style={{ animationDelay: `${delay}s` }}
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: delay }}
                  >
                    <Icon className="w-6 h-6 text-primary" />
                  </motion.div>
                </motion.div>
              ))}

              {/* Avatar with pulse effect */}
              <motion.div 
                className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center relative"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-cyan-500"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="text-4xl font-display font-bold text-primary-foreground relative z-10">SB</span>
              </motion.div>

              <motion.h3 
                className="font-display text-2xl font-bold text-center mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                Sunil Bokare
              </motion.h3>
              <motion.p 
                className="text-primary text-center mb-4"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.9 }}
              >
                Co-Founder & Tech Visionary
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap justify-center gap-2"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {['ENTC', 'Full-Stack', 'IoT', 'AI', 'Network'].map((tag, i) => (
                  <motion.span 
                    key={tag} 
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.1, 
                      backgroundColor: 'hsl(var(--primary) / 0.2)',
                      transition: { duration: 0.2 }
                    }}
                    className="px-3 py-1 rounded-full text-sm glass text-muted-foreground cursor-default"
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Story cards with stagger animation */}
          <motion.div
            style={{ y: y2 }}
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {[
              { icon: Cpu, title: 'Engineering Mindset', desc: 'With a foundation in Electronics & Telecommunication Engineering, I approach every challenge with systematic thinking and precision.' },
              { icon: Leaf, title: 'Startup Leadership', desc: 'As Co-Founder of Bhoomivardhan Agritech, I lead the development of cutting-edge solutions that bridge technology and agriculture.' },
              { icon: Shield, title: 'System-Level Thinking', desc: 'From network security to AI systems, I design robust architectures that scale efficiently and remain secure.' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02, 
                  x: 10,
                  boxShadow: "0 10px 40px hsl(var(--primary) / 0.15)"
                }}
                className="p-6 rounded-2xl glass glass-hover cursor-default"
              >
                <motion.h4 
                  className="font-display text-xl font-semibold mb-2 flex items-center gap-2"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <item.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  {item.title}
                </motion.h4>
                <p className="text-muted-foreground">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
