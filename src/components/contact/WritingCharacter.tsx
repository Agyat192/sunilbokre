import { motion } from 'framer-motion';

interface WritingCharacterProps {
  isTyping: boolean;
  userName: string;
}

const WritingCharacter = ({ isTyping, userName }: WritingCharacterProps) => {
  const bubbleText = isTyping
    ? userName
      ? `Writing down ${userName.split(' ')[0]}'s details... ✍️`
      : 'Taking notes... ✍️'
    : userName
      ? `Go on, ${userName.split(' ')[0]}! 😊`
      : 'Start typing, I\'ll note it! 📝';

  return (
    <motion.div
      className="flex flex-col items-center gap-1 mb-4 select-none"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, type: 'spring' }}
    >
      {/* Speech bubble */}
      <motion.div
        className="relative px-4 py-2 rounded-2xl bg-primary/10 border border-primary/20 text-xs text-primary font-medium max-w-[220px] text-center"
        animate={{ y: isTyping ? -3 : 0, scale: isTyping ? 1.03 : 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <motion.span key={isTyping ? 'a' : 'b'} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {bubbleText}
        </motion.span>
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-primary/10 border-r border-b border-primary/20" />
      </motion.div>

      {/* Character container */}
      <motion.div
        className="relative"
        animate={{ y: isTyping ? [0, -3, 0] : [0, -2, 0] }}
        transition={{
          duration: isTyping ? 0.5 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="100" height="110" viewBox="0 0 100 110" fill="none">
          {/* Shadow */}
          <motion.ellipse
            cx="50" cy="106" rx="22" ry="4"
            fill="hsl(var(--primary) / 0.08)"
            initial={{ rx: 22 }}
            animate={{ rx: isTyping ? [22, 18, 22] : [22, 20, 22] }}
            transition={{ duration: isTyping ? 0.5 : 3, repeat: Infinity }}
          />

          {/* Notepad (right side, held in right hand) */}
          <motion.g
            animate={{ rotate: isTyping ? [-1, 1, -1] : 0 }}
            transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
            style={{ transformOrigin: '82px 72px' }}
          >
            <rect x="70" y="58" width="20" height="26" rx="2.5" fill="hsl(var(--foreground) / 0.05)" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1.2" />
            {/* Ruled lines */}
            <line x1="73" y1="64" x2="87" y2="64" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.6" />
            <line x1="73" y1="68" x2="87" y2="68" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.6" />
            <line x1="73" y1="72" x2="87" y2="72" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.6" />
            <line x1="73" y1="76" x2="87" y2="76" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.6" />
            {/* Written text lines (animated fill) */}
            <motion.line
              x1="73" y1="64" x2="87" y2="64"
              stroke="hsl(var(--primary) / 0.5)"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ x2: 73, opacity: 0 }}
              animate={{ x2: isTyping ? [73, 87, 73] : 73, opacity: isTyping ? 1 : 0 }}
              transition={{ duration: 1.4, repeat: isTyping ? Infinity : 0 }}
            />
            <motion.line
              x1="73" y1="68" x2="85" y2="68"
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ x2: 73, opacity: 0 }}
              animate={{ x2: isTyping ? [73, 85, 73] : 73, opacity: isTyping ? 0.8 : 0 }}
              transition={{ duration: 1.6, repeat: isTyping ? Infinity : 0, delay: 0.2 }}
            />
            <motion.line
              x1="73" y1="72" x2="82" y2="72"
              stroke="hsl(var(--primary) / 0.3)"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ x2: 73, opacity: 0 }}
              animate={{ x2: isTyping ? [73, 82, 73] : 73, opacity: isTyping ? 0.6 : 0 }}
              transition={{ duration: 1.8, repeat: isTyping ? Infinity : 0, delay: 0.4 }}
            />
            {/* Notepad spiral */}
            <circle cx="72" cy="60" r="1.2" fill="hsl(var(--primary) / 0.25)" />
            <circle cx="72" cy="65" r="1.2" fill="hsl(var(--primary) / 0.25)" />
            <circle cx="72" cy="70" r="1.2" fill="hsl(var(--primary) / 0.25)" />
            <circle cx="72" cy="75" r="1.2" fill="hsl(var(--primary) / 0.25)" />
            <circle cx="72" cy="80" r="1.2" fill="hsl(var(--primary) / 0.25)" />
          </motion.g>

          {/* Body */}
          <motion.rect
            x="30" y="52" width="40" height="38" rx="12"
            fill="hsl(var(--primary) / 0.12)"
            stroke="hsl(var(--primary) / 0.3)"
            strokeWidth="1.3"
            animate={{ scaleY: isTyping ? [1, 0.97, 1] : 1 }}
            transition={{ duration: 0.4, repeat: isTyping ? Infinity : 0 }}
            style={{ transformOrigin: '50px 70px' }}
          />
          {/* Body highlight */}
          <rect x="38" y="58" width="8" height="4" rx="2" fill="hsl(var(--primary) / 0.1)" />

          {/* Head */}
          <motion.g
            animate={{ y: isTyping ? [0, -1.5, 0] : [0, -1, 0], rotate: isTyping ? [0, -3, 0, 2, 0] : 0 }}
            transition={{ duration: isTyping ? 0.6 : 3, repeat: Infinity }}
            style={{ transformOrigin: '50px 30px' }}
          >
            <rect x="28" y="12" width="44" height="38" rx="14" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.35)" strokeWidth="1.3" />

            {/* Left eye */}
            <motion.g>
              <circle cx="42" cy="28" r="4" fill="hsl(var(--foreground) / 0.06)" />
              <motion.ellipse
                cx="42" cy="28" rx="2.5" ry="2.5"
                fill="hsl(var(--primary))"
                initial={{ rx: 2.5, ry: 2.5, cx: 42 }}
                animate={{
                  ry: isTyping ? [2.5, 2.5, 0.4, 2.5] : [2.5, 2.5, 0.4, 2.5],
                  cx: isTyping ? [42, 43, 42] : 42,
                }}
                transition={{
                  ry: { duration: isTyping ? 1 : 4, repeat: Infinity, repeatDelay: isTyping ? 0.8 : 2 },
                  cx: { duration: 0.8, repeat: isTyping ? Infinity : 0 },
                }}
              />
              <circle cx="43.2" cy="26.5" r="0.8" fill="white" opacity={0.9} />
            </motion.g>

            {/* Right eye */}
            <motion.g>
              <circle cx="58" cy="28" r="4" fill="hsl(var(--foreground) / 0.06)" />
              <motion.ellipse
                cx="58" cy="28" rx="2.5" ry="2.5"
                fill="hsl(var(--primary))"
                initial={{ rx: 2.5, ry: 2.5, cx: 58 }}
                animate={{
                  ry: isTyping ? [2.5, 2.5, 0.4, 2.5] : [2.5, 2.5, 0.4, 2.5],
                  cx: isTyping ? [58, 59, 58] : 58,
                }}
                transition={{
                  ry: { duration: isTyping ? 1 : 4, repeat: Infinity, repeatDelay: isTyping ? 0.8 : 2 },
                  cx: { duration: 0.8, repeat: isTyping ? Infinity : 0 },
                }}
              />
              <circle cx="59.2" cy="26.5" r="0.8" fill="white" opacity={0.9} />
            </motion.g>

            {/* Mouth */}
            <motion.path
              stroke="hsl(var(--primary) / 0.6)"
              strokeWidth="1.3"
              strokeLinecap="round"
              fill="none"
              initial={{ d: 'M44 36 Q50 40 56 36' }}
              animate={{
                d: isTyping
                  ? ['M44 37 Q50 41 56 37', 'M44 36 Q50 39 56 36', 'M44 37 Q50 41 56 37']
                  : 'M44 36 Q50 40 56 36',
              }}
              transition={{ duration: 0.5, repeat: isTyping ? Infinity : 0 }}
            />

            {/* Antenna */}
            <motion.line
              x1="50" y1="12" x2="50" y2="4"
              stroke="hsl(var(--primary) / 0.35)"
              strokeWidth="1.3"
              strokeLinecap="round"
              initial={{ x2: 50 }}
              animate={{ x2: isTyping ? [50, 48, 52, 50] : 50 }}
              transition={{ duration: 0.6, repeat: isTyping ? Infinity : 0 }}
            />
            <motion.circle
              cx="50" cy="3" r="2.5"
              fill="hsl(var(--primary) / 0.2)"
              stroke="hsl(var(--primary) / 0.4)"
              strokeWidth="0.8"
              initial={{ fill: 'hsl(var(--primary) / 0.2)' }}
              animate={{
                fill: isTyping
                  ? ['hsl(var(--primary) / 0.2)', 'hsl(var(--primary) / 0.5)', 'hsl(var(--primary) / 0.2)']
                  : 'hsl(var(--primary) / 0.2)',
              }}
              transition={{ duration: 0.8, repeat: isTyping ? Infinity : 0 }}
            />
          </motion.g>

          {/* Right arm — holds notepad steady */}
          <motion.path
            d="M70 62 Q76 58 78 65"
            stroke="hsl(var(--primary) / 0.35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left arm — writing hand with pen */}
          <motion.path
            stroke="hsl(var(--primary) / 0.35)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            initial={{ d: 'M30 62 Q22 58 18 66' }}
            animate={{
              d: isTyping
                ? ['M30 62 Q20 56 16 64', 'M30 62 Q18 54 14 62', 'M30 62 Q20 56 16 64']
                : 'M30 62 Q22 58 18 66',
            }}
            transition={{ duration: 0.3, repeat: isTyping ? Infinity : 0 }}
          />

          {/* Pen */}
          <motion.g
            animate={{
              rotate: isTyping ? [5, -5, 5] : 0,
              y: isTyping ? [-1, 1, -1] : 0,
              x: isTyping ? [0, 1, 0] : 0,
            }}
            transition={{ duration: 0.3, repeat: isTyping ? Infinity : 0 }}
            style={{ transformOrigin: '16px 64px' }}
          >
            <line x1="16" y1="60" x2="10" y2="74" stroke="hsl(var(--primary) / 0.7)" strokeWidth="2" strokeLinecap="round" />
            <line x1="10" y1="74" x2="9" y2="78" stroke="hsl(var(--primary))" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="9" cy="78.5" r="1" fill="hsl(var(--primary))" />
          </motion.g>

          {/* Pen sparkles when typing */}
          {isTyping && (
            <>
              <motion.circle cx="8" cy="74" r="1.5" fill="hsl(var(--primary) / 0.6)"
                animate={{ opacity: [0, 1, 0], y: [0, -6, -12], scale: [0.5, 1, 0.3] }}
                transition={{ duration: 0.7, repeat: Infinity }}
              />
              <motion.circle cx="12" cy="72" r="1" fill="hsl(var(--primary) / 0.4)"
                animate={{ opacity: [0, 0.8, 0], y: [0, -8, -14], x: [0, 3, 5] }}
                transition={{ duration: 0.9, repeat: Infinity, delay: 0.2 }}
              />
              <motion.circle cx="5" cy="76" r="0.8" fill="hsl(var(--primary) / 0.3)"
                animate={{ opacity: [0, 0.7, 0], y: [0, -5, -10], x: [0, -2, -4] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
              />
            </>
          )}

          {/* Feet */}
          <ellipse cx="40" cy="92" rx="8" ry="4" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.2)" strokeWidth="0.8" />
          <ellipse cx="60" cy="92" rx="8" ry="4" fill="hsl(var(--primary) / 0.1)" stroke="hsl(var(--primary) / 0.2)" strokeWidth="0.8" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default WritingCharacter;
