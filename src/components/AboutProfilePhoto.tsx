import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import profilePhoto from '@/assets/sunil-bokare.png';

const AboutProfilePhoto = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position state
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for rotation
    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    function onMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // Calculate distance from center (normalized -1 to 1)
        const distanceX = (event.clientX - centerX) / (width / 2);
        const distanceY = (event.clientY - centerY) / (height / 2);

        x.set(distanceX);
        y.set(distanceY);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    // Transform mouse values to rotation degrees
    const rotateX = useTransform(mouseY, [-1, 1], [10, -10]);
    const rotateY = useTransform(mouseX, [-1, 1], [-10, 10]);

    return (
        <div className="relative perspective-1000 w-full max-w-sm mx-auto md:mr-auto md:ml-0">
            <motion.div
                ref={cardRef}
                onMouseMove={onMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="relative aspect-square rounded-full border border-white/10 bg-white/5 backdrop-blur-sm p-3 shadow-2xl transition-all duration-200"
            >
                {/* Inner container */}
                <div
                    className="relative w-full h-full rounded-full overflow-hidden bg-background/50"
                    style={{ transform: 'translateZ(20px)' }}
                >
                    {/* Profile photo */}
                    <img
                        src={profilePhoto}
                        alt="Sunil Bokare"
                        className="w-full h-full object-cover"
                        style={{
                            transform: 'translateZ(50px)',
                        }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* Floating tech badges */}
                <motion.div
                    className="absolute -right-4 top-10 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-xs font-mono text-primary shadow-lg"
                    style={{ transform: 'translateZ(60px)' }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                >
                    ENTC Engineer
                </motion.div>

                <motion.div
                    className="absolute -left-2 bottom-12 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-xs font-mono text-blue-400 shadow-lg"
                    style={{ transform: 'translateZ(50px)' }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                >
                    System Architect
                </motion.div>
            </motion.div>

            {/* Background glow - Static now */}
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full -z-10" />
        </div>
    );
};

export default AboutProfilePhoto;
