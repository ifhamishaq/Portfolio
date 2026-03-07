import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SplitText from '../components/Animations/SplitText';
import DecryptedText from '../components/Animations/DecryptedText';
import InfiniteMarquee from '../components/Animations/InfiniteMarquee';
import Magnet from '../components/Animations/Magnet';
import DotGrid from '../components/Animations/DotGrid';
import './Hero.css';

export default function Hero() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const titleY = useTransform(scrollYProgress, [0, 1], [0, -120]);
    const subtitleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

    const scrollToWork = () => {
        document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero" ref={ref} id="home">
            {/* Shutter Entrance */}
            <motion.div 
                className="shutter-top"
                initial={{ y: 0 }}
                animate={{ y: '-100%' }}
                transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.5 }}
            />
            <motion.div 
                className="shutter-bottom"
                initial={{ y: 0 }}
                animate={{ y: '100%' }}
                transition={{ duration: 1.2, ease: [0.87, 0, 0.13, 1], delay: 0.5 }}
            />

            {/* Massive background Infinite Marquee */}
            <InfiniteMarquee text="VISUAL STORYTELLING • MOTION DESIGN • 3D ART • " />

            {/* Interactive Dot Grid Background */}
            <DotGrid dotColor="rgba(255,255,255,0.08)" activeColor="#32E612" dotSize={1.5} gap={30} />
            
            <motion.div className="hero-content" style={{ opacity }}>
                <motion.div style={{ y: titleY }}>
                    <div className="hero-label">
                        <DecryptedText text="Creative Director" />
                    </div>
                    <h1 className="hero-title">
                        Building the <br />
                        <em style={{ display: 'inline-block' }}>
                            Analog Lab
                        </em>
                    </h1>
                    <p className="hero-subtitle" style={{ color: 'var(--text-dim)', fontSize: '1.2rem', maxWidth: '540px', marginBottom: '40px', lineHeight: '1.5' }}>
                        Transforming raw concepts into cinematic digital experiences through technical mastery and artistic vision.
                    </p>
                </motion.div>

                <Magnet padding={80} strength={0.2}>
                    <motion.button
                        className="hero-cta"
                        onClick={scrollToWork}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        data-cursor-hover
                    >
                        View My Work
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </Magnet>
            </motion.div>

            {/* Stats */}
            <div className="hero-stats">
                <motion.div
                    className="hero-stat"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="hero-stat-number">3+</div>
                    <div className="hero-stat-label">Years Experience</div>
                </motion.div>
                <motion.div
                    className="hero-stat"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="hero-stat-number">20+</div>
                    <div className="hero-stat-label">Clients</div>
                </motion.div>
                <motion.div
                    className="hero-stat"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 1.0 }}
                >
                    <div className="hero-stat-number">40+</div>
                    <div className="hero-stat-label">Projects</div>
                </motion.div>
            </div>

            <div className="hero-scroll">
                <div className="hero-scroll-line" />
            </div>
        </section>
    );
}
