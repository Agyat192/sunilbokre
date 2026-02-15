import { motion } from 'framer-motion';
import { Send, CheckCircle, Sparkles } from 'lucide-react';

interface SubmitButtonProps {
  isSubmitting: boolean;
  isSubmitted: boolean;
  delay?: number;
  isInView: boolean;
}

const SubmitButton = ({ isSubmitting, isSubmitted, delay = 0, isInView }: SubmitButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="relative"
    >
      <motion.button
        type="submit"
        disabled={isSubmitting || isSubmitted}
        className="relative w-full py-4 rounded-xl font-medium flex items-center justify-center gap-3 disabled:cursor-not-allowed overflow-hidden group"
        whileHover={{ scale: isSubmitting || isSubmitted ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting || isSubmitted ? 1 : 0.98 }}
        animate={{
          background: isSubmitted 
            ? 'linear-gradient(135deg, hsl(142 76% 36%), hsl(142 71% 45%))' 
            : 'linear-gradient(135deg, hsl(var(--primary)), hsl(199 89% 48%))'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Animated background particles */}
        {!isSubmitting && !isSubmitted && (
          <>
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/30 rounded-full"
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 40 - 20],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                  ease: "easeOut"
                }}
                style={{
                  left: `${20 + i * 12}%`,
                  top: '50%'
                }}
              />
            ))}
          </>
        )}

        {/* Shimmer effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent"
          animate={{ x: ['-200%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          style={{ width: '50%' }}
        />

        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            boxShadow: '0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)'
          }}
        />

        {/* Button content */}
        <span className="relative z-10 text-white font-semibold tracking-wide">
          {isSubmitting ? (
            <motion.div className="flex items-center gap-2">
              <motion.div 
                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Sending...
              </motion.span>
            </motion.div>
          ) : isSubmitted ? (
            <motion.div 
              className="flex items-center gap-2"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircle className="w-5 h-5" />
              </motion.div>
              <span>Message Sent!</span>
              <Sparkles className="w-4 h-4" />
            </motion.div>
          ) : (
            <motion.div className="flex items-center gap-2">
              <span>Send Message</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Send className="w-5 h-5" />
              </motion.div>
            </motion.div>
          )}
        </span>

        {/* Ripple effect on click */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ scale: 0, opacity: 0.5 }}
          whileTap={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background: 'radial-gradient(circle, white 0%, transparent 70%)',
            transformOrigin: 'center'
          }}
        />
      </motion.button>

      {/* Success confetti effect */}
      {isSubmitted && (
        <motion.div className="absolute inset-0 pointer-events-none overflow-visible">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: ['hsl(var(--primary))', 'hsl(199 89% 48%)', 'hsl(142 76% 36%)', '#FFD700'][i % 4],
                left: '50%',
                top: '50%'
              }}
              initial={{ x: 0, y: 0, scale: 0 }}
              animate={{
                x: (Math.random() - 0.5) * 200,
                y: (Math.random() - 0.5) * 100 - 50,
                scale: [0, 1, 0],
                rotate: Math.random() * 360
              }}
              transition={{ duration: 0.8, delay: i * 0.05 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};


export default SubmitButton;
