import React, { useState, useRef, useEffect } from 'react';
import './Magnet.css';

const Magnet = ({ children, padding = 100, disabled = false, strength = 0.3 }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const ref = useRef(null);

    const handleMouseMove = (e) => {
        if (disabled || !ref.current) return;

        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const dist = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));

        if (dist < padding) {
            setPosition({
                x: (clientX - centerX) * strength,
                y: (clientY - centerY) * strength
            });
        } else {
            setPosition({ x: 0, y: 0 });
        }
    };

    const resetPosition = () => setPosition({ x: 0, y: 0 });

    return (
        <div
            ref={ref}
            className="magnet-container"
            onMouseMove={handleMouseMove}
            onMouseLeave={resetPosition}
            style={{
                transform: `translate(${position.x}px, ${position.y}px)`,
                transition: position.x === 0 ? 'transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)' : 'none'
            }}
        >
            {children}
        </div>
    );
};

export default Magnet;
