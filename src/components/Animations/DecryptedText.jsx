import { useState, useEffect } from 'react';

const DecryptedText = ({ text, speed = 50, className = "" }) => {
    const [displayText, setDisplayText] = useState('');
    const chars = '-/_*+!<>[]{}&^%$#@';

    useEffect(() => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text.split('')
                    .map((char, index) => {
                        if (index < iteration) return text[index];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join('')
            );

            if (iteration >= text.length) clearInterval(interval);
            iteration += 1 / 3;
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);

    return <span className={className} style={{ fontFamily: 'var(--mono)' }}>{displayText}</span>;
};

export default DecryptedText;
