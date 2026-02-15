import CursorFollower from '@/components/CursorFollower';
import AnimatedBackground from '@/components/AnimatedBackground';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Clients from '@/components/Clients';
import SecuritySection from '@/components/SecuritySection';
import ScalabilitySection from '@/components/ScalabilitySection';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import AIGuide from '@/components/AIGuide';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <CursorFollower />
      <AnimatedBackground />
      <AIGuide />
      <Navigation />

      <main>
        <Hero />
        <About />
        <Skills />
        <Clients />
        <SecuritySection />
        <ScalabilitySection />
        <TechStack />
        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
