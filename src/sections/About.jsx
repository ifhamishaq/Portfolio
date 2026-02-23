import { motion } from 'framer-motion';
import { Film, Palette, Box, Sparkles, Globe } from 'lucide-react';
import SplitText from '../components/Animations/SplitText';
import DecryptedText from '../components/Animations/DecryptedText';
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
    'Illustrator', 'Blender',
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
                    <motion.div
                        className="about-text"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="about-highlight">
                            Crafting visuals that captivate, retain, and convert.
                        </div>

                        <p>
                            I'm <strong>Ifham Ishaq</strong> — a multidisciplinary creative specializing in
                            video editing, graphic design, 3D art, and website design
                            with <strong>3+ years of professional experience</strong>. Based in India,
                            I collaborate with creators, agencies, and brands across the globe.
                        </p>

                        <p>
                            My expertise spans <strong>retention-driven video editing</strong>,
                            <strong> high-CTR thumbnail design</strong>, <strong>cinematic 3D visuals</strong>,
                            and <strong>modern, responsive website design</strong>. Every project I take on
                            is crafted to maximize audience engagement and elevate brand presence.
                        </p>

                        <p>
                            Whether it's a scroll-stopping thumbnail, an immersive 3D product scene,
                            a conversion-focused landing page, or a full video production — I deliver
                            polished, professional work that drives measurable results.
                        </p>

                        <div className="about-tools">
                            <div className="about-tools-title">Tools & Software</div>
                            <div className="about-tools-list">
                                {TOOLS.map((tool) => (
                                    <span key={tool} className="about-tool-tag">
                                        <DecryptedText text={tool} />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-skills-grid"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        {SKILLS.map((skill, i) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={skill.title}
                                    className="about-skill-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 0.1 * i }}
                                >
                                    <div className="about-skill-icon">
                                        <Icon size={24} strokeWidth={1.5} />
                                    </div>
                                    <div className="about-skill-title">{skill.title}</div>
                                    <ul className="about-skill-list">
                                        {skill.items.map((item) => (
                                            <li key={item}>{item}</li>
                                        ))}
                                    </ul>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
