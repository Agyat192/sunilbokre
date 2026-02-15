import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { 
  Cpu, 
  Smartphone, 
  Cloud, 
  Database, 
  TrendingUp, 
  Target, 
  Zap, 
  Shield,
  Globe,
  BarChart3,
  Users,
  Award,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  Rocket,
  X,
  ExternalLink,
  Calendar,
  MapPin,
  Building
} from 'lucide-react';

const CaseStudies = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedCase, setSelectedCase] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const caseStudies = [
    {
      id: 1,
      title: "Bhoomivardhan - AI Soil Intelligence",
      company: "Bhoomivardhan",
      category: "AgriTech",
      duration: "6 months",
      location: "India",
      image: "/api/placeholder/400/250",
      summary: "AI-IoT powered agricultural intelligence ecosystem integrating soil hardware, cloud analytics, and farmer marketplace infrastructure.",
      tags: ["AI/ML", "IoT", "Cloud", "Mobile App", "Agriculture"],
      problem: {
        title: "Agricultural Challenges",
        points: [
          "7-15 days delayed soil testing reports",
          "No centralized digital platform for farmers",
          "Disconnected ecosystem (mandi prices, news, inputs)",
          "Poor fertilizer decisions affecting crop yield"
        ]
      },
      solution: {
        title: "AI-IoT Ecosystem",
        architecture: [
          {
            layer: "IoT Soil Testing Device",
            details: "Custom hardware measuring NPK, pH, moisture levels"
          },
          {
            layer: "AI Validation Engine",
            details: "ML-based calibration eliminating false readings"
          },
          {
            layer: "Cloud Infrastructure",
            details: "Real-time data processing and analytics"
          },
          {
            layer: "Mobile Platform",
            details: "Unified farmer ecosystem with marketplace"
          }
        ],
        tech: ["React Native", "Python ML", "AWS Cloud", "IoT Sensors", "PostgreSQL"]
      },
      results: [
        { metric: "7-15 days → Real-time", label: "Soil Report Time" },
        { metric: "95%+", label: "Data Accuracy" },
        { metric: "10,000+", label: "Farmers Empowered" },
        { metric: "40%", label: "Yield Improvement" }
      ],
      impact: "Revolutionized agricultural decision-making with real-time soil intelligence and unified digital ecosystem."
    },
    {
      id: 2,
      title: "Mission 500 - Digital Governance & Geo-Verification Infrastructure",
      company: "Mission 500",
      category: "GovTech",
      duration: "8 months",
      location: "India",
      image: "/api/placeholder/400/250",
      summary: "Scalable, role-based digital governance platform architected to digitize, monitor, and verify village-level development projects through geo-tagged evidence submission and hierarchical approvals.",
      tags: ["GovTech", "Geo-Verification", "RBAC", "Workflow Engine", "Mobile App"],
      problem: {
        title: "Governance Challenges",
        points: [
          "Manual village-level development monitoring",
          "Lack of transparent project verification",
          "No structured hierarchical approval system",
          "Difficulty in tracking compliance timelines",
          "Limited visibility into ground-level execution"
        ]
      },
      solution: {
        title: "Digital Governance Ecosystem",
        architecture: [
          {
            layer: "Role-Based Access Control (RBAC) Framework",
            details: "Multi-role system with Mobile Roles (Mission Coordinator, PachPatil, Farmer) and Web Admin roles with hierarchical permissions"
          },
          {
            layer: "Geo-Tagged Photo Verification System",
            details: "Core integrity mechanism with automatic GPS extraction, metadata collection, and cryptographic project linking"
          },
          {
            layer: "Multi-Level Verification Workflow Engine",
            details: "Sequential approval pipeline: Operator → Owner → PachPatil → Coordinator → Admin with state-driven workflow"
          },
          {
            layer: "24-Hour Compliance Monitoring Engine",
            details: "Automated timer with hourly reminders, escalation alerts, and auto-flagging for deadline enforcement"
          }
        ],
        tech: ["Node.js", "React Native", "MongoDB", "Geo-Location Services", "WebSocket", "AWS Cloud"]
      },
      results: [
        { metric: "100%", label: "Project Transparency" },
        { metric: "24hr", label: "Compliance Window" },
        { metric: "5-Level", label: "Approval Hierarchy" },
        { metric: "50+", label: "Villages Covered" }
      ],
      impact: "Established digital governance infrastructure enabling transparent project monitoring, structured accountability, and real-time operational visibility across village-level development programs."
    },
    {
      id: 3,
      title: "Role-Based Teacher Training & Performance Intelligence Platform",
      company: "Raseup",
      category: "EdTech",
      duration: "4 months",
      location: "Pune, India",
      image: "/api/placeholder/400/250",
      summary: "Scalable digital SaaS platform focused on improving English teaching methodologies using structured content, behavioral tracking, and measurable performance analytics.",
      tags: ["EdTech", "SaaS", "Analytics", "Role-Based Access", "Real-time Chat"],
      problem: {
        title: "Teacher Training Challenges",
        points: [
          "Inconsistent teaching standards across trainers",
          "No centralized teacher training system",
          "Limited visibility into teacher engagement",
          "Manual performance evaluation methods",
          "Inefficient trainer-teacher communication"
        ]
      },
      solution: {
        title: "Role-Based Training Ecosystem",
        architecture: [
          {
            layer: "Role-Based Access Control (RBAC)",
            details: "Secure multi-role system with Admin and Teacher panels, ensuring controlled access and operational clarity"
          },
          {
            layer: "Course Player Module",
            details: "Structured video-based lessons with modular topic breakdown, progress tracking, and completion validation"
          },
          {
            layer: "Live Messaging Infrastructure",
            details: "Real-time teacher-admin chat, group discussions, instant announcements, and query resolution system"
          },
          {
            layer: "Teacher Analytics & Behavioral Intelligence",
            details: "Comprehensive analytics measuring course completion, time spent, interaction frequency, and engagement patterns"
          }
        ],
        tech: ["Node.js", "React", "MongoDB", "Socket.io", "Analytics Engine", "AWS Cloud"]
      },
      results: [
        { metric: "100%", label: "Training Standardization" },
        { metric: "85%", label: "Course Completion Rate" },
        { metric: "70%", label: "Communication Efficiency" },
        { metric: "500+", label: "Teachers Trained" }
      ],
      impact: "Transformed traditional teacher training into measurable, data-driven digital platform with behavioral intelligence and scalable SaaS architecture."
    }
  ];

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

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  const CaseStudyModal = ({ caseStudy, onClose }) => {
    return (
      <AnimatePresence>
        {caseStudy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
            onClick={onClose}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-primary/10 backdrop-blur-3xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            <motion.div
              initial={{
                scale: 0.3,
                opacity: 0,
                rotateX: 40,
                rotateY: -60,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotateX: 0,
                rotateY: 0,
              }}
              exit={{
                scale: 0.3,
                opacity: 0,
                rotateX: -20,
                rotateY: 50,
              }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 100,
              }}
              className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--background) / 0.98), hsl(var(--card) / 0.95))',
                backdropFilter: 'blur(20px)',
                border: '1px solid hsl(var(--primary) / 0.2)',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                <motion.button
                  onClick={onClose}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full glass flex items-center justify-center z-20"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>

                <div className="absolute bottom-6 left-8 right-8">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                        {caseStudy.category}
                      </span>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <Calendar className="w-4 h-4" />
                        {caseStudy.duration}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4" />
                        {caseStudy.location}
                      </div>
                    </div>
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                      {caseStudy.title}
                    </h2>
                    <p className="text-muted-foreground text-lg">{caseStudy.company}</p>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-20rem)]">
                {/* Summary */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="font-display text-2xl font-bold mb-4">Project Overview</h3>
                  <p className="text-muted-foreground leading-relaxed">{caseStudy.summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {caseStudy.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Problem */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                    <AlertCircle className="w-6 h-6 text-red-500" />
                    {caseStudy.problem.title}
                  </h3>
                  <ul className="space-y-3">
                    {caseStudy.problem.points.map((point, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>

                {/* Solution */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="mb-8"
                >
                  <h3 className="font-display text-2xl font-bold mb-4 flex items-center gap-3">
                    <Lightbulb className="w-6 h-6 text-green-500" />
                    {caseStudy.solution.title}
                  </h3>
                  
                  <div className="space-y-4 mb-6">
                    {caseStudy.solution.architecture.map((layer, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="glass rounded-xl p-4"
                      >
                        <h4 className="font-semibold text-lg mb-2">{layer.layer}</h4>
                        <p className="text-muted-foreground text-sm">{layer.details}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Technology Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.solution.tech.map((tech, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  return (
    <section id="case-studies" className="section-padding relative overflow-hidden" ref={containerRef}>
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        style={{ x }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Case Studies</span>
          </motion.div>
          
          <motion.h2
            className="font-display text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Project <span className="text-gradient">Showcase</span>
          </motion.h2>
          
          <motion.p
            className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Explore our portfolio of innovative solutions across various industries, 
            each demonstrating technical excellence and business impact.
          </motion.p>
        </motion.div>

        {/* Case Studies Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {caseStudies.map((caseStudy) => (
            <motion.div
              key={caseStudy.id}
              variants={cardVariants}
              className="group cursor-pointer"
              onClick={() => setSelectedCase(caseStudy)}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="glass rounded-2xl overflow-hidden hover:glass-hover transition-all duration-300 h-full">
                {/* Image Placeholder */}
                <div className="relative h-48 bg-gradient-to-br from-primary/20 to-accent/10 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Building className="w-16 h-16 text-primary/30" />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-medium">
                      {caseStudy.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    {caseStudy.duration}
                    <MapPin className="w-4 h-4 ml-2" />
                    {caseStudy.location}
                  </div>

                  <h3 className="font-display text-xl font-bold mb-2 line-clamp-2">
                    {caseStudy.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {caseStudy.summary}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseStudy.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                    {caseStudy.tags.length > 3 && (
                      <span className="px-2 py-1 rounded-full bg-secondary/50 text-secondary-foreground text-xs">
                        +{caseStudy.tags.length - 3}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{caseStudy.company}</span>
                    <motion.div
                      className="flex items-center gap-1 text-primary"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <span className="text-sm font-medium">View Case</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.div
            className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Globe className="w-5 h-5 text-primary" />
            <span className="font-semibold text-primary">More projects available on request</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      <CaseStudyModal caseStudy={selectedCase} onClose={() => setSelectedCase(null)} />
    </section>
  );
};

export default CaseStudies;
