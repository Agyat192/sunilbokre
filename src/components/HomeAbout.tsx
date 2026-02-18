import { motion } from 'framer-motion';
import { useRef } from 'react';
import { Cpu } from 'lucide-react';
import AboutProfilePhoto from './AboutProfilePhoto';

const HomeAbout = () => {
  const ref = useRef(null);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 } as const
    }
  };

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Intro Section: Photo + About Me Only */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="order-2 lg:order-1 flex justify-center lg:justify-start"
          >
            <AboutProfilePhoto />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
              <Cpu className="w-4 h-4" />
              <span>About Me</span>
            </div>
            <h2 className="font-display text-4xl font-bold mb-6">
              Hello, I'm <span className="text-gradient">Sunil Bokare</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              An IoT & AI Engineer and System Architecture Designer focused on building scalable, real-world digital infrastructures.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              My journey into technology started during my 12th standard, where I first explored programming fundamentals. What began as curiosity quickly evolved into a clear vision: to design systems that solve real-world problems at scale.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today, I focus on designing structured, scalable architectures that combine IoT, AI, cloud systems, and secure workflow automation.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeAbout;
