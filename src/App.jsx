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
import Squares from './components/Animations/Squares';
import BackToTop from './components/BackToTop';

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <BrandsMarquee />
      <WorkShowcase />
      <About />
      <Services />
      <Testimonials />
      <Contact />
    </motion.div>
  );
}

function PageTransitionWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <>
      <CustomCursor />
      <CRTOverlay />
      <Squares
        borderColor="rgba(0,0,0,0.08)"
        squareSize={40}
        hoverFillColor="rgba(50, 230, 18, 0.1)"
      />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/portfolio" element={
            <PageTransitionWrapper>
              <Portfolio />
            </PageTransitionWrapper>
          } />
        </Routes>
      </AnimatePresence>
      <Footer />
      <BackToTop />
    </>
  );
}

