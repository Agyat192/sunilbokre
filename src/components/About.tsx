import { motion } from 'framer-motion';
import { useRef } from 'react';
import { BookOpen, Trophy, Lightbulb, History, Cpu } from 'lucide-react';
import AboutProfilePhoto from './AboutProfilePhoto';

const About = () => {
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
        {/* Intro Section: Photo + About Me */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
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
              Hello, I’m <span className="text-gradient">Sunil Bokare</span>
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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          {/* Academic Background */}
          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />
            <div className="flex items-center gap-3 mb-6">
              <motion.div 
                className="p-3 rounded-2xl bg-primary/10 text-primary"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <BookOpen className="w-6 h-6" />
              </motion.div>
              <h3 className="font-display text-2xl font-bold">Academic Background</h3>
            </div>

            <div className="space-y-8">
              {/* Bachelor's Degree */}
              <motion.div 
                className="relative pl-8 border-l-2 border-primary/30"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div 
                  className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-background border-3 border-primary shadow-lg shadow-primary/20"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-bold text-xl text-gradient mb-2">Bachelor of Engineering in ENTC</h4>
                  <motion.div 
                    className="flex items-center gap-2 mb-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-primary font-medium">Deogiri Institute of Engineering and Management Studies</span>
                    <span className="text-xs text-muted-foreground bg-primary/10 px-2 py-1 rounded-full">2022-2026</span>
                  </motion.div>
                  <div className="bg-background/50 rounded-xl p-4 border border-border/50">
                    <p className="text-muted-foreground leading-relaxed">
                      Specialized in <span className="text-primary font-medium">Electronics & Telecommunication</span> with focus on:
                    </p>
                    <ul className="mt-3 space-y-2">
                      {[
                        "Embedded Systems Design",
                        "Communication Networks",
                        "Signal Processing",
                        "System Architecture",
                        "IoT Integration"
                      ].map((skill, i) => (
                        <motion.li 
                          key={i}
                          className="flex items-center gap-2 text-sm text-muted-foreground"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.1 }}
                          whileHover={{ x: 5, color: "hsl(var(--primary))" }}
                        >
                          <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-primary"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                          />
                          {skill}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>

              {/* Junior College */}
              <motion.div 
                className="relative pl-8 border-l-2 border-border/30"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div 
                  className="absolute -left-[11px] top-0 w-6 h-6 rounded-full bg-background border-3 border-muted-foreground shadow-lg"
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <h4 className="font-bold text-xl mb-2">Higher Secondary Education</h4>
                  <motion.div 
                    className="flex items-center gap-2 mb-3"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <span className="text-primary font-medium">SBES Junior College, Aurangabad</span>
                    <span className="text-xs text-muted-foreground bg-secondary/10 px-2 py-1 rounded-full">2020-2022</span>
                  </motion.div>
                  <div className="bg-background/30 rounded-xl p-4 border border-border/30">
                    <p className="text-muted-foreground leading-relaxed">
                      Science stream with <span className="text-primary font-medium">PCM (Physics, Chemistry, Mathematics)</span>
                    </p>
                    <motion.div 
                      className="mt-3 inline-flex items-center gap-2 text-xs text-primary bg-primary/5 px-3 py-1.5 rounded-full"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Lightbulb className="w-3 h-3" />
                      <span>Where my tech journey began</span>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div variants={itemVariants} className="glass p-8 rounded-3xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full" />
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-500">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl font-bold">Achievements & Recognition</h3>
            </div>

            <ul className="space-y-4">
              {[
                "Multiple Media Recognitions for innovation projects",
                "Aureka Zonalist",
                "Magic Pitch Lab – Winner",
                "Shodh – Runner Up",
                "Multiple Technical Presentation Wins"
              ].map((item, i) => (
                <motion.li
                  key={i}
                  className="flex items-center gap-3 text-muted-foreground"
                  whileHover={{ x: 5, color: "hsl(var(--foreground))" }}
                >
                  <div className="w-2 h-2 rounded-full bg-cyan-500" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Short Story */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass p-8 md:p-12 rounded-3xl relative overflow-hidden text-center"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-background/50 mb-6 mx-auto">
            <Lightbulb className="w-6 h-6 text-yellow-500" />
          </div>
          <h3 className="font-display text-2xl font-bold mb-4">My Journey in One Paragraph</h3>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto italic">
            "I didn’t start as a system architect — I started as a curious student experimenting with basic code in 12th grade. From building drones in my first year of engineering to designing AI-powered AgriTech infrastructure and digital governance systems, every stage taught me one thing: <span className="text-foreground font-semibold not-italic">technology is powerful when structured correctly</span>. Today, I don’t just build applications — I design ecosystems that connect hardware, software, data, and people into scalable intelligent systems."
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
