import { useRef, useEffect } from 'react';
import './CursorGlow.css';

// ============================================
//   Cursor Glow Effect (desktop only)
// ============================================
export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    // Only on devices with a fine pointer (mouse)
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const glow = glowRef.current;
    if (!glow) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;
    let rafId;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      glowX = lerp(glowX, mouseX, 0.08);
      glowY = lerp(glowY, mouseY, 0.08);
      glow.style.left = `${glowX}px`;
      glow.style.top  = `${glowY}px`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    animate();

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div ref={glowRef} className="cursor-glow" aria-hidden="true" />;
}
