import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import StarField from './StarField';
import { CONFIG } from '../data/content';
import './FinalScreen.css';

// ============================================
//   Section 11 — Final Screen
//   Cinematic dark ending, slow sentence reveal
// ============================================

const finalLines = [
  { text: 'One last thing...',                              role: 'opener'  },
  { text: 'I don\'t know where life takes us...',          role: 'line'    },
  { text: 'But I\'m genuinely grateful that I met you.',   role: 'warm'    },
  { text: 'I\'m glad you\'re here.',                        role: 'key'     },
];

// Delays between each sentence appearing (ms)
const DELAYS = [600, 1400, 1400, 1600];

export default function FinalScreen() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-5% 0px' });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (visibleCount >= finalLines.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, DELAYS[visibleCount] ?? 1400);

    return () => clearTimeout(timer);
  }, [inView, visibleCount]);

  const allVisible = visibleCount >= finalLines.length;

  return (
    <section id="final" className="final-section" ref={ref}>
      <StarField count={180} speed={0.12} />
      <div className="final-glow" aria-hidden="true" />

      <div className="final-content">
        <AnimatePresence>
          {finalLines.map((line, i) =>
            i < visibleCount ? (
              <motion.p
                key={i}
                className={`final-line final-${line.role}`}
                initial={{ opacity: 0, y: 24, filter: 'blur(12px)' }}
                animate={{ opacity: 1, y: 0,  filter: 'blur(0px)'  }}
                transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
              >
                {line.text}
              </motion.p>
            ) : null
          )}
        </AnimatePresence>

        {/* Signature fades in after all lines, with extra delay */}
        <AnimatePresence>
          {allVisible && (
            <motion.p
              className="final-signature"
              initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
              animate={{ opacity: 1,   y: 0,  filter: 'blur(0px)' }}
              transition={{ duration: 2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              — {CONFIG.from}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Gentle vignette that deepens after everything is shown */}
      <AnimatePresence>
        {allVisible && (
          <motion.div
            className="final-vignette"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1  }}
            transition={{ duration: 4, delay: 5 }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </section>
  );
}
