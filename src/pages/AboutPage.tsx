import CursorFollower from '@/components/CursorFollower';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Footer from '@/components/Footer';

const AboutPage = () => {
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <CursorFollower />
            <AnimatedBackground />
            <Navigation />

            <main className="pt-20">
                <About />
                <Skills />
            </main>

            <Footer />
        </div>
    );
};

export default AboutPage;
