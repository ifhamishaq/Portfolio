import { motion } from 'framer-motion';
import { Film, Palette, Box, Sparkles, Globe } from 'lucide-react';
import SplitText from '../components/Animations/SplitText';
import DecryptedText from '../components/Animations/DecryptedText';
import SpotlightCard from '../components/Animations/SpotlightCard';
import LanyardCard from '../components/Animations/LanyardCard';
import './About.css';

const SKILLS = [
    {
        icon: Film,
        title: 'Video Editing',
        items: ['Short & long form editing', 'Color grading', 'Motion tracking', 'Cinematic storytelling', 'Documentary edits'],
    },
    {
        icon: Palette,
        title: 'Graphic Design',
        items: ['High-CTR thumbnails', 'Logo & brand identity', 'Poster design', 'Social media graphics'],
    },
    {
        icon: Box,
        title: '3D Art & Animation',
        items: ['Product-style renders', 'Environment design', 'Camera movement', 'Car animation', 'CGI integration'],
    },
    {
        icon: Sparkles,
        title: 'Motion Graphics',
        items: ['Animated elements', 'Title sequences', 'Visual effects', 'Currently expanding'],
    },
    {
        icon: Globe,
        title: 'Website Design',
        items: ['Portfolio sites', 'Landing pages', 'UI/UX design', 'Responsive layouts'],
    },
];

const TOOLS = [
    'Adobe Premiere Pro', 'After Effects', 'Photoshop',
    'Illustrator', 'Blender', 'Canva'
];

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 },
};

export default function About() {
    return (
        <section className="about" id="about">
            <div className="container">
                <motion.div {...fadeIn}>
                    <div className="section-label">
                        <DecryptedText text="// About" />
                    </div>
                    <h2 className="section-title">
                        <SplitText text="The Artist" />
                    </h2>
                </motion.div>

                <div className="about-grid">
                    {/* Bento Card 1: Cinematic Intro */}
                    <motion.div 
                        className="bento-item bento-intro"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="about-highlight">
                            Bridging the gap between <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>technical precision</span> and raw cinematic emotion.
                        </h3>
                        <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem', maxWidth: '90%' }}>
                            Based in the digital frontier, I specialize in high-impact visual storytelling through 3D, VFX, and modern web interfaces.
                        </p>
                    </motion.div>

                    {/* Bento Card 2: The Physical Hook (Lanyard) */}
                    <motion.div
                        className="bento-item bento-lanyard"
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                         <LanyardCard />
                    </motion.div>

                    {/* Bento Card 3-7: Skills */}
                    {SKILLS.map((skill, i) => {
                        const Icon = skill.icon;
                        return (
                            <motion.div
                                key={skill.title}
                                className="bento-item bento-skill"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: 0.1 * i }}
                            >
                                <div className="about-skill-card">
                                    <div className="about-skill-icon">
                                        <Icon size={32} strokeWidth={1} />
                                    </div>
                                    <div>
                                        <div className="about-skill-title">{skill.title}</div>
                                        <ul className="about-skill-list">
                                            {skill.items.map((item) => (
                                                <li key={item}>{item}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Bento Card 8: Tools */}
                    <motion.div 
                        className="bento-item bento-tools"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="about-tools-title">Tech Stack</div>
                        <div className="about-tools-list">
                            {TOOLS.map((tool) => (
                                <span key={tool} className="about-tool-tag">{tool}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
