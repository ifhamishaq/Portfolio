import { motion } from 'framer-motion';
import { TESTIMONIALS } from '../data/projects';
import DecryptedText from '../components/Animations/DecryptedText';
import './Testimonials.css';

export default function Testimonials() {
    return (
        <section className="testimonials" id="testimonials">
            <div className="container">
                <motion.div
                    className="testimonials-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">
                        <DecryptedText text="// Social Proof" />
                    </div>
                    <h2 className="section-title">Client Feedback</h2>
                </motion.div>

                <div className="testimonials-grid">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={i}
                            className="testimonial-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <div className="testimonial-quote">"</div>
                            <p className="testimonial-text">{t.text}</p>
                            <div className="testimonial-author">
                                <div className="testimonial-name">{t.name}</div>
                                <div className="testimonial-role">{t.role}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
