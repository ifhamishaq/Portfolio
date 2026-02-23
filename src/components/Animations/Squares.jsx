import { useRef, useEffect, useState } from 'react';

const Squares = ({
    squareSize = 40,
    borderColor = '#333',
    hoverFillColor = 'rgba(57, 255, 20, 0.08)',
}) => {
    const canvasRef = useRef(null);
    const [mouse, setMouse] = useState({ x: -100, y: -100 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = borderColor;
            ctx.lineWidth = 0.5;

            const numCols = Math.ceil(canvas.width / squareSize) + 1;
            const numRows = Math.ceil(canvas.height / squareSize) + 1;

            for (let i = 0; i < numCols; i++) {
                for (let j = 0; j < numRows; j++) {
                    const x = i * squareSize;
                    const y = j * squareSize;

                    ctx.strokeRect(x, y, squareSize, squareSize);

                    const dx = mouse.x - (x + squareSize / 2);
                    const dy = mouse.y - (y + squareSize / 2);
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 120) {
                        ctx.fillStyle = hoverFillColor;
                        ctx.globalAlpha = 1 - distance / 120;
                        ctx.fillRect(x, y, squareSize, squareSize);
                        ctx.globalAlpha = 1;
                    }
                }
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e) => setMouse({ x: e.clientX, y: e.clientY });
        window.addEventListener('mousemove', handleMouseMove);
        draw();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, [squareSize, borderColor, hoverFillColor, mouse]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.15
            }}
        />
    );
};

export default Squares;
