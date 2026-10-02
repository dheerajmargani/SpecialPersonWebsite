import { useEffect, useRef } from 'react';

// ============================================
//   Star Field Canvas — Animated Background
//   Soft white/blue-lavender sparse stars
// ============================================
export default function StarField({ count = 90, speed = 0.15 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let stars = [];

    // On mobile, halve the count for performance
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    const effectiveCount = isMobile ? Math.ceil(count * 0.5) : count;

    // Occasionally tint a star with soft blue-lavender
    const starColors = [
      [255, 255, 255],   // pure white — most stars
      [255, 255, 255],
      [255, 255, 255],
      [200, 210, 255],   // soft blue-white
      [210, 200, 255],   // very subtle lavender-white
    ];

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      init();
    };

    const init = () => {
      stars = Array.from({ length: effectiveCount }, () => {
        const colorSet = starColors[Math.floor(Math.random() * starColors.length)];
        return {
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.1 + 0.15,
          opacity: Math.random() * 0.55 + 0.1,
          twinkleSpeed: Math.random() * 0.006 + 0.002,
          twinkleOffset: Math.random() * Math.PI * 2,
          vx: (Math.random() - 0.5) * speed * 0.35,
          vy: (Math.random() - 0.5) * speed * 0.35,
          r: colorSet[0],
          g: colorSet[1],
          b: colorSet[2],
        };
      });
    };

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.016;

      stars.forEach((s) => {
        const twinkle = Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
        const opacity = Math.max(0, s.opacity + twinkle * 0.12);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.r}, ${s.g}, ${s.b}, ${opacity})`;
        ctx.fill();

        s.x += s.vx;
        s.y += s.vy;

        if (s.x < 0) s.x = canvas.width;
        if (s.x > canvas.width)  s.x = 0;
        if (s.y < 0) s.y = canvas.height;
        if (s.y > canvas.height) s.y = 0;
      });

      animationId = requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    resize();
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
    };
  }, [count, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width:  '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
