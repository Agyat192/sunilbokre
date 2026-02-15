import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  Smartphone,
  Globe,
  Server,
  Shield,
  Cpu,
  Database,
  Code,
  Cloud
} from 'lucide-react';

const skills = [
  {
    icon: Smartphone,
    title: 'Android Development',
    description: 'Native and cross-platform mobile applications with modern UI/UX',
    level: 90,
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Full-stack web applications with React, Node.js, and modern frameworks',
    level: 95,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Server,
    title: 'System Architecture',
    description: 'Scalable and maintainable system designs for enterprise applications',
    level: 88,
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Shield,
    title: 'Network Security',
    description: 'Secure network infrastructure and cybersecurity implementations',
    level: 85,
    color: 'from-red-500 to-orange-500'
  },
  {
    icon: Cpu,
    title: 'IoT & AI Systems',
    description: 'Intelligent connected devices with machine learning capabilities',
    level: 92,
    color: 'from-cyan-500 to-blue-500'
  },
  {
    icon: Database,
    title: 'Database Design',
    description: 'Optimized database architectures for high-performance applications',
    level: 87,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    icon: Code,
    title: 'API Development',
    description: 'RESTful and GraphQL APIs with comprehensive documentation',
    level: 93,
    color: 'from-indigo-500 to-violet-500'
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description: 'AWS, Azure, and GCP deployments with CI/CD pipelines',
    level: 86,
    color: 'from-teal-500 to-cyan-500'
  }
];

const SkillCard = ({ skill, index }: { skill: typeof skills[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative perspective-1000"
      data-magnetic
    >
      <motion.div
        className="relative p-6 rounded-2xl glass glass-hover overflow-hidden transition-all duration-500"
        whileHover={{
          scale: 1.05,
          rotateY: 5,
          rotateX: -5,
          z: 50
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${skill.color}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Shine effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: isHovered ? '100%' : '-100%' }}
          transition={{ duration: 0.6 }}
        />

        {/* Icon with enhanced animation */}
        <motion.div
          animate={{
            scale: isHovered ? 1.15 : 1,
            rotate: isHovered ? [0, -10, 10, 0] : 0,
            y: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.3 }}
          className="relative z-10 w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center mb-4"
        >
          <motion.div
            animate={{ rotate: isHovered ? 360 : 0 }}
            transition={{ duration: 0.6 }}
          >
            <skill.icon className="w-7 h-7 text-primary" />
          </motion.div>
        </motion.div>


        {/* Content */}
        <motion.h3
          className="relative z-10 font-display text-xl font-semibold mb-2"
          animate={{ color: isHovered ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
        >
          {skill.title}
        </motion.h3>
        <p className="relative z-10 text-muted-foreground text-sm mb-4">
          {skill.description}
        </p>


        {/* Floating particles on hover */}
        {isHovered && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-primary"
                initial={{
                  x: Math.random() * 100,
                  y: 100,
                  opacity: 1
                }}
                animate={{
                  y: -20,
                  opacity: 0
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.2,
                  repeat: Infinity
                }}
              />
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding relative" ref={ref}>
      {/* Animated background decoration */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="font-display text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, type: "spring" }}
          >
            Technical <span className="text-gradient">Skills</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            A comprehensive toolkit for building cutting-edge solutions
          </motion.p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill, index) => (
            <SkillCard key={skill.title} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
