import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowUpRight, FolderOpen, Play, MessageCircle } from 'lucide-react';
import CaseStudy, { CaseStudyProps } from './CaseStudy';
import projectRaseup from '@/assets/raseup.jpeg';
import projectBhoomivardhan from '@/assets/Bhoomivardhan.jpg';

// Define the Project type based on CaseStudyProps
type Project = CaseStudyProps['project'];

const projects: Project[] = [
    {
        id: 1,
        title: 'AI-Powered Soil Intelligence',
        category: 'AgriTech IoT & AI',
        description: 'AI-integrated IoT soil intelligence ecosystem for real-time soil testing and unified farmer services.',
        fullDescription: 'Bhoomivardhan Pvt. Ltd identified critical inefficiencies in traditional soil testing. We designed and deployed an AI-integrated IoT soil intelligence ecosystem combining smart hardware, AI calibration, and a unified farmer app. This scalable infrastructure delivers real-time soil insights, mandi market integration, and an agri-input marketplace.',
        image: projectBhoomivardhan,
        tech: ['IoT', 'AI/ML', 'Cloud Architecture', 'Mobile App', 'E-commerce'],
        year: '2025',
        role: 'Lead Architect / Co-Founder',
        links: { demo: 'https://bhoomivardhan.com' },
        features: [
            'Smart soil testing hardware (NPK, pH, Moisture)',
            'AI-based calibration & validation engine',
            'Real-time mandi market integration',
            'Unified farmer mobile application'
        ],
        challenges: 'Reducing soil report turnaround time from days to minutes and eliminating inconsistent lab readings.',
        solution: 'Architected a multi-layer AI-IoT platform with a validation model to filter sensor noise and detect anomalies.',
        results: 'Reduced report time to near real-time, improved accuracy via AI, and created a centralized ecosystem for farmers.',
    },
    {
        id: 2,
        title: 'Teacher Training Intelligence',
        category: 'EdTech SaaS Platform',
        description: 'Role-based platform to train teachers in modern methodologies with performance intelligence.',
        fullDescription: 'A fast-growing EdTech startup required a scalable platform to standardize teaching quality. We designed a role-based SaaS training ecosystem featuring secure multi-role access, interactive course delivery, and a behavioral tracking intelligence module to transform traditional training into a data-driven system.',
        image: projectRaseup,
        tech: ['React', 'Node.js', 'RBAC', 'Analytics Engine', 'Real-time Messaging'],
        year: '2025',
        role: 'Full Stack Architect',
        links: {},
        features: [
            'Role-Based Access Control (Admin & Teacher)',
            'Interactive course delivery & tracking',
            'Behavioral tracking intelligence module',
            'Real-time messaging infrastructure'
        ],
        challenges: 'Lack of centralized system, inconsistent methodologies, and no measurable performance tracking.',
        solution: 'Built a modular SaaS platform with an analytics engine to measure completion rates, engagement, and interaction patterns.',
        results: 'Standardized teaching methodology, improved completion rates, and converted training into a measurable model.',
    },
    {
        id: 3,
        title: 'Mission 500: Digital Governance',
        category: 'GovTech & Infrastructure',
        description: 'Scalable role-based governance platform for monitoring village-level development projects.',
        fullDescription: 'Mission 500 is a digital governance platform architected to digitize and verify village-level development projects. It integrates a multi-role mobile app and admin dashboard to enable geo-tagged evidence submission, hierarchical approvals, and time-bound compliance tracking.',
        image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=2070', // Construction/Infrastructure image
        tech: ['Mobile App', 'Geo-Tagging', 'Workflow Engine', 'RBAC', 'Cloud DB'],
        year: '2025',
        role: 'System Architect',
        links: {},
        features: [
            'Geo-tagged photo verification system',
            'Multi-level hierarchical approval workflow',
            'Time-bound compliance monitoring engine',
            'Strict Role-Based Access Control (RBAC)'
        ],
        challenges: 'Ensuring transparency, preventing fraudulent reporting, and enforcing time-bound execution in distributed projects.',
        solution: 'Implemented a tamper-proof geo-verification system with sequential approval states and automated compliance alerts.',
        results: 'Established transparent monitoring, structured accountability, and scalable deployment across state-level programs.',
    },
];


const CaseStudies = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    return (
        <section id="work" className="section-padding relative bg-secondary/5" ref={ref}>
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
                        <FolderOpen className="w-4 h-4" />
                        <span>Portfolio</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
                        Featured <span className="text-gradient">Case Studies</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Deep dives into complex problems solved with elegant code and architecture.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: index * 0.1, duration: 0.6 }}
                            className="group relative bg-card rounded-3xl overflow-hidden border border-border/50 hover:border-primary/50 transition-colors cursor-pointer"
                            onClick={() => setSelectedProject(project)}
                        >
                            {/* Image Container with Zoom Effect */}
                            <div className="h-64 overflow-hidden relative">
                                <div className="absolute inset-0 bg-primary/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
                                    <span className="bg-background/90 text-foreground px-4 py-2 rounded-full font-medium text-sm flex items-center gap-2">
                                        View Case Study <ArrowUpRight className="w-4 h-4" />
                                    </span>
                                </div>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <span className="text-xs font-mono text-primary mb-2 block">{project.category}</span>
                                        <h3 className="font-display text-2xl font-bold group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground border border-border px-2 py-1 rounded">
                                        {project.year}
                                    </span>
                                </div>

                                <p className="text-muted-foreground mb-6 line-clamp-2">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {project.tech.slice(0, 3).map((t) => (
                                        <span key={t} className="px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground">
                                            {t}
                                        </span>
                                    ))}
                                    {project.tech.length > 3 && (
                                        <span className="px-2 py-1 rounded-md bg-secondary text-xs text-secondary-foreground">
                                            +{project.tech.length - 3}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 }}
                    className="mt-16 text-center"
                >
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition-colors"
                    >
                        <MessageCircle className="w-5 h-5" />
                        For More Info Connect With Us
                    </a>
                </motion.div>
            </div>

            {/* Case Study Modal */}
            <CaseStudy
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </section>
    );
};

export default CaseStudies;
