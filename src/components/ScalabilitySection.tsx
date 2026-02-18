import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { TrendingUp, Server, Boxes, DollarSign } from 'lucide-react';

const scaleConcepts = [
  {
    icon: TrendingUp,
    title: 'Scaling 1K → 100K Users',
    description: 'Systems designed for horizontal scaling from day one. Stateless services, database sharding strategies, and CDN distribution ensure seamless growth without re-architecture.',
    stages: ['1K users — Single server, optimized queries', '10K users — Load balancer + read replicas', '100K users — Microservices + CDN + auto-scaling'],
  },
  {
    icon: Server,
    title: 'Load Balancing & High Availability',
    description: 'Multi-region deployments with intelligent traffic routing, health checks, and automatic failover to maintain 99.9%+ uptime under any load.',
    stages: ['Round-robin & weighted load balancing', 'Health check-driven traffic routing', 'Multi-AZ deployment with failover'],
  },
  {
    icon: Boxes,
    title: 'Modular Backend Design',
    description: 'Domain-driven microservices architecture where each service is independently deployable, testable, and scalable — no monolith bottlenecks.',
    stages: ['Domain-driven service boundaries', 'Event-driven communication (message queues)', 'Independent CI/CD per service'],
  },
  {
    icon: DollarSign,
    title: 'Cost Optimization',
    description: 'Right-sized infrastructure with auto-scaling policies, reserved instances, and serverless where appropriate to minimize cloud spend without sacrificing performance.',
    stages: ['Auto-scaling based on real metrics', 'Serverless for bursty workloads', 'Reserved instances for baseline load'],
  },
];

const ScalabilitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="scalability" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            SaaS & <span className="text-gradient">Scalability</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            How I design systems that grow with your business — from MVP to enterprise scale.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {scaleConcepts.map((concept, index) => (
            <motion.div
              key={concept.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="group p-6 rounded-2xl glass glass-hover"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <concept.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold mb-1">{concept.title}</h3>
                  <p className="text-sm text-muted-foreground">{concept.description}</p>
                </div>
              </div>

              {/* Scaling stages */}
              <div className="ml-2 border-l-2 border-primary/20 pl-4 space-y-3 mt-4">
                {concept.stages.map((stage, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: index * 0.12 + i * 0.1 + 0.3 }}
                    className="relative"
                  >
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary/60 border-2 border-background" />
                    <p className="text-sm text-muted-foreground">{stage}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScalabilitySection;
