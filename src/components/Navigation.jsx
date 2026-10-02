import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navigation.css';

// ============================================
//   Minimal Floating Navigation
// ============================================

const navItems = [
  { id: 'hey',          label: 'Hey',         section: 'hey' },
  { id: 'universe',     label: 'Universe',    section: 'universe' },
  { id: 'little-things',label: 'Observations',section: 'little-things' },
  { id: 'playlist',     label: 'Playlist',    section: 'playlist' },
  { id: 'moments',      label: 'Moments',     section: 'moments' },
  { id: 'things',       label: 'Words',       section: 'things' },
  { id: 'promise',      label: 'Promise',     section: 'promise' },
  { id: 'letter',       label: 'Letter',      section: 'letter' },
  { id: 'final',        label: 'Finally',     section: 'final' },
];

export default function Navigation({ visible }) {
  const [activeSection, setActiveSection] = useState('hey');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tooltip, setTooltip] = useState(null);

  useEffect(() => {
    if (!visible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 }
    );

    navItems.forEach(({ section }) => {
      const el = document.getElementById(section);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [visible]);

  const scrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Desktop side navigation dots */}
      <motion.nav
        className="nav-dots"
        aria-label="Section navigation"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`nav-dot ${activeSection === item.section ? 'active' : ''}`}
            onClick={() => scrollTo(item.section)}
            onMouseEnter={() => setTooltip(item.id)}
            onMouseLeave={() => setTooltip(null)}
            aria-label={`Go to ${item.label}`}
          >
            <span className="nav-dot-inner" />
            <AnimatePresence>
              {tooltip === item.id && (
                <motion.span
                  className="nav-tooltip"
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.25 }}
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </motion.nav>

      {/* Mobile hamburger */}
      <motion.div
        className="nav-mobile"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <button
          id="btn-menu"
          className="nav-menu-btn"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileOpen ? 'open' : ''}`}>
            <span />
            <span />
            <span />
          </span>
        </button>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="nav-mobile-panel glass-card"
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-mobile-item ${activeSection === item.section ? 'active' : ''}`}
                  onClick={() => scrollTo(item.section)}
                >
                  {item.label}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
