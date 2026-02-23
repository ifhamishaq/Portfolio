import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const textRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window;
    if (isTouchDevice) return;

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onMouseEnterInteractive = (e) => {
      dotRef.current?.classList.add('hovering');
      ringRef.current?.classList.add('hovering');

      const target = e.currentTarget;
      const text = target.getAttribute('data-cursor-text');
      if (text) {
        setCursorText(text);
        ringRef.current?.classList.add('has-text');
      }
    };

    const onMouseLeaveInteractive = () => {
      dotRef.current?.classList.remove('hovering');
      ringRef.current?.classList.remove('hovering');
      ringRef.current?.classList.remove('has-text');
      setCursorText('');
    };

    window.addEventListener('mousemove', onMouseMove);
    raf.current = requestAnimationFrame(animate);

    const setupListeners = () => {
      const interactiveEls = document.querySelectorAll('a, button, [data-cursor-hover]');
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };

    setupListeners();

    // Re-observe for new interactive elements
    const observer = new MutationObserver(setupListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(raf.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring">
        {cursorText && <span ref={textRef} className="cursor-text">{cursorText}</span>}
      </div>
    </>
  );
}

