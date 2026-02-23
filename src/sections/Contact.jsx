import { useState } from 'react';
import { motion } from 'framer-motion';
import './Contact.css';

const SERVICES = [
    'Video Editing',
    'Graphic Design',
    '3D Work',
    'Website Design',
    'Multiple Services',
    'Other',
];

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        })
            .then(() => setSubmitted(true))
            .catch((err) => alert(err));
    };

    return (
        <section className="contact" id="contact">
            <div className="container">
                <motion.div
                    className="contact-inner"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="section-label">// Contact</div>
                    <h2 className="contact-title">
                        Let's <em>Create</em><br />Together
                    </h2>
                    <p className="contact-desc">
                        Have a project in mind? Fill out the form below and I'll get back
                        to you within 24 hours. Let's make something incredible.
                    </p>

                    {submitted ? (
                        <motion.div
                            className="contact-success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <div className="contact-success-icon">✓</div>
                            <h3>Message Sent!</h3>
                            <p>Thanks for reaching out. I'll get back to you soon.</p>
                        </motion.div>
                    ) : (
                        <form
                            name="contact"
                            method="POST"
                            data-netlify="true"
                            netlify-honeypot="bot-field"
                            onSubmit={handleSubmit}
                            className="contact-form"
                        >
                            <input type="hidden" name="form-name" value="contact" />
                            <p className="hidden" style={{ display: 'none' }}>
                                <label>Don't fill this out: <input name="bot-field" /></label>
                            </p>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        placeholder="Your name"
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        placeholder="you@example.com"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="service" className="form-label">Service</label>
                                    <select
                                        id="service"
                                        name="service"
                                        required
                                        className="form-input form-select"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>Select a service</option>
                                        {SERVICES.map((s) => (
                                            <option key={s} value={s}>{s}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="budget" className="form-label">Budget (USD)</label>
                                    <input
                                        type="text"
                                        id="budget"
                                        name="budget"
                                        placeholder="e.g. $200 - $500"
                                        className="form-input"
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="message" className="form-label">Project Details</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows="5"
                                    placeholder="Tell me about your project, timeline, and goals..."
                                    className="form-input form-textarea"
                                />
                            </div>

                            <button type="submit" className="form-submit" data-cursor-hover>
                                Send Message
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </button>
                        </form>
                    )}

                    <div className="contact-alt">
                        <div className="contact-alt-group">
                            <span>Reach me directly:</span>
                            <a href="mailto:ifham.wani89@gmail.com" className="contact-alt-link" data-cursor-hover>
                                ifham.wani89@gmail.com
                            </a>
                        </div>
                        <div className="contact-alt-group">
                            <span>Call / WhatsApp:</span>
                            <span className="contact-phone">+91 7006049548</span>
                        </div>
                    </div>

                    <div className="contact-socials">
                        <a href="https://youtube.com/@Ifham" target="_blank" rel="noopener noreferrer" className="contact-social" data-cursor-hover>YouTube</a>
                        <a href="https://www.instagram.com/wani.ifhamm/" target="_blank" rel="noopener noreferrer" className="contact-social" data-cursor-hover>Instagram</a>
                        <a href="https://www.linkedin.com/in/ifham-ishaq-628077395/" target="_blank" rel="noopener noreferrer" className="contact-social" data-cursor-hover>LinkedIn</a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
