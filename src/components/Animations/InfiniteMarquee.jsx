import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import './InfiniteMarquee.css';

export default function InfiniteMarquee({ text = "MOTION GRAPHICS • VFX • THUMBNAIL DESIGN • 3D MODELING • WEB DESIGN • " }) {
  const containerRef = useRef(null);
  
  // Tie the marquee speed and direction slightly to scroll for that premium interactive feel
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Base move over time is handled by CSS, but scroll injects momentum
  const scrollVelocity = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top } = containerRef.current.getBoundingClientRect();
    containerRef.current.style.setProperty('--mouse-x', `${e.clientX - left}px`);
    containerRef.current.style.setProperty('--mouse-y', `${e.clientY - top}px`);
  };

  return (
    <div 
      className="marquee-container" 
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      <motion.div 
        className="marquee-track"
        style={{ x: smoothVelocity }}
      >
        {/* We repeat the text to ensure it loops perfectly */}
        <div className="marquee-content gap-4">
          <span className="marquee-text outline-text">{text}</span>
          <span className="marquee-text filled-text">{text}</span>
          <span className="marquee-text outline-text">{text}</span>
          <span className="marquee-text filled-text">{text}</span>
        </div>
        <div className="marquee-content" aria-hidden="true">
          <span className="marquee-text outline-text">{text}</span>
          <span className="marquee-text filled-text">{text}</span>
          <span className="marquee-text outline-text">{text}</span>
          <span className="marquee-text filled-text">{text}</span>
        </div>
      </motion.div>
    </div>
  );
}
