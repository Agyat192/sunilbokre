import CursorFollower from '@/components/CursorFollower';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import Clients from '@/components/Clients';
import CaseStudies from '@/components/CaseStudies';
import Footer from '@/components/Footer';

const WorkPage = () => {
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <CursorFollower />
            <AnimatedBackground />
            <Navigation />

            <main className="pt-20">
                <Clients />
                <CaseStudies />
            </main>

            <Footer />
        </div>
    );
};

export default WorkPage;
