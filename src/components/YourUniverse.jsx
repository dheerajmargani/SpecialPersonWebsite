import { motion } from 'framer-motion';
import { FadeUp, StaggerContainer, StaggerItem } from './AnimationHelpers';
import { universeCards } from '../data/content';
import './YourUniverse.css';

// ============================================
//   Section 03 — Your Little Universe
// ============================================
export default function YourUniverse() {
  return (
    <section id="universe" className="section universe-section">
      <div className="section-inner">
        <FadeUp>
          <span className="label-small">A few things</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="heading-xl">Your little universe</h2>
        </FadeUp>
        <FadeUp delay={0.18}>
          <p className="body-lg universe-subtitle">
            There are a few things that are just&hellip; very you.
          </p>
        </FadeUp>
      </div>

      <StaggerContainer className="universe-cards section-wide" stagger={0.1} delay={0.1}>
        {universeCards.map((card) => (
          <StaggerItem key={card.id}>
            <UniverseCard card={card} />
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}

function UniverseCard({ card }) {
  return (
    // Simple div — no constant floating animation
    <motion.div
      className="u-card"
      whileHover={{ y: -5, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
    >
      <div className="u-card-emoji" aria-hidden="true">{card.emoji}</div>
      <span className="u-card-label">{card.label}</span>
      <p className="u-card-desc">{card.description}</p>
    </motion.div>
  );
}
