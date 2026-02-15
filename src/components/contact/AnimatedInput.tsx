import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnimatedInputProps {
  name: string;
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  delay?: number;
  isInView: boolean;
}

const AnimatedInput = ({
  name,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  required = true,
  delay = 0,
  isInView
}: AnimatedInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasValue = value.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -15 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay, duration: 0.5, type: "spring", stiffness: 100 }}
      className="relative perspective-1000"
    >
      {/* Floating label */}
      <motion.label
        htmlFor={name}
        className="absolute left-4 pointer-events-none text-muted-foreground z-10"
        initial={false}
        animate={{
          y: isFocused || hasValue ? -28 : 12,
          x: isFocused || hasValue ? -4 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label}
      </motion.label>

      {/* Input container with glow effect */}
      <motion.div
        className="relative rounded-xl overflow-hidden"
        animate={{
          scale: isFocused ? 1.02 : isHovered ? 1.01 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          animate={{
            background: isFocused 
              ? 'linear-gradient(135deg, hsl(var(--primary)), hsl(199 89% 48%), hsl(var(--primary)))' 
              : 'transparent',
            opacity: isFocused ? 1 : 0
          }}
          transition={{ duration: 0.3 }}
          style={{ padding: '2px' }}
        />

        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl blur-xl"
          animate={{
            background: isFocused ? 'hsl(var(--primary) / 0.3)' : 'transparent',
            scale: isFocused ? 1.1 : 1
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Input field */}
        <motion.input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          placeholder={isFocused ? placeholder : ''}
          className="relative w-full px-4 py-4 rounded-xl bg-card/80 backdrop-blur-sm border-2 border-border focus:border-primary focus:ring-0 outline-none transition-colors z-10"
          animate={{
            borderColor: isFocused ? 'hsl(var(--primary))' : 'hsl(var(--border))'
          }}
        />

        {/* Shimmer effect on focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-20"
            initial={{ x: '-100%' }}
            animate={{ x: '200%' }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5 }}
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--primary) / 0.1), transparent)',
              width: '50%'
            }}
          />
        )}
      </motion.div>

      {/* Typing indicator dots */}
      {isFocused && (
        <motion.div 
          className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-1 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnimatedInput;
