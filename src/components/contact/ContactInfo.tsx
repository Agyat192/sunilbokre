import { motion } from 'framer-motion';
import { Mail, MapPin, MessageCircle, LucideIcon } from 'lucide-react';

interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface ContactInfoProps {
  isInView: boolean;
}

const contactInfo: ContactItem[] = [
  { icon: Mail, label: 'Email', value: 'contact@sunilbokare.dev' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+91 XXX XXX XXXX' },
  { icon: MapPin, label: 'Location', value: 'Maharashtra, India' }
];

const ContactInfo = ({ isInView }: ContactInfoProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-8"
    >
      <motion.div 
        className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl glass relative overflow-hidden"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              'radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 100% 100%, hsl(var(--primary) / 0.2) 0%, transparent 50%)',
              'radial-gradient(circle at 0% 0%, hsl(var(--primary) / 0.2) 0%, transparent 50%)'
            ]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <motion.h3 
          className="font-display text-2xl font-bold mb-6 relative"
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              backgroundImage: 'linear-gradient(90deg, hsl(var(--foreground)), hsl(var(--primary)), hsl(var(--foreground)))',
              backgroundSize: '200%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Get in Touch
          </motion.span>
        </motion.h3>

        <div className="space-y-6 relative">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.label}
              className="flex items-start gap-4 group cursor-pointer"
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, type: "spring" }}
              whileHover={{ x: 10 }}
            >
              <motion.div 
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 relative overflow-hidden"
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 5,
                  backgroundColor: 'hsl(var(--primary) / 0.2)'
                }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {/* Icon glow */}
                <motion.div
                  className="absolute inset-0 bg-primary/20 blur-lg"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.5 }}
                />
                
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <item.icon className="w-6 h-6 text-primary relative z-10" />
                </motion.div>

                {/* Ripple effect */}
                <motion.div
                  className="absolute inset-0 border-2 border-primary/30 rounded-2xl"
                  initial={{ scale: 1, opacity: 0 }}
                  whileHover={{ scale: 1.5, opacity: [0, 0.5, 0] }}
                  transition={{ duration: 0.6 }}
                />
              </motion.div>

              <div className="pt-1">
                <motion.h4 
                  className="font-medium mb-1 transition-colors"
                  whileHover={{ color: 'hsl(var(--primary))' }}
                >
                  {item.label}
                </motion.h4>
                <motion.p 
                  className="text-muted-foreground"
                  initial={{ opacity: 0.7 }}
                  whileHover={{ opacity: 1 }}
                >
                  {item.value}
                </motion.p>
              </div>

              {/* Arrow indicator */}
              <motion.div
                className="ml-auto self-center text-primary opacity-0 group-hover:opacity-100"
                initial={{ x: -10 }}
                whileHover={{ x: 0 }}
                transition={{ type: "spring" }}
              >
                →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Availability badge */}
      <motion.div 
        className="p-6 rounded-2xl glass inline-flex items-center gap-4 relative overflow-hidden"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ delay: 0.7, type: "spring" }}
        whileHover={{ scale: 1.05, y: -2 }}
      >
        {/* Pulse ring */}
        <div className="relative">
          <motion.div 
            className="w-4 h-4 rounded-full bg-green-500"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500"
            animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute inset-0 rounded-full bg-green-500"
            animate={{ scale: [1, 2], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
        </div>

        <div>
          <motion.span 
            className="text-foreground font-medium"
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Available for new projects
          </motion.span>
          <motion.p 
            className="text-xs text-muted-foreground mt-0.5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Usually responds within 24 hours
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactInfo;
