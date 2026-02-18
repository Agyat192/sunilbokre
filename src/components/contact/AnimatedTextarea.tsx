import { motion } from 'framer-motion';
import { useState } from 'react';

interface AnimatedTextareaProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  required?: boolean;
  rows?: number;
  delay?: number;
  isInView: boolean;
  maxLength?: number;
}

const AnimatedTextarea = ({
  name,
  label,
  value,
  onChange,
  placeholder,
  required = true,
  rows = 5,
  delay = 0,
  isInView,
  maxLength = 500
}: AnimatedTextareaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const hasValue = value.length > 0;
  const charCount = value.length;
  const charPercentage = (charCount / maxLength) * 100;

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
          y: isFocused || hasValue ? -28 : 16,
          x: isFocused || hasValue ? -4 : 0,
          scale: isFocused || hasValue ? 0.85 : 1,
          color: isFocused ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {label}
      </motion.label>

      {/* Textarea container */}
      <motion.div
        className="relative rounded-xl overflow-hidden"
        animate={{
          scale: isFocused ? 1.01 : isHovered ? 1.005 : 1,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 rounded-xl blur-xl"
          animate={{
            background: isFocused ? 'hsl(var(--primary) / 0.2)' : 'transparent',
            scale: isFocused ? 1.05 : 1
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Textarea field */}
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required={required}
          rows={rows}
          maxLength={maxLength}
          placeholder={isFocused ? placeholder : ''}
          className="relative w-full px-4 py-4 rounded-xl bg-card/80 backdrop-blur-sm border-2 border-border focus:border-primary focus:ring-0 outline-none transition-colors resize-none z-10"
        />

        {/* Animated corner accent */}
        <motion.div
          className="absolute bottom-0 right-0 w-8 h-8 pointer-events-none z-20"
          animate={{
            opacity: isFocused ? 1 : 0.3
          }}
        >
          <svg viewBox="0 0 32 32" className="w-full h-full">
            <motion.path
              d="M32 32 L32 24 Q32 32 24 32 Z"
              fill="hsl(var(--primary))"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isFocused ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Character counter */}
      <motion.div 
        className="absolute -bottom-6 right-2 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: isFocused || hasValue ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Progress bar */}
        <div className="w-20 h-1 bg-border rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            animate={{
              width: `${charPercentage}%`,
              backgroundColor: charPercentage > 90 
                ? 'hsl(var(--destructive))' 
                : charPercentage > 70 
                  ? 'hsl(45 93% 47%)' 
                  : 'hsl(var(--primary))'
            }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </div>
        <motion.span 
          className="text-xs text-muted-foreground"
          animate={{
            color: charPercentage > 90 ? 'hsl(var(--destructive))' : 'hsl(var(--muted-foreground))'
          }}
        >
          {charCount}/{maxLength}
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedTextarea;
