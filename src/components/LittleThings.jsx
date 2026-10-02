import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeUp } from './AnimationHelpers';
import { littleThings } from '../data/content';
import './LittleThings.css';

// ============================================
//   Section 04 — Little Things I Notice
// ============================================
export default function LittleThings() {
  return (
    <section id="little-things" className="section lt-section">
      <div className="section-inner">
        <FadeUp>
          <span className="label-small">Observations</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="heading-xl">Little things I notice</h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="body-lg lt-subtitle">
            You probably don&apos;t realize how many little things make you... <em>you.</em>
          </p>
        </FadeUp>

        <div className="lt-list">
          {littleThings.map((item, i) => (
            <LittleThingRow key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LittleThingRow({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      className="lt-row"
      initial={{ opacity: 0, x: -20, filter: 'blur(5px)' }}
      animate={inView ? { opacity: 1, x: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <span className="lt-number">{item.id}</span>
      <p className="lt-text">&ldquo;{item.text}&rdquo;</p>
    </motion.div>
  );
}
