import { motion } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/Agyat192', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/sunil-bokare', label: 'LinkedIn' },
  { icon: Instagram, href: 'https://www.instagram.com/sunil_bokare_patil_192?utm_source=qr&igsh=YXNhbjl6bHoyc3ph', label: 'Instagram' },
  { icon: Mail, href: 'mailto:snlbokare@gmail.com', label: 'Email' },
];

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, hsl(217, 91%, 60%) 1px, transparent 1px),
              linear-gradient(to bottom, hsl(217, 91%, 60%) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo/Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <h3 className="font-display text-2xl font-bold text-gradient mb-2">
              Sunil Bokare
            </h3>
            <p className="text-muted-foreground text-sm">
              Building the future, one line of code at a time.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group w-10 h-10 sm:w-12 sm:h-12 rounded-full glass flex items-center justify-center hover:bg-primary/10 hover:scale-110 transition-all duration-300"
                data-magnetic
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground"
        >
          <p>
            © {new Date().getFullYear()} Sunil Bokare. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
