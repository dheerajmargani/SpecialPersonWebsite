import { FadeUp } from './AnimationHelpers';
import './WhatYouMean.css';

// ============================================
//   Section 08 — What You Mean to Me
// ============================================
export default function WhatYouMean() {
  return (
    <section id="what-you-mean" className="section wym-section">
      <div className="section-inner">
        <FadeUp>
          <span className="label-small">Simply put</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="heading-xl wym-heading">
            So... what do you mean to me?
          </h2>
        </FadeUp>

        <FadeUp delay={0.25}>
          <div className="wym-body-text">
            <p className="wym-main">
              You&apos;re someone I can talk to,<br />
              laugh with,<br />
              annoy,<br />
              share random things with,<br />
              and just be myself around.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={0.4}>
          <p className="wym-maybe">
            Maybe that&apos;s why you became so special.
          </p>
        </FadeUp>

        <FadeUp delay={0.55}>
          <div className="glow-divider" />
        </FadeUp>

        <FadeUp delay={0.65}>
          <p className="wym-quiet">I don&apos;t need an answer from you.</p>
        </FadeUp>

        <FadeUp delay={0.8}>
          <p className="wym-final">I just wanted you to know.</p>
        </FadeUp>
      </div>
    </section>
  );
}
