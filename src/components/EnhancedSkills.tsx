import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Smartphone, Globe, Server, Shield, Cpu, Database, Code, Cloud,
  Star
} from 'lucide-react';
import Advanced3DCard from './Advanced3DCard';

const skills = [
  {
    icon: Smartphone,
    title: 'Android Development',
    description: 'Native and cross-platform mobile applications with modern UI/UX',
    level: 90,
    color: 'from-gray-700 to-gray-900',
    features: ['React Native', 'Flutter', 'Kotlin', 'Swift']
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web applications with React, Node.js, and modern frameworks',
    level: 95,
    color: 'from-gray-600 to-gray-800',
    features: ['React', 'Next.js', 'TypeScript', 'Tailwind']
  },
  {
    icon: Server,
    title: 'System Architecture',
    description: 'Scalable and maintainable system designs for enterprise applications',
    level: 88,
    color: 'from-gray-700 to-gray-900',
    features: ['Microservices', 'API Design', 'Scalability', 'Performance']
  },
  {
    icon: Shield,
    title: 'Network Security',
    description: 'Secure network infrastructure and cybersecurity implementations',
    level: 85,
    color: 'from-gray-800 to-black',
    features: ['Firewalls', 'Encryption', 'Security Audits', 'Compliance']
  },
  {
    icon: Cpu,
    title: 'IoT & AI Systems',
    description: 'Intelligent connected devices with machine learning capabilities',
    level: 92,
    color: 'from-gray-600 to-gray-800',
    features: ['IoT Protocols', 'ML Models', 'Edge Computing', 'Sensor Networks']
  },
  {
    icon: Database,
    title: 'Cloud Infrastructure',
    description: 'AWS, Azure, and GCP deployments with CI/CD pipelines',
    level: 86,
    color: 'from-gray-700 to-gray-900',
    features: ['AWS', 'Docker', 'Kubernetes', 'CI/CD']
  }
];

const EnhancedSkills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -45 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        duration: 0.6
      }
    }
  };

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-64 h-64 rounded-full bg-primary/5 blur-[100px]"
            style={{
              left: `${(i * 25) % 100}%`,
              top: `${(i * 30) % 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4"
            whileHover={{ scale: 1.05 }}
          >
            <Star className="w-4 h-4" />
            <span>Technical Expertise</span>
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Comprehensive expertise across modern development stack with focus on scalable, secure solutions
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              variants={itemVariants}
              className="relative"
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <Advanced3DCard intensity="medium" className="h-full">
                <div className="relative p-6 sm:p-8 rounded-2xl glass h-full flex flex-col">
                  {/* 3D Icon Container */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ 
                      scale: 1.1,
                      rotateY: 180,
                      transition: { duration: 0.6 }
                    }}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center relative overflow-hidden">
                      {/* Animated background */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10"
                        animate={{ x: ['-100%', '100%'] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      />
                      
                      {/* Icon */}
                      <motion.div
                        animate={{ rotateY: hoveredSkill === index ? 360 : 0 }}
                        transition={{ duration: 0.6 }}
                      >
                        <skill.icon className="w-8 h-8 text-primary" />
                      </motion.div>

                      {/* Floating particles */}
                      <AnimatePresence>
                        {hoveredSkill === index && (
                          <div className="absolute inset-0 pointer-events-none">
                            {[...Array(4)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-primary"
                                style={{
                                  left: `${20 + (i * 20)}%`,
                                  top: `${20 + (i * 20)}%`
                                }}
                                animate={{
                                  scale: [0, 1.5, 0],
                                  opacity: [0, 1, 0],
                                  rotate: [0, 180, 360]
                                }}
                                transition={{
                                  duration: 1,
                                  delay: i * 0.1
                                }}
                                exit={{ opacity: 0, scale: 0 }}
                              />
                            ))}
                          </div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="flex-1">
                    <motion.h3
                      className="font-display text-xl font-bold mb-3"
                      animate={{ 
                        color: hoveredSkill === index ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {skill.title}
                    </motion.h3>
                    
                    <p className="text-muted-foreground text-sm mb-4">
                      {skill.description}
                    </p>

                    {/* Skill Level */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">Proficiency</span>
                        <motion.span
                          className="text-xs font-medium"
                          animate={{ 
                            scale: hoveredSkill === index ? 1.1 : 1,
                            color: hoveredSkill === index ? 'hsl(var(--primary))' : 'hsl(var(--foreground))'
                          }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${skill.level}%` } : {}}
                          transition={{ 
                            duration: 1.5, 
                            delay: 0.5 + index * 0.1,
                            ease: 'easeOut'
                          }}
                        />
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {skill.features.map((feature, i) => (
                        <motion.span
                          key={feature}
                          className="px-2 py-1 rounded-full bg-background/50 border border-border/30 text-xs"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ 
                            delay: 0.8 + index * 0.1 + i * 0.05,
                            type: "spring"
                          }}
                          whileHover={{ 
                            scale: 1.05,
                            backgroundColor: 'hsl(var(--primary) / 0.1)',
                            borderColor: 'hsl(var(--primary) / 0.3)'
                          }}
                        >
                          {feature}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  {/* Achievement Badges */}
                  <motion.div
                    className="absolute -top-2 -right-2"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <div className="relative">
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center"
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                      >
                        <Star className="w-4 h-4 text-primary" />
                      </motion.div>
                      <motion.div
                        className="absolute -inset-1 rounded-full bg-primary/20"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>
                </div>
              </Advanced3DCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedSkills;
