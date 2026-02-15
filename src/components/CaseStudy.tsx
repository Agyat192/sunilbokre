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
  CpuIcon,
  Wifi,
  Server
} from 'lucide-react';

const CaseStudy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const architectureLayers = [
    {
      id: 1,
      title: "IoT Soil Testing Device",
      icon: <Wifi className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500",
      features: ["NPK Levels", "pH Value", "Moisture Content", "Real-time Data"],
      description: "Custom-built hardware capturing precise soil parameters"
    },
    {
      id: 2,
      title: "AI Validation Engine",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500",
      features: ["Sensor Calibration", "Anomaly Detection", "Data Normalization", "ML-based Correction"],
      description: "AI-powered system eliminating false readings and ensuring accuracy"
    },
    {
      id: 3,
      title: "Cloud Infrastructure",
      icon: <Cloud className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500",
      features: ["Real-time Sync", "Secure Authentication", "Data Analytics", "Scalable Architecture"],
      description: "Robust backend processing and data management system"
    },
    {
      id: 4,
      title: "Mobile Ecosystem",
      icon: <Smartphone className="w-6 h-6" />,
      color: "from-orange-500 to-red-500",
      features: ["Soil Reports", "Mandi Prices", "Agri News", "E-commerce"],
      description: "Unified farmer platform integrating all agricultural services"
    }
  ];

  const impactMetrics = [
    { value: "7-15 days → Real-time", label: "Soil Report Time", icon: <Zap className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { value: "95%+", label: "Data Accuracy", icon: <Target className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { value: "10,000+", label: "Farmers Empowered", icon: <Users className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
    { value: "40%", label: "Yield Improvement", icon: <TrendingUp className="w-5 h-5" />, color: "from-orange-500 to-red-500" }
  ];

  const problemChallenges = [
    {
      icon: <AlertCircle className="w-6 h-6 text-red-500" />,
      title: "Delayed Soil Reports",
      description: "7-15 days turnaround time affecting fertilizer decisions"
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-orange-500" />,
      title: "No Digital Platform",
      description: "Disconnected services across mandi prices, news, and inputs"
    },
    {
      icon: <AlertCircle className="w-6 h-6 text-yellow-500" />,
      title: "Inconsistent Data",
      description: "Manual lab errors and sensor calibration issues"
    }
  ];

  const solutions = [
    {
      icon: <CheckCircle className="w-6 h-6 text-green-500" />,
      title: "AI-IoT Integration",
      description: "Smart hardware with ML-based validation engine"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-blue-500" />,
      title: "Unified Ecosystem",
      description: "Single platform for all agricultural services"
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-purple-500" />,
      title: "Real-time Intelligence",
      description: "Instant soil insights and market data"
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

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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

  return (
    <section id="case-study" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Background Elements */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"
        style={{ y: y1 }}
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            <Award className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Featured Case Study</span>
          </motion.div>
          
          <motion.h2
            className="font-display text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 100 }}
          >
            Bhoomivardhan: <span className="text-gradient">AI-Powered Soil Intelligence</span>
          </motion.h2>
          
          <motion.p
            className="text-muted-foreground text-xl max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Designing and deploying an integrated AgriTech ecosystem that combines IoT hardware, 
            AI analytics, and unified farmer services to revolutionize agricultural intelligence.
          </motion.p>
        </motion.div>

        {/* Executive Summary */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.div
            variants={itemVariants}
            className="glass rounded-3xl p-8 md:p-12 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <motion.h3
                className="font-display text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3"
                variants={itemVariants}
              >
                <Lightbulb className="w-8 h-8 text-primary" />
                Executive Summary
              </motion.h3>
              
              <motion.div
                className="grid md:grid-cols-2 gap-8"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants} className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    Bhoomivardhan Pvt. Ltd. addressed critical inefficiencies in traditional soil testing 
                    and agricultural service accessibility. Farmers experienced delayed reports, inconsistent 
                    lab results, and lacked a centralized digital platform.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We architected a comprehensive AI-IoT ecosystem delivering real-time soil insights 
                    and unified farmer services, establishing scalable digital agriculture infrastructure.
                  </p>
                </motion.div>
                
                <motion.div variants={itemVariants} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Rocket className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Smart IoT Hardware</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cpu className="w-5 h-5 text-primary" />
                    <span className="font-semibold">AI Validation Engine</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Cloud className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Cloud Infrastructure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-primary" />
                    <span className="font-semibold">Unified Mobile Platform</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Problem <span className="text-gradient">Challenges</span>
          </motion.h3>
          
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {problemChallenges.map((challenge, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass rounded-2xl p-6 hover:glass-hover transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background/50 group-hover:bg-background/70 transition-colors">
                    {challenge.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{challenge.title}</h4>
                    <p className="text-muted-foreground text-sm">{challenge.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* System Architecture */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            System <span className="text-gradient">Architecture</span>
          </motion.h3>
          
          <motion.div
            variants={itemVariants}
            className="glass rounded-3xl p-8 md:p-12 relative"
          >
            <div className="space-y-6">
              {architectureLayers.map((layer, index) => (
                <motion.div
                  key={layer.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.1 * index, type: "spring", stiffness: 100 }}
                  className="relative"
                >
                  <motion.div
                    className={`glass rounded-2xl p-6 cursor-pointer transition-all duration-300 ${
                      activeLayer === layer.id ? 'ring-2 ring-primary/50 scale-[1.02]' : ''
                    }`}
                    style={{
                      background: activeLayer === layer.id 
                        ? `linear-gradient(135deg, hsl(var(--card) / 0.9), hsl(var(--background) / 0.8))`
                        : undefined
                    }}
                    onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                    whileHover={{ scale: 1.01, x: 10 }}
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        className={`p-3 rounded-xl bg-gradient-to-br ${layer.color} text-white`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        {layer.icon}
                      </motion.div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-display text-xl font-bold">Layer {layer.id}: {layer.title}</h4>
                          <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${
                            activeLayer === layer.id ? 'rotate-90' : ''
                          }`} />
                        </div>
                        <p className="text-muted-foreground mb-4">{layer.description}</p>
                        
                        <AnimatePresence>
                          {activeLayer === layer.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="grid grid-cols-2 md:grid-cols-4 gap-3"
                            >
                              {layer.features.map((feature, idx) => (
                                <motion.div
                                  key={idx}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.1 }}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <div className="w-2 h-2 rounded-full bg-primary" />
                                  <span>{feature}</span>
                                </motion.div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Connection Line */}
                  {index < architectureLayers.length - 1 && (
                    <motion.div
                      className="absolute left-8 top-full w-0.5 h-6 bg-gradient-to-b from-primary/20 to-transparent"
                      initial={{ scaleY: 0 }}
                      animate={isInView ? { scaleY: 1 } : {}}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Solutions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Innovative <span className="text-gradient">Solutions</span>
          </motion.h3>
          
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-3 gap-6"
          >
            {solutions.map((solution, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass rounded-2xl p-6 hover:glass-hover transition-all duration-300 group"
                whileHover={{ y: -5, scale: 1.02 }}
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-background/50 group-hover:bg-background/70 transition-colors">
                    {solution.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg mb-2">{solution.title}</h4>
                    <p className="text-muted-foreground text-sm">{solution.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Impact Metrics */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-20"
        >
          <motion.h3
            variants={itemVariants}
            className="font-display text-3xl md:text-4xl font-bold mb-12 text-center"
          >
            Impact & <span className="text-gradient">Results</span>
          </motion.h3>
          
          <motion.div
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {impactMetrics.map((metric, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass rounded-2xl p-6 text-center hover:glass-hover transition-all duration-300"
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white mx-auto mb-4`}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  {metric.icon}
                </motion.div>
                <div className="font-display text-2xl font-bold text-gradient mb-2">
                  {metric.value}
                </div>
                <p className="text-muted-foreground text-sm">{metric.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Strategic Value */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.div
            variants={itemVariants}
            className="glass rounded-3xl p-8 md:p-12 text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">Strategic Value</span>
            </motion.div>
            
            <motion.h3
              variants={itemVariants}
              className="font-display text-2xl md:text-3xl font-bold mb-6"
            >
              Foundation for Future <span className="text-gradient">Agricultural Innovation</span>
            </motion.h3>
            
            <motion.div
              variants={containerVariants}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-left"
            >
              {[
                "Scalable AgriTech Infrastructure",
                "AI-Powered Soil Intelligence",
                "Data-Driven Farming Ecosystem",
                "Predictive Agriculture Foundation"
              ].map((value, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-4 rounded-xl bg-background/50"
                >
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{value}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaseStudy;
