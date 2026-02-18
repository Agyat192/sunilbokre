import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Server, Database, Cloud, Shield, Smartphone, Code, Cpu, Layers } from 'lucide-react';

const techCategories = [
  {
    title: 'Frontend',
    icon: Code,
    technologies: ['React', 'Next.js', 'Tailwind CSS', 'Flutter'],
  },
  {
    title: 'Backend',
    icon: Server,
    technologies: ['Node.js', 'Express', 'FastAPI', 'Firebase'],
  },
  {
    title: 'Database',
    icon: Database,
    technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'Firebase Firestore'],
  },
  {
    title: 'Cloud & DevOps',
    icon: Cloud,
    technologies: ['AWS (EC2, S3, Lambda)', 'GCP', 'Docker', 'CI/CD Pipelines'],
  },
  {
    title: 'Security',
    icon: Shield,
    technologies: ['JWT', 'OAuth 2.0', 'Rate Limiting', 'SSL/TLS'],
  },
  {
    title: 'Mobile',
    icon: Smartphone,
    technologies: ['Flutter', 'React Native', 'Android (Kotlin)', 'Firebase'],
  },
  {
    title: 'IoT & Hardware',
    icon: Cpu,
    technologies: ['Arduino', 'ESP32', 'MQTT', 'LoRaWAN'],
  },
  {
    title: 'AI / ML',
    icon: Layers,
    technologies: ['TensorFlow', 'scikit-learn', 'OpenCV', 'Python'],
  },
];

const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="techstack" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Tech <span className="text-gradient">Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Organized by domain — not just a list of logos.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {techCategories.map((cat, index) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group p-5 rounded-2xl glass glass-hover"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <cat.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-base font-semibold mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 rounded-md text-xs bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Architecture Flow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 p-6 rounded-2xl glass"
        >
          <h3 className="font-display text-lg font-semibold mb-4 text-center">
            Typical System Architecture Flow
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {['Client App', 'CDN / LB', 'API Gateway', 'Microservices', 'Database Layer', 'Cache (Redis)', 'AI/ML Pipeline'].map((step, index, arr) => (
              <div key={step} className="flex items-center gap-3">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.6 + index * 0.08 }}
                  className="px-3 py-2 rounded-lg glass text-xs sm:text-sm font-medium hover:text-primary transition-colors"
                >
                  {step}
                </motion.div>
                {index < arr.length - 1 && (
                  <span className="hidden sm:inline text-primary font-bold text-xs">→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechStack;
