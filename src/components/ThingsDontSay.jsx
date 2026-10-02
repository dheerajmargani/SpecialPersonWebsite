import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './ThingsDontSay.css';

// ============================================
//   Section 07 — Things I Don't Always Say
//   Minimal. One sentence at a time. No stars.
// ============================================

const sentences = [
  { text: 'There are some things I don\'t always say.',  role: 'opener' },
  { text: 'You became important to me.',                 role: 'main'   },
  { text: 'More than I expected.',                       role: 'main'   },
  { text: 'And somewhere along the way...',              role: 'bridge' },
  { text: 'You became someone I genuinely care about.',  role: 'key'    },
  { text: 'I don\'t know what the future looks like.',   role: 'main'   },
  { text: 'And I\'m okay with not knowing.',             role: 'close'  },
];

const DELAYS = [500, 1200, 1000, 1100, 1200, 1100, 1100];

export default function ThingsDontSay() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: '-8% 0px' });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (visibleCount >= sentences.length) return;

    const timer = setTimeout(() => {
      setVisibleCount((c) => c + 1);
    }, DELAYS[visibleCount] ?? 1100);

    return () => clearTimeout(timer);
  }, [inView, visibleCount]);

  return (
    // No stars. Just dark. Let the words carry everything.
    <section id="things" className="section things-section" ref={ref}>
      <div className="section-inner things-inner">
        <AnimatePresence>
          {sentences.map((s, i) =>
            i < visibleCount ? (
              <motion.p
                key={i}
                className={`things-sentence things-${s.role}`}
                initial={{ opacity: 0, filter: 'blur(6px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
              >
                {s.text}
              </motion.p>
            ) : null
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
