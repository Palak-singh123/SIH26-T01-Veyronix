'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

const heroCategories = [
  { id: 'heritage', label: 'HERITAGE', target: 'circuits' },
  { id: 'culture', label: 'CULTURE', target: 'cultural-shadows' },
  { id: 'food', label: 'FOOD', target: 'mementos' },
  { id: 'crafts', label: 'CRAFTS', target: 'mementos' },
  { id: 'festivals', label: 'FESTIVALS', target: 'festivals' },
  { id: 'nature', label: 'NATURE', target: 'wildlife' },
  { id: 'stories', label: 'STORIES', target: 'cinematic' },
];

export default function Hero() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [activeCategory, setActiveCategory] = useState('heritage');
  const [videoProgress, setVideoProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Staged cinematic sequence
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // Dark fade & logo
      setTimeout(() => setPhase(2), 1100),  // Video reaches brightness
      setTimeout(() => setPhase(3), 1900),  // Main Headline
      setTimeout(() => setPhase(4), 2700),  // Supporting text & CTAs
      setTimeout(() => setPhase(5), 3300),  // Category bar & controls
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Handle video progress update and seamless end-frame cutoff before watermark
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.duration) {
      const duration = videoRef.current.duration;
      const current = videoRef.current.currentTime;
      const prog = (current / duration) * 100;
      setVideoProgress(prog);

      // Smooth loop cut before the final 2.8 seconds containing third-party generated end-card
      if (duration > 5 && current >= duration - 2.8) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  };

  // Toggle Sound with smooth volume fade-in
  const toggleSound = () => {
    if (!videoRef.current) return;

    if (isMuted) {
      videoRef.current.muted = false;
      videoRef.current.volume = 0;
      let vol = 0;
      const interval = setInterval(() => {
        if (vol < 0.85 && videoRef.current) {
          vol += 0.15;
          videoRef.current.volume = Math.min(vol, 0.85);
        } else {
          clearInterval(interval);
        }
      }, 50);
      setIsMuted(false);
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const scrollToSection = (targetId: string) => {
    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const headlineWords = ['EXPLORE', 'INDIA.', 'EXPERIENCE', 'BHARAT.'];

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative w-full h-screen min-h-[700px] max-h-[1080px] overflow-hidden flex flex-col justify-between bg-navy-dark select-none"
    >
      {/* ── Background Full-Screen Cinematic Video ────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: phase >= 2 ? 1 : 0 }}
        transition={{ duration: 1.8, ease: 'easeOut' }}
        className="absolute inset-0 z-0"
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          onTimeUpdate={handleTimeUpdate}
          poster="/images/hero-bg.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
          <source src="/videos/It_was_good_add_more_places.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* ── Dynamic Gradient Overlays ─────────────────────── */}
      <div className="absolute inset-0 gradient-overlay-dark z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-radial from-transparent via-navy-dark/30 to-navy-dark/85 z-[1] pointer-events-none" />

      {/* ── Top Spacer for Navbar ─────────────────────────── */}
      <div className="h-24 sm:h-28 z-10" />

      {/* ── Center Cinematic Hero Content ─────────────────── */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center my-auto">
        {/* Subtle Opening Brand Logo Emblem */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col items-center mb-5"
            >
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-saffron/60 shadow-2xl p-0.5 bg-navy-dark/80 backdrop-blur-md mb-2">
                <Image
                  src="/images/logo.png"
                  alt="Bharat Bharman Emblem"
                  fill
                  sizes="80px"
                  className="object-cover"
                  priority
                />
              </div>
              <div className="accent-line-tricolor mb-2" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Primary Headline */}
        <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light leading-[1.08] mb-5 tracking-wide text-white drop-shadow-lg">
          <span className="inline-block mr-[0.3em] text-white font-medium">
            {t.heroHeadline1}
          </span>
          <span className="inline-block mr-[0.3em] text-saffron font-semibold">
            {t.heroHeadline2}
          </span>
        </h1>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-body text-sm sm:text-base md:text-lg text-ivory/85 max-w-2xl mx-auto mb-8 leading-relaxed font-light drop-shadow-md"
        >
          {t.heroSub}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button
            onClick={() => scrollToSection('explore')}
            className="btn-primary text-xs !py-3.5 !px-8 shadow-xl"
          >
            {t.exploreButton}
          </button>
          <button
            onClick={() => scrollToSection('gis-map')}
            className="btn-secondary text-xs !py-3.5 !px-8 backdrop-blur-md"
          >
            {t.planMyJourney}
          </button>
        </motion.div>
      </div>

      {/* ── Sound & Cinema Minimal Controls ────────────────── */}
      <div className="relative z-20 max-w-[1440px] w-full mx-auto px-6 flex items-center justify-between pb-2 text-xs">
        {/* Minimal Sound Toggle Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: phase >= 5 ? 1 : 0 }}
          onClick={toggleSound}
          className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-navy-dark/85 border border-ivory/20 hover:border-saffron/60 text-ivory/80 hover:text-white backdrop-blur-md transition-all shadow-lg group"
          aria-label={isMuted ? 'Unmute Original Video Sound' : 'Mute Video Sound'}
        >
          <span className="text-sm">{isMuted ? '🔇' : '🔊'}</span>
          <span className="text-[10px] font-heading uppercase tracking-wider">
            {isMuted ? 'Original Sound: Muted' : 'Sound: Active'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
        </motion.button>

        {/* Minimal Video Timeline Progress Bar */}
        <div className="hidden sm:flex items-center gap-3 bg-navy-dark/85 border border-ivory/15 px-3 py-1.5 rounded-full backdrop-blur-md">
          <span className="text-[9px] uppercase font-heading text-ivory/50 tracking-wider">
            Cinematic Reel
          </span>
          <div className="w-24 h-1 rounded-full bg-ivory/20 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-saffron to-green transition-all duration-300"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* ── Bottom Category Navigation Bar ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: phase >= 5 ? 1 : 0, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-20 w-full bg-navy-dark/95 border-t border-ivory/10 backdrop-blur-xl py-3.5 px-6"
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-center gap-4 sm:gap-8 md:gap-12 overflow-x-auto">
          {heroCategories.map((cat, idx) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  scrollToSection(cat.target);
                }}
                className="group relative flex items-center gap-2 py-1 text-xs font-heading font-semibold tracking-[0.2em] uppercase transition-colors shrink-0"
              >
                <span
                  className={
                    isActive
                      ? 'text-saffron'
                      : 'text-ivory/70 group-hover:text-white'
                  }
                >
                  {cat.label}
                </span>

                {/* Saffron Active Underline */}
                {isActive && (
                  <motion.div
                    layoutId="heroCategoryIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-saffron rounded-full"
                  />
                )}

                {/* Separator Pipe */}
                {idx < heroCategories.length - 1 && (
                  <span className="hidden sm:inline-block ml-4 md:ml-8 text-ivory/20 font-light select-none">
                    |
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
