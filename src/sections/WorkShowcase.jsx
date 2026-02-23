import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import ShinyText from '../components/Animations/ShinyText';
import DecryptedText from '../components/Animations/DecryptedText';
import SplitText from '../components/Animations/SplitText';
import Magnet from '../components/Animations/Magnet';
import './WorkShowcase.css';

// Pick a mix of projects for the slideshow
const SHOWCASE_ITEMS = PROJECTS.filter(p => p.image).slice(0, 5);

export default function WorkShowcase() {
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();

    // Auto-advance every 4 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
        }, 4000);
        return () => clearInterval(timer);
    }, []);

    const project = SHOWCASE_ITEMS[current];

    return (
        <section className="work-showcase" id="work">
            <div className="container">
                <motion.div
                    className="work-showcase-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">
                        <DecryptedText text="// Selected Work" />
                    </div>
                    <h2 className="section-title">Recent Projects</h2>
                </motion.div>

                <div className="showcase-slider">
                    <div className="showcase-slide-container">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={project.id}
                                className="showcase-slide"
                                initial={{ opacity: 0, x: 60 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -60 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div className="showcase-slide-media">
                                    {project.image && (
                                        <img src={project.image} alt={project.title} />
                                    )}
                                </div>
                                <div className="showcase-slide-info">
                                    <div className="showcase-slide-category">
                                        <DecryptedText text={project.category} />
                                    </div>
                                    <h3 className="showcase-slide-title">
                                        <SplitText text={project.title} />
                                    </h3>
                                    <p className="showcase-slide-desc">{project.description}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Dots */}
                    <div className="showcase-dots">
                        {SHOWCASE_ITEMS.map((_, i) => (
                            <button
                                key={i}
                                className={`showcase-dot ${i === current ? 'active' : ''}`}
                                onClick={() => setCurrent(i)}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <motion.div
                    className="showcase-cta"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <Magnet padding={50} strength={0.2}>
                        <button
                            className="showcase-cta-btn"
                            data-cursor-hover
                            onClick={() => navigate('/portfolio')}
                        >
                            <ShinyText text="View Full Portfolio" speed={4} />
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </Magnet>
                </motion.div>
            </div>
        </section>
    );
}
