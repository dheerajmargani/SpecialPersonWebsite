import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import CursorGlow from './components/CursorGlow';
import Navigation from './components/Navigation';
import OpeningScreen from './components/OpeningScreen';
import HeyDwaraka from './components/HeyDwaraka';
import YourUniverse from './components/YourUniverse';
import LittleThings from './components/LittleThings';
import PlaylistSection from './components/Playlist';
import LittleMoments from './components/LittleMoments';
import ThingsDontSay from './components/ThingsDontSay';
import WhatYouMean from './components/WhatYouMean';
import MyPromise from './components/MyPromise';
import ALetter from './components/ALetter';
import FinalScreen from './components/FinalScreen';

import './App.css';

export default function App() {
  const [entered, setEntered] = useState(false);

  const handleJourney = () => {
    const el = document.getElementById('universe');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Cursor glow — desktop only */}
      <CursorGlow />

      {/* Opening cinematic screen */}
      <OpeningScreen onEnter={() => setEntered(true)} />

      {/* Navigation — shown after entering */}
      <Navigation visible={entered} />

      {/* Main website content */}
      <AnimatePresence>
        {entered && (
          <motion.main
            id="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* S02 — Hey Dwaraka */}
            <HeyDwaraka onJourney={handleJourney} />

            {/* S03 — Your Little Universe */}
            <YourUniverse />

            {/* S04 — Little Things I Notice */}
            <LittleThings />

            {/* S05 — If You Were A Playlist */}
            <PlaylistSection />

            {/* S06 — Little Moments */}
            <LittleMoments />

            {/* S07 — Things I Don't Always Say */}
            <ThingsDontSay />

            {/* S08 — What You Mean to Me */}
            <WhatYouMean />

            {/* S09 — My Promise */}
            <MyPromise />

            {/* S10 — A Letter for You */}
            <ALetter />

            {/* S11 — Final Screen */}
            <FinalScreen />
          </motion.main>
        )}
      </AnimatePresence>
    </>
  );
}
