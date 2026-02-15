import { motion, useInView } from 'framer-motion';
import { useRef, useState, useCallback } from 'react';
import { CheckCircle, Sparkles } from 'lucide-react';
import AnimatedInput from './contact/AnimatedInput';
import AnimatedTextarea from './contact/AnimatedTextarea';
import SubmitButton from './contact/SubmitButton';
import ContactInfo from './contact/ContactInfo';
import WritingCharacter from './contact/WritingCharacter';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleTypingDetection = useCallback(() => {
    setIsUserTyping(true);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => setIsUserTyping(false), 600);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 3000);
      } else {
        console.error('Failed to send message:', data.message);
        // You might want to show an error message to the user here
        alert('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('An error occurred. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    handleTypingDetection();
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }));
    handleTypingDetection();
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      {/* Animated mesh gradient background */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: [
            'radial-gradient(ellipse at 0% 100%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 100% 0%, hsl(199 89% 48% / 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 100% 100%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 0% 0%, hsl(199 89% 48% / 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 0% 100%, hsl(var(--primary) / 0.15) 0%, transparent 50%), radial-gradient(ellipse at 100% 0%, hsl(199 89% 48% / 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/20"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 30}%`
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2],
            scale: [1, 1.5, 1]
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
        />
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header with stagger animation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Let's work together</span>
          </motion.div>

          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {"Let's Connect".split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.03 }}
                className={char === ' ' ? 'mr-3' : ''}
              >
                {char === 'C' ? <span className="text-gradient">{char}</span> : char}
              </motion.span>
            ))}
            <motion.span
              className="text-gradient"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.8 }}
            >
              onnect
            </motion.span>
          </motion.h2>

          <motion.p
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            Have a project in mind? Let's discuss how we can work together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <ContactInfo isInView={isInView} />

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: -5 }}
            animate={isInView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="perspective-1000"
          >
            <motion.form
              onSubmit={handleSubmit}
              className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl glass relative overflow-hidden"
              whileHover={{
                boxShadow: "0 20px 60px hsl(var(--primary) / 0.15)",
                y: -5
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Form header glow line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Success overlay */}
              <motion.div
                className="absolute inset-0 bg-background/95 backdrop-blur-md flex items-center justify-center z-30 rounded-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: isSubmitted ? 1 : 0 }}
                style={{ pointerEvents: isSubmitted ? 'auto' : 'none' }}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: isSubmitted ? 1 : 0, rotate: isSubmitted ? 0 : -180 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-center"
                >
                  <motion.div
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </motion.div>
                  <motion.p
                    className="text-2xl font-display font-bold mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: isSubmitted ? 1 : 0, y: isSubmitted ? 0 : 10 }}
                    transition={{ delay: 0.2 }}
                  >
                    Message Sent!
                  </motion.p>
                  <motion.p
                    className="text-muted-foreground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isSubmitted ? 1 : 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    I'll get back to you soon.
                  </motion.p>
                </motion.div>
              </motion.div>

              {/* AI Writing Character */}
              <WritingCharacter isTyping={isUserTyping} userName={formState.name} />

              <div className="space-y-8">
                <AnimatedInput
                  name="name"
                  label="Your Name"
                  value={formState.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  delay={0.5}
                  isInView={isInView}
                />

                <AnimatedInput
                  name="email"
                  label="Email Address"
                  type="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  delay={0.6}
                  isInView={isInView}
                />

                <AnimatedTextarea
                  name="message"
                  label="Your Message"
                  value={formState.message}
                  onChange={handleTextareaChange}
                  placeholder="Tell me about your project..."
                  delay={0.7}
                  isInView={isInView}
                  maxLength={500}
                />

                <div className="pt-4">
                  <SubmitButton
                    isSubmitting={isSubmitting}
                    isSubmitted={isSubmitted}
                    delay={0.8}
                    isInView={isInView}
                  />
                </div>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
