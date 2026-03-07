import React, { useRef, useEffect } from 'react';

export default function DotGrid({ 
  dotColor = "rgba(255, 255, 255, 0.15)", // Default dim color
  activeColor = "rgba(50, 230, 18, 0.8)", // Green active color on hover
  dotSize = 1.5,
  gap = 25,
  interactiveScale = 3,
  interactiveRadius = 150
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    let animationFrameId;
    
    // Track mouse position directly in canvas coordinates
    let mouse = { x: -1000, y: -1000 };
    // We smooth out the mouse movement target
    let targetMouse = { x: -1000, y: -1000 };
    
    // We store the grid so we don't recalculate layout every frame
    let dots = [];
    let width = 0;
    let height = 0;

    const initGrid = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      
      // Ensure crisp rendering on high DPI displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      dots = [];
      const cols = Math.floor(width / gap) + 1;
      const rows = Math.floor(height / gap) + 1;
      
      const offsetX = (width - cols * gap) / 2;
      const offsetY = (height - rows * gap) / 2;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({
            x: i * gap + offsetX,
            y: j * gap + offsetY,
            baseRadius: dotSize,
            currentRadius: dotSize,
            targetRadius: dotSize,
            baseOpacity: 1, // Opacity relies on the color strings
          });
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Smooth mouse tracking
      mouse.x += (targetMouse.x - mouse.x) * 0.1;
      mouse.y += (targetMouse.y - mouse.y) * 0.1;

      dots.forEach(dot => {
        // Calculate distance from smooth mouse position
        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Map distance to scale factor: closer is larger
        if (dist < interactiveRadius) {
          const factor = 1 - (dist / interactiveRadius); // 0 to 1
          dot.targetRadius = dot.baseRadius + (factor * interactiveScale);
        } else {
          dot.targetRadius = dot.baseRadius;
        }

        // Smoothly animate the radius towards target
        dot.currentRadius += (dot.targetRadius - dot.currentRadius) * 0.1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
        
        // Color transition based on size
        const isHovered = dot.currentRadius > dot.baseRadius * 1.5;
        ctx.fillStyle = isHovered ? activeColor : dotColor;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    initGrid();
    draw();

    const handleResize = () => initGrid();
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      targetMouse = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };
    const handleMouseLeave = () => {
      targetMouse = { x: -1000, y: -1000 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dotColor, activeColor, dotSize, gap, interactiveScale, interactiveRadius]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none', // Critical so it doesn't block hero clicks
        zIndex: 0
      }}
    />
  );
}
