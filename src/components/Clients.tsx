import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { X, Globe, ExternalLink } from 'lucide-react';
import MouseParallaxImage from './MouseParallaxImage';
import ImageGallery3D from './ImageGallery3D';
import clientSudarshan from '@/assets/sudarshanaerialsolutions.jpg';
import clientSudarshan2 from '@/assets/sudarshanaerialsolutions1.jpg';
import clientRaiseup from '@/assets/raseup.jpeg';
import clientRaiseup2 from '@/assets/raseup2.jpeg';
import projectBhoomivardhan from '@/assets/Bhoomivardhan.jpg';
import projectBhoomivardhan2 from '@/assets/bhoomivardhan2.jpeg';
import projectBhoomivardhan3 from '@/assets/bhoomivardhan3.jpeg';

const clients = [
  { name: 'Magic', description: 'Digital Innovation Partner', image: '', gallery: [], url: '' },
  { name: 'Sudarshan Aerial Solution', description: 'Drone Technology Solutions', image: clientSudarshan, gallery: [clientSudarshan, clientSudarshan2], url: '' },
  { name: 'Wari Foundation', description: 'Social Impact Initiative', image: '', gallery: [], url: '' },
  { name: 'RaiseUp', description: 'Startup Acceleration', image: clientRaiseup, gallery: [clientRaiseup, clientRaiseup2], url: '' },
  { name: 'Bhoomivardhan', description: 'Agritech Innovation', image: projectBhoomivardhan, gallery: [projectBhoomivardhan, projectBhoomivardhan2, projectBhoomivardhan3], url: 'https://bhoomivardhan.com' },
];

type Client = typeof clients[0];

const ClientModal = ({ client, onClose }: { client: Client; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      onClick={onClose}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-primary/5 backdrop-blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <motion.div
        initial={{
          scale: 0.2,
          opacity: 0,
          rotateX: 40,
          rotateY: -60,
          z: -800,
        }}
        animate={{
          scale: 1,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
        }}
        exit={{
          scale: 0.4,
          opacity: 0,
          rotateX: -20,
          rotateY: 50,
          z: -500,
        }}
        transition={{
          type: "spring",
          damping: 22,
          stiffness: 130,
          mass: 0.7,
        }}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl"
        style={{ 
          perspective: '1200px', 
          transformStyle: 'preserve-3d',
          background: 'linear-gradient(135deg, hsl(var(--background) / 0.95), hsl(var(--card) / 0.9))',
          backdropFilter: 'blur(20px)',
          border: '1px solid hsl(var(--primary) / 0.2)',
          boxShadow: '0 25px 50px -12px hsl(var(--primary) / 0.25), 0 0 0 1px hsl(var(--primary) / 0.1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero Image with mouse parallax */}
        <div className="relative w-full h-56 md:h-72 overflow-hidden flex items-center justify-center" style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--secondary) / 0.05))'
        }}>
          {client.image ? (
            <MouseParallaxImage
              src={client.image}
              alt={client.name}
              className="w-full h-full"
            />
          ) : (
            <div className="text-4xl font-display font-bold text-muted-foreground/30">
              Coming Soon
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent pointer-events-none" />

          {/* Floating client name */}
          <motion.div
            className="absolute bottom-6 left-8 right-8"
            initial={{ opacity: 0, y: 50, rotateX: -30 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          >
            {/* Logo circle */}
            <motion.div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mb-3 relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.1))',
                backdropFilter: 'blur(10px)',
                border: '1px solid hsl(var(--primary) / 0.3)'
              }}
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(45deg, hsl(var(--primary) / 0.1), transparent, hsl(var(--accent) / 0.1))'
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />
              <span className="font-display text-2xl font-bold text-gradient relative z-10">
                {client.name.charAt(0)}
              </span>
            </motion.div>
            <motion.h2
              className="font-display text-3xl md:text-4xl font-bold text-foreground drop-shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              {client.name}
            </motion.h2>
            <motion.p
              className="text-muted-foreground/90 text-lg mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {client.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Close button */}
        <motion.button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center z-20 transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--background) / 0.9), hsl(var(--card) / 0.8))',
            backdropFilter: 'blur(10px)',
            border: '1px solid hsl(var(--border) / 0.5)'
          }}
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          whileHover={{ 
            scale: 1.1, 
            rotate: 90,
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.1), hsl(var(--accent) / 0.05))',
            borderColor: 'hsl(var(--primary) / 0.5)'
          }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-5 h-5 text-foreground" />
        </motion.button>

        {/* Content */}
        <div className="p-8" style={{
          background: 'linear-gradient(180deg, transparent, hsl(var(--background) / 0.3))'
        }}>
          {client.url && (
            <motion.a
              href={client.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.1))',
                color: 'hsl(var(--primary))',
                border: '1px solid hsl(var(--primary) / 0.2)'
              }}
              initial={{ opacity: 0, x: -30, rotateY: -20 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
              whileHover={{ 
                scale: 1.05, 
                x: 5,
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.25), hsl(var(--accent) / 0.2))',
                borderColor: 'hsl(var(--primary) / 0.4)',
                boxShadow: '0 10px 25px hsl(var(--primary) / 0.2)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Globe className="w-5 h-5" />
              <span>{client.url}</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ExternalLink className="w-4 h-4" />
              </motion.div>
            </motion.a>
          )}

          {/* Image Gallery */}
          {client.gallery && client.gallery.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-6"
              style={{
                background: 'linear-gradient(135deg, hsl(var(--card) / 0.3), hsl(var(--secondary) / 0.1))',
                borderRadius: '1rem',
                padding: '1rem',
                border: '1px solid hsl(var(--border) / 0.3)'
              }}
            >
              <ImageGallery3D images={client.gallery} title={client.name} />
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Counter animation component
const CountUp = ({ end, duration, delay, isInView }: { end: number; duration: number; delay: number; isInView: boolean }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      const startTime = Date.now();

      const updateCount = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / (duration * 1000), 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(easeProgress * end));

        if (progress < 1) {
          countRef.current = requestAnimationFrame(updateCount);
        }
      };

      countRef.current = requestAnimationFrame(updateCount);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
      if (countRef.current) cancelAnimationFrame(countRef.current);
    };
  }, [end, duration, delay, isInView]);

  return <>{count}</>;
};

const Clients = () => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="clients" className="section-padding relative overflow-hidden" ref={containerRef}>
      <div className="max-w-6xl mx-auto" ref={ref}>
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
            transition={{ type: "spring", stiffness: 100 }}
          >
            Clients & <span className="text-gradient">Collaborations</span>
          </motion.h2>
          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Trusted by innovative organizations across industries
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

          <motion.div className="flex overflow-hidden" style={{ x: x1 }}>
            <motion.div
              animate={{ x: [0, "-50%"] }}
              transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 25, ease: "linear" } }}
              className="flex gap-8 py-4"
            >
              {[...clients, ...clients].map((client, index) => (
                <motion.div
                  key={index}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  onClick={() => setSelectedClient(client)}
                  className="group flex-shrink-0 w-48 sm:w-64 rounded-2xl glass glass-hover transition-all duration-300 cursor-pointer overflow-hidden"
                  data-magnetic
                  whileHover={{ scale: 1.05, y: -10, rotateY: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {/* Client image thumbnail */}
                  <div className="relative w-full h-24 sm:h-32 overflow-hidden flex items-center justify-center bg-secondary/30">
                    {client.image ? (
                      <img src={client.image} alt={client.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground/60">Coming Soon</span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  </div>

                  <div className="p-4">
                    <motion.div
                      className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-cyan-500/20 flex items-center justify-center mb-3 relative overflow-hidden"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-primary/30 to-cyan-500/30"
                        animate={{ rotate: hoveredIndex === index ? 360 : 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="font-display text-sm font-bold text-gradient relative z-10">
                        {client.name.charAt(0)}
                      </span>
                    </motion.div>

                    <motion.h3
                      className="font-display text-base font-semibold mb-1"
                      animate={{ color: hoveredIndex === index ? 'hsl(var(--primary))' : 'hsl(var(--foreground))' }}
                    >
                      {client.name}
                    </motion.h3>
                    <p className="text-xs text-muted-foreground">{client.description}</p>

                    <motion.div
                      className="mt-2 text-xs text-primary font-medium"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0, y: hoveredIndex === index ? 0 : 10 }}
                      transition={{ duration: 0.2 }}
                    >
                      View details →
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: 10, suffix: '+', label: 'Projects Delivered' },
            { value: 10, suffix: '+', label: 'Happy Clients' },
            { value: 3, suffix: '+', label: 'Years Experience' },
            { value: 99, suffix: '%', label: 'Client Satisfaction' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-4 sm:p-6 rounded-2xl glass"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 40px hsl(var(--primary) / 0.15)" }}
            >
              <motion.div
                className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gradient mb-2"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <CountUp end={stat.value} duration={2} delay={0.8 + index * 0.1} isInView={isInView} />
                {stat.suffix}
              </motion.div>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedClient && (
          <ClientModal
            client={selectedClient}
            onClose={() => setSelectedClient(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Clients;
