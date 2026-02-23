import { motion } from 'framer-motion';
import { Film, Palette, Box, Globe, TrendingUp, Target, Video, Zap, CheckCircle } from 'lucide-react';
import './Services.css';

const SERVICES = [
    {
        icon: Film,
        title: 'Video Editing',
        desc: 'Retention-focused video editing that keeps viewers hooked from start to finish.',
        items: ['YouTube videos', 'Short form content', 'Ads & promos', 'Documentary edits', 'Motion graphics'],
    },
    {
        icon: Palette,
        title: 'Graphic Design',
        desc: 'Eye-catching visuals that boost click-through rates and strengthen brand identity.',
        items: ['High-CTR thumbnails', 'Logo design', 'Branding packages', 'Posters', 'Social media graphics'],
    },
    {
        icon: Box,
        title: '3D Work',
        desc: 'Immersive 3D scenes and CGI elements that add cinematic depth to your content.',
        items: ['Product scenes', 'CGI compositing', 'Environment renders', 'Animation', 'Motion tracking'],
    },
    {
        icon: Globe,
        title: 'Website Design',
        desc: 'Modern, responsive websites that look stunning and convert visitors into customers.',
        items: ['Portfolio sites', 'Landing pages', 'UI/UX design', 'Responsive layouts', 'Interactive experiences'],
    },
];

const VALUES = [
    { icon: TrendingUp, label: 'High CTR Thumbnails' },
    { icon: Target, label: 'Retention Focused' },
    { icon: Video, label: 'Cinematic Visuals' },
    { icon: Zap, label: 'Fast Delivery' },
    { icon: CheckCircle, label: 'Guaranteed Quality' },
];

export default function Services() {
    return (
        <section className="services" id="services">
            <div className="container">
                <motion.div
                    className="services-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">// Services</div>
                    <h2 className="section-title">What I Offer</h2>
                </motion.div>

                <div className="services-grid">
                    {SERVICES.map((service, i) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={service.title}
                                className="service-card"
                                data-cursor-hover
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                            >
                                <div className="service-number">0{i + 1}</div>
                                <div className="service-icon">
                                    <Icon size={28} strokeWidth={1.5} />
                                </div>
                                <h3 className="service-title">{service.title}</h3>
                                <p className="service-desc">{service.desc}</p>
                                <ul className="service-list">
                                    {service.items.map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>

                <motion.div
                    className="services-value"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {VALUES.map((v) => {
                        const VIcon = v.icon;
                        return (
                            <div key={v.label} className="value-item">
                                <div className="value-icon">
                                    <VIcon size={22} strokeWidth={1.5} />
                                </div>
                                <div className="value-label">{v.label}</div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
