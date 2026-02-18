import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { Bot, PenTool, Sparkles, Send } from 'lucide-react';

interface Note {
  id: string;
  text: string;
  timestamp: Date;
  type: 'name' | 'email' | 'message';
}

const ContactAIBot = ({ formData }: { formData: { name: string; email: string; message: string } }) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentWriting, setCurrentWriting] = useState('');
  const [botMood, setBotMood] = useState<'idle' | 'thinking' | 'writing' | 'happy'>('idle');
  const notesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new notes are added
  useEffect(() => {
    notesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [notes]);

  // Monitor form data changes and create notes
  useEffect(() => {
    const newNotes: Note[] = [];
    
    if (formData.name && formData.name.length > 0) {
      const existingNameNote = notes.find(n => n.type === 'name');
      if (!existingNameNote || existingNameNote.text !== formData.name) {
        newNotes.push({
          id: `name-${Date.now()}`,
          text: formData.name,
          timestamp: new Date(),
          type: 'name'
        });
      }
    }
    
    if (formData.email && formData.email.length > 0) {
      const existingEmailNote = notes.find(n => n.type === 'email');
      if (!existingEmailNote || existingEmailNote.text !== formData.email) {
        newNotes.push({
          id: `email-${Date.now()}`,
          text: formData.email,
          timestamp: new Date(),
          type: 'email'
        });
      }
    }
    
    if (formData.message && formData.message.length > 0) {
      const existingMessageNote = notes.find(n => n.type === 'message');
      if (!existingMessageNote || existingMessageNote.text !== formData.message) {
        newNotes.push({
          id: `message-${Date.now()}`,
          text: formData.message,
          timestamp: new Date(),
          type: 'message'
        });
      }
    }
    
    if (newNotes.length > 0) {
      // Simulate AI writing process
      setBotMood('thinking');
      setTimeout(() => {
        setBotMood('writing');
        setIsWriting(true);
        
        newNotes.forEach((note, index) => {
          setTimeout(() => {
            setNotes(prev => {
              const filtered = prev.filter(n => n.type !== note.type);
              return [...filtered, note];
            });
            setCurrentWriting(note.text);
            
            setTimeout(() => {
              setCurrentWriting('');
              setIsWriting(false);
              setBotMood('happy');
              setTimeout(() => setBotMood('idle'), 1000);
            }, 500);
          }, index * 800);
        });
      }, 300);
    }
  }, [formData.name, formData.email, formData.message]);

  const getNoteIcon = (type: Note['type']) => {
    switch (type) {
      case 'name': return '👤';
      case 'email': return '📧';
      case 'message': return '💬';
      default: return '📝';
    }
  };

  const getNoteLabel = (type: Note['type']) => {
    switch (type) {
      case 'name': return 'Name';
      case 'email': return 'Email';
      case 'message': return 'Message';
      default: return 'Note';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="relative"
    >
      {/* AI Bot Container */}
      <motion.div
        className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl glass relative overflow-hidden"
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

        {/* Bot Header with Advanced Face */}
        <motion.div
          className="flex items-center justify-between mb-6 relative"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="relative"
              animate={{
                rotate: botMood === 'writing' ? [0, -5, 5, 0] : 0,
                scale: botMood === 'happy' ? [1, 1.1, 1] : 1
              }}
              transition={{ duration: 0.5 }}
            >
              {/* Advanced AI Face */}
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 backdrop-blur-sm border border-primary/20 flex items-center justify-center relative overflow-hidden">
                {/* Face Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/10 via-cyan-500/10 to-primary/10"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
                
                {/* Eyes */}
                <div className="relative z-10 flex items-center justify-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{
                      scaleY: botMood === 'writing' ? [1, 0.3, 1] : 1,
                      y: botMood === 'thinking' ? [0, -1, 0] : 0
                    }}
                    transition={{ duration: 0.3, repeat: botMood === 'thinking' ? Infinity : 0 }}
                  />
                  <motion.div
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{
                      scaleY: botMood === 'writing' ? [1, 0.3, 1] : 1,
                      y: botMood === 'thinking' ? [0, -1, 0] : 0
                    }}
                    transition={{ duration: 0.3, repeat: botMood === 'thinking' ? Infinity : 0, delay: 0.1 }}
                  />
                </div>
                
                {/* Mouth */}
                <motion.div
                  className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4 h-1 rounded-full bg-primary"
                  animate={{
                    width: botMood === 'happy' ? [4, 8, 4] : 4,
                    height: botMood === 'happy' ? [1, 2, 1] : 1,
                    borderRadius: botMood === 'happy' ? ['4px', '8px', '4px'] : '4px'
                  }}
                  transition={{ duration: 0.5, repeat: botMood === 'happy' ? Infinity : 0 }}
                />
                
                {/* Thinking Bubbles */}
                {botMood === 'thinking' && (
                  <div className="absolute -top-2 -right-2 flex flex-col gap-1">
                    <motion.div
                      className="w-1 h-1 rounded-full bg-primary/60"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-primary/40"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 rounded-full bg-primary/20"
                      animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                )}
                
                {/* Sparkles when happy */}
                {botMood === 'happy' && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="absolute -top-1 -left-1"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-3 h-3 text-foreground" />
                    </motion.div>
                    <motion.div
                      className="absolute -top-1 -right-1"
                      animate={{ rotate: [0, -360] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-3 h-3 text-foreground" />
                    </motion.div>
                  </div>
                )}
              </div>
              
              {/* Bot Status Indicator */}
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-background"
                animate={{
                  backgroundColor: botMood === 'thinking' ? 'rgb(156, 163, 175)' : 
                                 botMood === 'writing' ? 'rgb(34, 197, 94)' :
                                 botMood === 'happy' ? 'rgb(59, 130, 246)' : 'rgb(156, 163, 175)',
                  scale: [1, 1.2, 1]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
            <div>
              <h3 className="font-display text-xl font-bold">AI Assistant</h3>
              <motion.p
                className="text-xs text-muted-foreground"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {botMood === 'thinking' ? '🤔 Thinking...' :
                 botMood === 'writing' ? '✍️ Taking notes...' :
                 botMood === 'happy' ? '😊 Got it!' :
                 '👋 Ready to help!'}
              </motion.p>
            </div>
          </div>
          
          {/* Advanced Pen Tool Animation */}
          <motion.div
            className="relative"
            animate={{
              x: isWriting ? [0, 15, -10, 15, 0] : 0,
              y: isWriting ? [0, -8, 5, -8, 0] : 0,
              rotate: isWriting ? [0, -20, 20, -20, 0] : 0
            }}
            transition={{ duration: 1.5, repeat: isWriting ? Infinity : 0 }}
          >
            <div className="relative">
              <PenTool className="w-6 h-6 text-primary" />
              {isWriting && (
                <>
                  <motion.div
                    className="absolute -inset-3 rounded-full bg-primary/20"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  {/* Writing particles */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-primary"
                      animate={{
                        x: [0, Math.random() * 20 - 10],
                        y: [0, Math.random() * 20 - 10],
                        opacity: [1, 0]
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                      style={{
                        top: '50%',
                        left: '50%'
                      }}
                    />
                  ))}
                </>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Notes Paper */}
        <motion.div
          className="relative bg-background/80 rounded-xl p-4 border border-border/50 min-h-[200px] max-h-[300px] overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {/* Paper Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute left-0 right-0 h-px bg-border/20"
                style={{ top: `${(i + 1) * 12.5}%` }}
              />
            ))}
          </div>

          {/* Notes Content */}
          <div className="relative space-y-3">
            <AnimatePresence>
              {notes.map((note) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, x: -20, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-2 p-2 rounded-lg bg-background/50 border border-border/30"
                >
                  <span className="text-sm">{getNoteIcon(note.type)}</span>
                  <div className="flex-1">
                    <div className="text-xs text-muted-foreground mb-1">
                      {getNoteLabel(note.type)}
                    </div>
                    <div className="text-sm text-foreground">
                      {note.text}
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {note.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Current Writing Animation */}
            <AnimatePresence>
              {currentWriting && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center gap-2 p-2 rounded-lg bg-primary/5 border border-primary/20"
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-4 h-4 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <div className="text-sm text-primary">
                      {currentWriting}
                      <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                        className="inline-block w-2 h-3 bg-primary ml-1 align-middle"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Empty State */}
            {notes.length === 0 && !currentWriting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 text-muted-foreground"
              >
                <PenTool className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Start typing and I'll take notes...</p>
              </motion.div>
            )}
          </div>
          
          <div ref={notesEndRef} />
        </motion.div>

        {/* Bot Actions */}
        <motion.div
          className="flex items-center justify-between mt-4 relative"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex items-center gap-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs text-muted-foreground">AI Assistant Online</span>
          </div>
          
          {notes.length > 0 && (
            <motion.button
              className="text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setNotes([])}
            >
              <Send className="w-3 h-3" />
              Clear Notes
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ContactAIBot;
