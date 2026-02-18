import CursorFollower from '@/components/CursorFollower';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const ContactPage = () => {
    return (
        <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
            <CursorFollower />
            <AnimatedBackground />
            <Navigation />

            <main className="pt-20">
                <Contact />
            </main>

            <Footer />
        </div>
    );
};

export default ContactPage;
