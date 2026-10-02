import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import StarField from './StarField';
import MagneticButton from './MagneticButton';
import { CONFIG } from '../data/content';
import './OpeningScreen.css';

// ============================================
//   Section 01 — Opening
// ============================================
export default function OpeningScreen({ onEnter }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1600),
      setTimeout(() => setPhase(2), 3000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnter = () => {
    setPhase(3);
    setTimeout(onEnter, 1000);
  };

  return (
    <AnimatePresence>
      {phase < 3 && (
        <motion.div
          className="opening"
          key="opening"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="opening-glow" aria-hidden="true" />
          <div className="opening-haze" aria-hidden="true" />
          <StarField count={90} speed={0.15} />

          <div className="opening-content">
            {/* Pre-title — small, quiet */}
            <AnimatePresence>
              {phase >= 0 && (
                <motion.p
                  className="opening-subtitle"
                  key="subtitle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                >
                  For someone who became unexpectedly special...
                </motion.p>
              )}
            </AnimatePresence>

            {/* Name — the main event */}
            <AnimatePresence>
              {phase >= 1 && (
                <motion.h1
                  className="opening-name"
                  key="name"
                  initial={{ opacity: 0, y: 16, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                  transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {CONFIG.fullName}
                </motion.h1>
              )}
            </AnimatePresence>

            {/* Enter */}
            <AnimatePresence>
              {phase >= 2 && (
                <motion.div
                  key="enter"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="opening-enter-wrap"
                >
                  <MagneticButton
                    id="btn-enter"
                    className="enter-btn"
                    onClick={handleEnter}
                    strength={18}
                  >
                    ✦ &nbsp; ENTER &nbsp; ✦
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Very quiet bottom note */}
          <AnimatePresence>
            {phase >= 2 && (
              <motion.p
                key="hint"
                className="opening-hint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1.5 }}
              >
                made for you
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
