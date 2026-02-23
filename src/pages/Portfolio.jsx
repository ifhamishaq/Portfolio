import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PROJECTS, CATEGORIES } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import './Portfolio.css';

export default function Portfolio() {
    const [active, setActive] = useState('All');
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filtered = active === 'All'
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === active);

    return (
        <div className="portfolio-page">
            <section className="portfolio-hero">
                <div className="container">
                    <button
                        className="portfolio-back"
                        onClick={() => navigate('/')}
                        data-cursor-hover
                    >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </button>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="section-label">// Full Portfolio</div>
                        <h1 className="portfolio-title">All Work</h1>
                        <p className="portfolio-desc">
                            A comprehensive showcase of my work in 3D art, video editing,
                            and graphic design.
                        </p>
                    </motion.div>

                    <motion.div
                        className="portfolio-tabs"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat}
                                className={`portfolio-tab ${active === cat ? 'active' : ''}`}
                                onClick={() => setActive(cat)}
                                data-cursor-hover
                            >
                                {cat}
                                <span className="portfolio-tab-count">
                                    {cat === 'All'
                                        ? PROJECTS.length
                                        : PROJECTS.filter(p => p.category === cat).length}
                                </span>
                            </button>
                        ))}
                    </motion.div>
                </div>
            </section>

            <section className="portfolio-grid-section">
                <div className="container">
                    <div className="portfolio-grid">
                        {filtered.map((project, i) => (
                            <ProjectCard key={project.id} project={project} index={i} />
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <div className="portfolio-empty">
                            No projects in this category yet.
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
