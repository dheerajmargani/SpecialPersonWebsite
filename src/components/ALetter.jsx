import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CONFIG, letterContent } from '../data/content';
import './ALetter.css';

// ============================================
//   Section 10 — A Letter For You
//   No label. No heading. Just the letter.
// ============================================
export default function ALetter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  return (
    <section id="letter" className="section letter-section" ref={ref}>
      <div className="section-inner">
        <motion.div
          className="letter-paper"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="letter-salutation">Dear {CONFIG.name},</p>

          <div className="letter-body">
            {letterContent.split('\n\n').map((para, i) => (
              <p key={i} className="letter-para">{para}</p>
            ))}
          </div>

          <p className="letter-signature">— {CONFIG.from}</p>
        </motion.div>
      </div>
    </section>
  );
}
