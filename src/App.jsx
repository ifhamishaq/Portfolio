import { Routes, Route, useLocation } from 'react-router-dom';
import CustomCursor from './components/CustomCursor';
import CRTOverlay from './components/CRTOverlay';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import WorkShowcase from './sections/WorkShowcase';
import About from './sections/About';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './components/Footer';
import Portfolio from './pages/Portfolio';
import Squares from './components/Animations/Squares';

function HomePage() {
  return (
    <main>
      <Hero />
      <WorkShowcase />
      <About />
      <Services />
      <Contact />
    </main>
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
      <Routes location={location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </>
  );
}
