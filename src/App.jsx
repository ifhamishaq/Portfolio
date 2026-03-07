import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import CRTOverlay from './components/CRTOverlay';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import BrandsMarquee from './components/BrandsMarquee';
import WorkShowcase from './sections/WorkShowcase';
import About from './sections/About';
import Services from './sections/Services';
import Testimonials from './sections/Testimonials';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import Admin from './pages/Admin';
import Squares from './components/Animations/Squares';
import BackToTop from './components/BackToTop';
import TransitionWipe from './components/Animations/TransitionWipe';
import NoiseOverlay from './components/Animations/NoiseOverlay';

function HomePage() {
  return (
    <PageTransitionWrapper>
      <Hero />
      <BrandsMarquee />
      <WorkShowcase />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </PageTransitionWrapper>
  );
}

function PageTransitionWrapper({ children }) {
  return (
    <>
      <TransitionWipe />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}

export default function App() {
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <CustomCursor />
      <CRTOverlay />
      <NoiseOverlay theme={theme} />
      <Squares
        borderColor={theme === 'dark' ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
        squareSize={40}
        hoverFillColor={theme === 'dark' ? "rgba(50, 230, 18, 0.15)" : "rgba(26, 159, 0, 0.1)"}
      />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={
            <PageTransitionWrapper>
              <Portfolio />
            </PageTransitionWrapper>
          } />
          <Route path="/admin" element={
            <PageTransitionWrapper>
              <Admin />
            </PageTransitionWrapper>
          } />
        </Routes>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </>
  );
}

