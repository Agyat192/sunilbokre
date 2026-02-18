
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Layers, Code, Globe, Calendar, CheckCircle, Smartphone } from 'lucide-react';
import { useEffect, useRef } from 'react';

// Use explicit type for the prop to allow flexibility
export interface CaseStudyProps {
    project: {
        id: number | string;
        title: string;
        category: string;
        description: string;
        fullDescription: string;
        image: string;
        tech: string[];
        features: string[];
        challenges: string;
        solution: string;
        results: string;
        year: string;
        role: string;
        links: {
            demo?: string;
            github?: string;
            playstore?: string;
        };
        gallery?: string[];
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

const CaseStudy = ({ project, isOpen, onClose }: CaseStudyProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    // Handle escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-background/80 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        ref={modalRef}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-card border border-border shadow-2xl flex flex-col"
                    >
                        {/* Header / Image Area */}
                        <div className="relative h-64 sm:h-80 shrink-0 overflow-hidden">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />

                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 rounded-full bg-background/50 backdrop-blur-md border border-white/10 hover:bg-background/80 transition-colors z-10"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="absolute bottom-6 left-6 right-6">
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-primary/20 text-primary border border-primary/20 backdrop-blur-sm mb-3 inline-block">
                                        {project.category}
                                    </span>
                                    <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-2">
                                        {project.title}
                                    </h2>
                                </motion.div>
                            </div>
                        </div>

                        {/* Content Area - Scrollable */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar">
                            <div className="p-6 sm:p-8 space-y-10">

                                {/* Overview & Metadata */}
                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                <Layers className="w-5 h-5 text-primary" />
                                                Project Overview
                                            </h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                {project.fullDescription || project.description}
                                            </p>
                                        </div>

                                        {/* Challenge & Solution */}
                                        <div className="grid sm:grid-cols-2 gap-6">
                                            <div className="p-4 rounded-xl bg-secondary/30 border border-white/5">
                                                <h4 className="font-semibold mb-2 text-red-400">The Challenge</h4>
                                                <p className="text-sm text-muted-foreground">{project.challenges}</p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-secondary/30 border border-white/5">
                                                <h4 className="font-semibold mb-2 text-green-400">The Solution</h4>
                                                <p className="text-sm text-muted-foreground">{project.solution}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Sidebar Metadata */}
                                    <div className="space-y-6">
                                        <div className="p-5 rounded-xl bg-secondary/20 border border-white/5 space-y-4">
                                            <div className="flex items-center justify-between pb-3 border-b border-white/5">
                                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" /> Year
                                                </span>
                                                <span className="font-medium">{project.year}</span>
                                            </div>
                                            <div className="flex items-center justify-between pb-3 border-b border-white/5">
                                                <span className="text-sm text-muted-foreground flex items-center gap-2">
                                                    <Code className="w-4 h-4" /> Role
                                                </span>
                                                <span className="font-medium">{project.role}</span>
                                            </div>

                                            <div className="space-y-3 pt-1">
                                                <span className="text-sm text-muted-foreground block">Links</span>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.links.demo && (
                                                        <a
                                                            href={project.links.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
                                                        >
                                                            <Globe className="w-4 h-4" /> Demo
                                                        </a>
                                                    )}
                                                    {project.links.github && (
                                                        <a
                                                            href={project.links.github}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                                                        >
                                                            <Github className="w-4 h-4" /> Code
                                                        </a>
                                                    )}
                                                    {project.links.playstore && (
                                                        <a
                                                            href={project.links.playstore}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                                                        >
                                                            <Smartphone className="w-4 h-4" /> App
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tech Stack Pills */}
                                        <div>
                                            <h4 className="text-sm font-semibold mb-3">Tech Stack</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.tech.map((t) => (
                                                    <span key={t} className="px-2.5 py-1 rounded-md text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Key Features */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Key Features</h3>
                                    <div className="grid sm:grid-cols-2 gap-3">
                                        {project.features.map((feature, i) => (
                                            <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/20 transition-colors">
                                                <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                                <span className="text-sm text-muted-foreground">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Gallery Grid (Optional) */}
                                {project.gallery && project.gallery.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Project Gallery</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                            {project.gallery.map((img, idx) => (
                                                <div key={idx} className="aspect-video rounded-xl overflow-hidden bg-secondary/30">
                                                    <img
                                                        src={img}
                                                        alt={`Gallery ${idx + 1}`}
                                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>

                            {/* Footer Actions */}
                            <div className="p-6 border-t border-white/5 flex justify-end gap-3 bg-secondary/10">
                                <button
                                    onClick={onClose}
                                    className="px-5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Close
                                </button>
                                {project.links.demo && (
                                    <a
                                        href={project.links.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-5 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                                    >
                                        Visit Live Site <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default CaseStudy;
