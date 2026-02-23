import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Magnet from './Animations/Magnet';
import './BackToTop.css';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            if (window.scrollY > 500) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="back-to-top-wrapper"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ type: 'spring', damping: 15 }}
                >
                    <Magnet padding={40} strength={0.4}>
                        <button
                            className="back-to-top-btn"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                            data-cursor-hover
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path d="M18 15l-6-6-6 6" />
                            </svg>
                        </button>
                    </Magnet>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
