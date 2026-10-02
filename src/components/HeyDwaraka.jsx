import { motion } from 'framer-motion';
import { FadeUp } from './AnimationHelpers';
import { CONFIG } from '../data/content';
import './HeyDwaraka.css';

// ============================================
//   Section 02 — Hey, Dwaraka
// ============================================
export default function HeyDwaraka({ onJourney }) {
  return (
    <section id="hey" className="section hey-section">
      <div className="section-inner">

        <FadeUp>
          <span className="label-small">A message</span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2 className="hey-heading">
            Hey, {CONFIG.name}.
          </h2>
        </FadeUp>

        <FadeUp delay={0.22}>
          <p className="hey-subheading">
            I made something for you.
          </p>
        </FadeUp>

        <FadeUp delay={0.42}>
          <p className="hey-para">
            No reason. No occasion.<br />
            Just because you deserve it.
          </p>
        </FadeUp>

        <FadeUp delay={0.6}>
          <motion.button
            id="btn-journey"
            className="journey-btn"
            onClick={onJourney}
            whileHover={{ x: 6 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
          >
            Take a little journey&nbsp;&nbsp;→
          </motion.button>
        </FadeUp>

      </div>
    </section>
  );
}
