import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../data/projects';
import ShinyText from '../components/Animations/ShinyText';
import DecryptedText from '../components/Animations/DecryptedText';
import SplitText from '../components/Animations/SplitText';
import Magnet from '../components/Animations/Magnet';
import './WorkShowcase.css';

// Pick top 4 featured projects for the editorial scroll.
// Prioritize video/3D content for higher engagement, fallback to others.
const SHOWCASE_ITEMS = PROJECTS.filter(p => p.driveId || p.gallery || p.image).slice(0, 4);

export default function WorkShowcase() {
    const [current, setCurrent] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const navigate = useNavigate();

    // Auto-advance logic with pause capability
    useEffect(() => {
        if (isPaused) return;
        
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
        }, 5000); // Slightly slower for better readability
        
        return () => clearInterval(timer);
    }, [isPaused, current]);

    const handleManualChange = (index) => {
        setCurrent(index);
        // Momentarily pause auto-advance on manual interaction
        setIsPaused(true);
        setTimeout(() => setIsPaused(false), 8000); // Pause for 8s
    };

    const project = SHOWCASE_ITEMS[current];

    return (
        <section className="work-showcase" id="work">
            <div className="container">
                <motion.div
                    className="work-showcase-header"
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
                                initial={{ opacity: 0, x: 60, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -60, filter: "blur(10px)" }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                                <div 
                                    className="showcase-slide-media"
                                    onClick={() => navigate('/portfolio')}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {project.image ? (
                                        <img src={project.image} alt={project.title} loading="lazy" />
                                    ) : project.driveId ? (
                                        <div className="showcase-video-preview">
                                            <iframe
                                                src={`https://drive.google.com/file/d/${project.driveId}/preview`}
                                                allow="autoplay"
                                                title={project.title}
                                            />
                                            <div className="video-overlay-hint">
                                                <span>Preview</span>
                                            </div>
                                        </div>
                                    ) : project.gallery && project.gallery.length > 0 ? (
                                        <img src={project.gallery[0].url} alt={project.title} loading="lazy" />
                                    ) : (
                                        <div className="showcase-no-preview">
                                            <span>No Preview Available</span>
                                        </div>
                                    )}
                                </div>
                                <div className="showcase-slide-info">
                                    <div className="showcase-slide-category">
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                                            <DecryptedText text={project.category} />
                                            <span style={{ fontVariantNumeric: 'tabular-nums', opacity: 0.5 }}>
                                                {String(current + 1).padStart(2, '0')} / {String(SHOWCASE_ITEMS.length).padStart(2, '0')}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="showcase-slide-title">
                                        {project.title}
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
                                onClick={() => handleManualChange(i)}
                                aria-label={`Slide ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <motion.div
                    className="showcase-cta"
                    initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
