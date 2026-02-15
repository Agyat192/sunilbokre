import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "Sunil's architecture decisions saved us months of re-work. His understanding of scalable backend systems is exceptional for someone his age.",
    name: 'Prof. R. K. Sharma',
    role: 'Project Guide, ENTC Department',
    context: 'Academic Mentor',
  },
  {
    quote: "The IoT platform Sunil built for our hackathon project was production-ready. His ability to integrate hardware and software seamlessly impressed every judge.",
    name: 'Hackathon Panel',
    role: 'Smart India Hackathon',
    context: 'Competition Judge',
  },
  {
    quote: "Working with Sunil on the Bhoomivardhan platform showed his maturity in handling real-world engineering challenges — from database design to deployment.",
    name: 'Agritech Collaborator',
    role: 'Co-Founder, Bhoomivardhan',
    context: 'Startup Partner',
  },
  {
    quote: "Sunil delivered a network security audit that identified critical vulnerabilities we had missed for months. His systematic approach is remarkable.",
    name: 'Enterprise Client',
    role: 'IT Director, Mid-size Enterprise',
    context: 'Security Client',
  },
];

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="section-padding relative" ref={ref}>
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            What People <span className="text-gradient">Say</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Feedback from mentors, clients, and collaborators.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="p-6 rounded-2xl glass glass-hover relative"
            >
              <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
              <p className="text-muted-foreground mb-5 italic leading-relaxed">"{item.quote}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{item.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.role}</p>
                </div>
                <span className="ml-auto px-2 py-0.5 rounded text-[10px] bg-secondary/50 text-muted-foreground">
                  {item.context}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
