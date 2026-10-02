import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import { FadeUp } from './AnimationHelpers';
import { playlist } from '../data/content';
import './Playlist.css';

// ============================================
//   Section 05 — If You Were a Playlist
//   Poetic titles only. No actual song names.
// ============================================

function formatTime(sec) {
  if (!sec || isNaN(sec)) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function PlaylistSection() {
  const [currentIdx, setCurrentIdx]   = useState(0);
  const [isPlaying, setIsPlaying]     = useState(false);
  const [progress, setProgress]       = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [volume, setVolume]           = useState(0.7);
  const [isMuted, setIsMuted]         = useState(false);
  const [hasAudio, setHasAudio]       = useState(false);
  const [isLoading, setIsLoading]     = useState(false);

  const audioRef      = useRef(null);
  const currentIdxRef = useRef(0);

  const currentTrack = playlist[currentIdx];

  useEffect(() => { currentIdxRef.current = currentIdx; }, [currentIdx]);

  const goNext = useCallback(() => {
    const next = (currentIdxRef.current + 1) % playlist.length;
    setCurrentIdx(next);
    setIsPlaying(true);
  }, []);

  const goPrev = useCallback(() => {
    const prev = (currentIdxRef.current - 1 + playlist.length) % playlist.length;
    setCurrentIdx(prev);
    setIsPlaying(true);
  }, []);

  // Init audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = 0.7;
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
        setCurrentTime(audio.currentTime);
      }
    };
    const onDurationChange = () => { if (audio.duration) setDuration(audio.duration); };
    const onCanPlay  = () => { setHasAudio(true); setIsLoading(false); };
    const onError    = () => { setHasAudio(false); setIsLoading(false); setIsPlaying(false); };
    const onEnded    = () => goNext();

    audio.addEventListener('timeupdate',      onTimeUpdate);
    audio.addEventListener('durationchange',  onDurationChange);
    audio.addEventListener('canplay',         onCanPlay);
    audio.addEventListener('error',           onError);
    audio.addEventListener('ended',           onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate',     onTimeUpdate);
      audio.removeEventListener('durationchange', onDurationChange);
      audio.removeEventListener('canplay',        onCanPlay);
      audio.removeEventListener('error',          onError);
      audio.removeEventListener('ended',          onEnded);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track change
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setIsLoading(true);
    setHasAudio(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    audio.src = currentTrack.src;
    audio.load();
    if (isPlaying) {
      audio.play().catch(() => { setIsPlaying(false); setIsLoading(false); });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIdx]);

  // Volume sync
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src || audio.src === window.location.href) {
      audio.src = currentTrack.src;
      audio.load();
    }
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      setIsLoading(true);
      audio.play()
        .then(() => { setIsPlaying(true); setIsLoading(false); })
        .catch(() => { setIsPlaying(false); setIsLoading(false); });
    }
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || !hasAudio) return;
    const rect  = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  const handleVolume = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
  };

  const toggleMute = () => setIsMuted((m) => !m);

  const selectTrack = (idx) => {
    if (idx === currentIdx) { togglePlay(); }
    else { setCurrentIdx(idx); setIsPlaying(true); }
  };

  return (
    <section id="playlist" className="section playlist-section">
      <div className="section-inner">

        <FadeUp>
          <span className="label-small">A Soundtrack</span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="heading-xl">
            If you were a playlist...
          </h2>
        </FadeUp>
        <FadeUp delay={0.2}>
          <p className="body-lg pl-subtitle">
            Maybe these feelings would be somewhere in it.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="player-wrap">

            {/* ── Abstract art panel ── */}
            <div
              className="player-art"
              style={{
                '--g1':   currentTrack.color[0],
                '--g2':   currentTrack.color[1],
                '--glow': currentTrack.glow,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  className="art-inner"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Vinyl disc */}
                  <motion.div
                    className="art-disc"
                    animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 7, repeat: Infinity, ease: 'linear' }}
                  />
                  {/* Track number overlay */}
                  <span className="art-num">{String(currentIdx + 1).padStart(2, '0')}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* ── Player controls ── */}
            <div className="player-controls">

              {/* Track info */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIdx}
                  className="player-info"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="player-track-title">{currentTrack.title}</p>
                  <p className="player-track-mood">{currentTrack.mood}</p>
                </motion.div>
              </AnimatePresence>

              {/* Progress bar + time */}
              <div className="progress-wrap">
                <div
                  className="player-progress"
                  onClick={handleSeek}
                  role="slider"
                  aria-label="Seek"
                  aria-valuenow={Math.round(progress)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${progress}%` }} />
                    <div className="progress-dot"  style={{ left:  `${progress}%` }} />
                  </div>
                </div>
                <div className="progress-time">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Playback buttons */}
              <div className="player-buttons">
                <button id="btn-prev" className="ctrl-btn" onClick={goPrev} aria-label="Previous">
                  <SkipBack size={17} />
                </button>

                <button id="btn-play" className="ctrl-btn play-btn" onClick={togglePlay} aria-label={isPlaying ? 'Pause' : 'Play'}>
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.span key="loading" className="loading-dot"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
                    ) : isPlaying ? (
                      <motion.span key="pause"
                        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}>
                        <Pause size={21} />
                      </motion.span>
                    ) : (
                      <motion.span key="play"
                        initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }} transition={{ duration: 0.18 }}>
                        <Play size={21} />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>

                <button id="btn-next" className="ctrl-btn" onClick={goNext} aria-label="Next">
                  <SkipForward size={17} />
                </button>

                {/* Volume — desktop only */}
                <div className="player-volume">
                  <button id="btn-mute" className="vol-btn" onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute' : 'Mute'}>
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                  <input
                    type="range" min="0" max="1" step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolume}
                    className="vol-slider"
                    aria-label="Volume"
                  />
                </div>
              </div>

            </div>

            {/* ── Tracklist ── */}
            <div className="player-tracklist">
              <p className="pl-list-label">Feelings</p>
              {playlist.map((track, idx) => (
                <motion.button
                  key={track.id}
                  id={`btn-track-${track.id}`}
                  className={`pl-track ${idx === currentIdx ? 'active' : ''}`}
                  onClick={() => selectTrack(idx)}
                  whileHover={{ x: 3 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                >
                  <span className="pl-track-num">{String(idx + 1).padStart(2, '0')}</span>
                  <span className="pl-track-name">{track.title}</span>
                  {idx === currentIdx && isPlaying && (
                    <span className="pl-playing-indicator" aria-hidden="true">
                      <PulsingBars />
                    </span>
                  )}
                </motion.button>
              ))}
              {/* Clean end divider */}
              <div className="pl-end-divider" />
            </div>

          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// Tiny animated bars — shows when track is playing
function PulsingBars() {
  return (
    <span className="playing-bars" aria-hidden="true">
      {[0, 0.15, 0.08].map((delay, i) => (
        <span key={i} className="bar" style={{ animationDelay: `${delay}s` }} />
      ))}
    </span>
  );
}
