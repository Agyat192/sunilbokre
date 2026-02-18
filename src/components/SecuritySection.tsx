import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Shield, Lock, KeyRound, Users, Cloud, Eye } from 'lucide-react';

const securityPillars = [
  {
    icon: Shield,
    title: 'Security-First Architecture',
    description: 'Every system is designed with security at the foundation — not bolted on as an afterthought.',
    details: ['Threat modeling before development', 'Secure SDLC practices', 'Regular penetration testing'],
  },
  {
    icon: KeyRound,
    title: 'API Authentication Models',
    description: 'Multi-layered API security ensuring only authorized access at every endpoint.',
    details: ['JWT & OAuth 2.0 implementation', 'API key rotation policies', 'Rate limiting & throttling'],
  },
  {
    icon: Lock,
    title: 'Data Encryption Strategies',
    description: 'End-to-end encryption for data at rest and in transit across all services.',
    details: ['AES-256 encryption at rest', 'TLS 1.3 for data in transit', 'Encrypted backup systems'],
  },
  {
    icon: Users,
    title: 'Role-Based Access Control',
    description: 'Granular permission systems ensuring users only access what they need.',
    details: ['RBAC with custom roles', 'Attribute-based access control', 'Audit logging for all actions'],
  },
  {
    icon: Cloud,
    title: 'Secure Cloud Deployment',
    description: 'Hardened cloud infrastructure with automated security monitoring.',
    details: ['VPC network isolation', 'WAF & DDoS protection', 'Automated vulnerability scanning'],
  },
  {
    icon: Eye,
    title: 'Monitoring & Compliance',
    description: 'Real-time monitoring with compliance-ready logging and alerting.',
    details: ['SIEM integration', 'Real-time alerting', 'Compliance reporting (SOC2-ready)'],
  },
];

const SecuritySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="security" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-destructive/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Security & <span className="text-gradient">Optimization</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A security-first development approach that differentiates enterprise-grade systems from typical app development.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityPillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-2xl glass glass-hover"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <pillar.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{pillar.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{pillar.description}</p>
              <ul className="space-y-1.5">
                {pillar.details.map((detail) => (
                  <li key={detail} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
