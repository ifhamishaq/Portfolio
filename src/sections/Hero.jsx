import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
            <motion.div className="hero-content" style={{ opacity }}>
                <motion.div style={{ y: titleY }}>
                    <div className="hero-label">Ifham Ishaq</div>
                    <h1 className="hero-title">
                        The <em>Analog</em><br />Laboratory
                    </h1>
                </motion.div>

                <motion.p className="hero-subtitle" style={{ y: subtitleY }}>
                    Video Editor · 3D Artist · Graphic Designer<br />
                    Crafting cinematic visuals, high-CTR thumbnails,<br />
                    and immersive 3D experiences.
                </motion.p>

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
            </motion.div>

            {/* Stats */}
            <div className="hero-stats">
                <motion.div
                    className="hero-stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="hero-stat-number">3+</div>
                    <div className="hero-stat-label">Years Experience</div>
                </motion.div>
                <motion.div
                    className="hero-stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                >
                    <div className="hero-stat-number">20+</div>
                    <div className="hero-stat-label">Clients</div>
                </motion.div>
                <motion.div
                    className="hero-stat"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
