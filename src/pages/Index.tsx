import { Suspense, lazy } from 'react';
import Navigation from '@/components/Navigation';
import EnhancedHero from '@/components/EnhancedHero';
import HomeAbout from '@/components/HomeAbout';
import EnhancedSkills from '@/components/EnhancedSkills';
import Clients from '@/components/Clients';
import CaseStudies from '@/components/CaseStudies';
import SecuritySection from '@/components/SecuritySection';
import ScalabilitySection from '@/components/ScalabilitySection';
import TechStack from '@/components/TechStack';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

// Lazy load heavy components
const CursorFollower = lazy(() => import('@/components/CursorFollower'));
const AnimatedBackground = lazy(() => import('@/components/AnimatedBackground'));
const AIGuide = lazy(() => import('@/components/AIGuide'));

// Loading skeleton
const ComponentLoader = () => (
  <div className="animate-pulse bg-muted/20 rounded-lg h-20 w-full" />
);

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      <Suspense fallback={null}>
        <CursorFollower />
      </Suspense>
      <Suspense fallback={null}>
        <AnimatedBackground />
      </Suspense>
      <Suspense fallback={null}>
        <AIGuide />
      </Suspense>
      <Navigation />

      <main>
        <EnhancedHero />
        <HomeAbout />
        <EnhancedSkills />
        <Clients />
        <CaseStudies />
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
