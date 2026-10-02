import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeUp } from './AnimationHelpers';
import { moments } from '../data/content';
import './LittleMoments.css';

// ============================================
//   Section 06 — Little Moments (Timeline)
// ============================================
export default function LittleMoments() {
  return (
    <section id="moments" className="section moments-section">
      <div className="section-inner">
        <FadeUp>
          <span className="label-small">Memories</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="heading-xl">Little moments</h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="body-lg moments-subtitle">
            <em>Not every memory needs a photograph.</em>
          </p>
        </FadeUp>

        <div className="timeline">
          {moments.map((m, i) => (
            <TimelineItem key={m.id} moment={m} index={i} isLast={i === moments.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineItem({ moment, index, isLast }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px 0px' });

  return (
    <motion.div
      ref={ref}
      className="timeline-item"
      initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Left column — line and dot */}
      <div className="timeline-left">
        <div className="timeline-dot">
          <span className="timeline-symbol">{moment.symbol}</span>
        </div>
        {!isLast && <div className="timeline-line" />}
      </div>

      {/* Right column — content */}
      <div className="timeline-content">
        <h3 className="timeline-title">{moment.title}</h3>
        <p className="timeline-text">
          {moment.text.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < moment.text.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      </div>
    </motion.div>
  );
}
