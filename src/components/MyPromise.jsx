import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FadeUp } from './AnimationHelpers';
import './MyPromise.css';

// ============================================
//   Section 09 — My Promise
// ============================================

const paragraphs = [
  'I may not know what the future looks like.',
  'I may not know where life takes you,\nwhat dreams you chase,\nor how much everything around us changes.',
  'But there is one thing I know.',
  'I will always want to see you happy.',
  'I\'ll stand beside you when things get difficult.\nI\'ll genuinely support you when you chase your dreams.\nI\'ll be there whenever you need someone to listen.\nI\'ll celebrate your happiness like it\'s my own.',
  'I don\'t want to control your journey.\nI don\'t want to decide your path.',
  'I just want to be someone who makes that journey a little easier.',
  'I\'ll admire you for who you are.\nI\'ll respect the person you\'re becoming.\nAnd I\'ll always be proud of you for trying,\ngrowing,\nand becoming the person you want to be.',
  'I don\'t expect anything in return for any of this.',
  'Because caring about someone genuinely\nisn\'t about what you get back.',
  'Sometimes, it\'s simply about being there.',
  'And if you ever look around and wonder\nwho is still cheering for you...',
  'I hope you\'ll remember\nthat I\'ll be one of those people.',
];

export default function MyPromise() {
  return (
    <section id="promise" className="section promise-section">
      <div className="promise-bg" aria-hidden="true" />
      <div className="section-inner">
        <FadeUp>
          <span className="label-small">A promise</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="heading-xl promise-heading">
            If you ever need me...
          </h2>
        </FadeUp>
        <div className="promise-paragraphs">
          {paragraphs.map((para, i) => (
            <PromiseParagraph key={i} text={para} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromiseParagraph({ text, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px 0px' });

  const isKey = index === 3 || index === 6 || index === 12;

  return (
    <motion.p
      ref={ref}
      className={`promise-para ${isKey ? 'promise-key' : ''}`}
      initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 1.1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
    >
      {text.split('\n').map((line, i, arr) => (
        <span key={i}>
          {line}
          {i < arr.length - 1 && <br />}
        </span>
      ))}
    </motion.p>
  );
}
