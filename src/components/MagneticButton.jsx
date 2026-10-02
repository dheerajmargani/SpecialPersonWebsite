import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import './MagneticButton.css';

// ============================================
//   Magnetic Button with hover effect
// ============================================
export default function MagneticButton({ children, onClick, className = '', strength = 30, id }) {
  const ref = useRef(null);
  const xRef = useRef(0);
  const yRef = useRef(0);

  const handleMouseMove = useCallback((e) => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    xRef.current = ((e.clientX - cx) / rect.width) * strength;
    yRef.current = ((e.clientY - cy) / rect.height) * strength;
    ref.current.style.transform = `translate(${xRef.current}px, ${yRef.current}px)`;
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = 'translate(0px, 0px)';
  }, []);

  return (
    <motion.button
      ref={ref}
      id={id}
      className={`magnetic-btn ${className}`}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.97 }}
    >
      {children}
    </motion.button>
  );
}
