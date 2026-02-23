import { useEffect, useRef } from 'react';
import './CRTOverlay.css';

export default function CRTOverlay() {
    const scanRef = useRef(null);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (scanRef.current) {
                const y = e.clientY / window.innerHeight;
                scanRef.current.style.opacity = 0.3 + y * 0.5;
            }
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="crt-overlay">
            <div ref={scanRef} className="crt-scanlines" />
            <div className="crt-flicker" />
        </div>
    );
}
