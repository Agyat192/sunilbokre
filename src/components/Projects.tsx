import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, X, ExternalLink, Globe, AlertTriangle, Lightbulb, BarChart3, Layers } from 'lucide-react';
import MouseParallaxImage from './MouseParallaxImage';
import ImageGallery3D from './ImageGallery3D';
import projectBhoomivardhan from '@/assets/Bhoomivardhan.jpg';
import projectBhoomivardhan2 from '@/assets/bhoomivardhan2.jpeg';
import projectBhoomivardhan3 from '@/assets/bhoomivardhan3.jpeg';
import projectIrrigation from '@/assets/project-irrigation.jpg';
import projectIrrigation2 from '@/assets/project-irrigation-2.jpg';
import projectIrrigation3 from '@/assets/project-irrigation-3.jpg';
import projectSecurity from '@/assets/project-security.jpg';
import projectSecurity2 from '@/assets/project-security-2.jpg';
import projectSecurity3 from '@/assets/project-security-3.jpg';
import projectLivestock from '@/assets/project-livestock.jpg';
import projectLivestock2 from '@/assets/project-livestock-2.jpg';
import projectLivestock3 from '@/assets/project-livestock-3.jpg';

const projects = [
  {
    id: 1,
    title: 'Bhoomivardhan Platform',
    category: 'AgriTech SaaS',
    problem: 'Indian farmers lack access to real-time crop analytics and market intelligence, resulting in poor yield decisions and revenue loss.',
    solution: 'Designed a full-stack IoT-enabled SaaS platform with AI-driven crop analytics, real-time sensor dashboards, and a mobile-first progressive web app for field workers.',
    architecture: 'React frontend → Node.js/Express REST API → PostgreSQL + Redis caching → AWS EC2 with auto-scaling → IoT Gateway (MQTT) → ML inference microservice (Python/FastAPI).',
    impact: [
      { metric: '40%', label: 'Increase in crop yield' },
      { metric: '3x', label: 'Faster decision making' },
      { metric: '99.5%', label: 'Platform uptime' },
    ],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'AWS', 'MQTT', 'Python', 'FastAPI'],
    image: projectBhoomivardhan,
    gallery: [projectBhoomivardhan, projectBhoomivardhan2, projectBhoomivardhan3],
    url: 'https://bhoomivardhan.com'
  },
  {
    id: 2,
    title: 'Smart Irrigation System',
    category: 'IoT Infrastructure',
    problem: 'Traditional irrigation wastes 60%+ water due to lack of soil-level data and weather-aware scheduling, increasing costs for farmers.',
    solution: 'Built an automated irrigation controller with soil moisture sensors, weather API integration, and a mobile app for remote monitoring and override controls.',
    architecture: 'Arduino/ESP32 sensors → MQTT broker → Python backend → PostgreSQL time-series DB → React Native mobile app → Firebase push notifications.',
    impact: [
      { metric: '60%', label: 'Water savings' },
      { metric: '₹2L+', label: 'Annual cost reduction per farm' },
      { metric: '500+', label: 'Sensors deployed' },
    ],
    technologies: ['Arduino', 'ESP32', 'Python', 'MQTT', 'React Native', 'PostgreSQL', 'Firebase'],
    image: projectIrrigation,
    gallery: [projectIrrigation, projectIrrigation2, projectIrrigation3],
    url: 'https://smartirrigation.io'
  },
  {
    id: 3,
    title: 'Enterprise Network Security',
    category: 'Cybersecurity',
    problem: 'Mid-size enterprises had vulnerable network infrastructure with no centralized threat monitoring, leaving them exposed to attacks.',
    solution: 'Implemented zero-trust architecture with real-time SIEM integration, automated threat response, VPN tunneling, and role-based network segmentation.',
    architecture: 'Firewall (pfSense) → VPN Gateway → SIEM (ELK Stack) → Python threat analysis → Docker containers → Automated incident response pipeline.',
    impact: [
      { metric: '99.9%', label: 'Uptime achieved' },
      { metric: '0', label: 'Security breaches' },
      { metric: '70%', label: 'Faster threat detection' },
    ],
    technologies: ['pfSense', 'ELK Stack', 'Docker', 'Python', 'VPN', 'SIEM', 'Ansible'],
    image: projectSecurity,
    gallery: [projectSecurity, projectSecurity2, projectSecurity3],
    url: 'https://enterprise-security.dev'
  },
  {
    id: 4,
    title: 'Livestock Monitoring App',
    category: 'Mobile SaaS',
    problem: 'Livestock farmers had no way to track animal health and location in real-time, leading to preventable losses and delayed veterinary care.',
    solution: 'Created a cross-platform mobile app with GPS tracking, health vitals monitoring, automated alerts, and a veterinarian consultation module.',
    architecture: 'Flutter mobile app → Firebase Auth + Firestore → Node.js cloud functions → GPS/BLE hardware → MongoDB analytics DB → Push notification service.',
    impact: [
      { metric: '35%', label: 'Reduced livestock loss' },
      { metric: '2K+', label: 'Animals tracked' },
      { metric: '4.5★', label: 'App store rating' },
    ],
    technologies: ['Flutter', 'Firebase', 'Node.js', 'MongoDB', 'GPS API', 'BLE', 'Cloud Functions'],
    image: projectLivestock,
    gallery: [projectLivestock, projectLivestock2, projectLivestock3],
    url: 'https://pashuvardhan.app'
  },
];

export type Project = typeof projects[0];

const CaseStudyCard = ({ project, index, onOpen }: {
  project: Project;
  index: number;
  onOpen: () => void;
}) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15 }}
      onClick={onOpen}
      className="group cursor-pointer"
    >
      <div className="relative rounded-2xl glass glass-hover overflow-hidden">
        {/* Image */}
        <div className="relative w-full h-48 sm:h-56 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium bg-primary/90 text-primary-foreground">
            {project.category}
          </span>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <h3 className="font-display text-xl sm:text-2xl font-bold group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          {/* Problem snippet */}
          <div className="flex gap-3">
            <AlertTriangle className="w-4 h-4 text-destructive mt-1 shrink-0" />
            <p className="text-sm text-muted-foreground line-clamp-2">{project.problem}</p>
          </div>

          {/* Impact metrics */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {project.impact.map((item, i) => (
              <div key={i} className="text-center p-2 rounded-lg bg-secondary/50">
                <div className="text-lg font-display font-bold text-primary">{item.metric}</div>
                <div className="text-[10px] text-muted-foreground leading-tight">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className="px-2 py-0.5 rounded text-[11px] bg-secondary/50 text-muted-foreground">
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="px-2 py-0.5 rounded text-[11px] bg-secondary/50 text-muted-foreground">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 text-primary text-sm font-medium pt-1">
            <span>Read Full Case Study</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CaseStudyModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-background/60 backdrop-blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", damping: 25, stiffness: 120 }}
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl glass glow p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image */}
        <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-t-2xl overflow-hidden">
          <MouseParallaxImage src={project.image} alt={project.title} className="w-full h-full" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground mb-2">
              {project.category}
            </span>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground drop-shadow-lg">
              {project.title}
            </h2>
          </div>
        </div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center hover:bg-primary/10 transition-colors z-20"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5" />
        </motion.button>

        <div className="p-5 sm:p-8 space-y-6">
          {/* Project URL */}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-colors"
          >
            <Globe className="w-4 h-4" />
            <span>{project.url}</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          {/* Problem */}
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/10">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <h4 className="text-sm font-semibold text-destructive">THE PROBLEM</h4>
            </div>
            <p className="text-muted-foreground">{project.problem}</p>
          </div>

          {/* Solution */}
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold text-primary">THE SOLUTION</h4>
            </div>
            <p className="text-muted-foreground">{project.solution}</p>
          </div>

          {/* Architecture Overview */}
          <div className="p-4 rounded-xl bg-secondary/30 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-foreground" />
              <h4 className="text-sm font-semibold">ARCHITECTURE OVERVIEW</h4>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              {project.architecture.split(' → ').map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="px-3 py-1.5 rounded-lg bg-background border border-border text-sm font-medium">
                    {step}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-primary font-bold">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Impact */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold text-primary">THE IMPACT</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {project.impact.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center p-4 rounded-xl glass"
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold text-gradient">{item.metric}</div>
                  <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <ImageGallery3D images={project.gallery} title={project.title} />

          {/* Technologies */}
          <div>
            <h4 className="text-sm font-semibold text-primary mb-3">TECHNOLOGIES USED</h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-lg glass text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Case <span className="text-gradient">Studies</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real problems. Engineered solutions. Measurable impact.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <CaseStudyCard
              key={project.id}
              project={project}
              index={index}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <CaseStudyModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
