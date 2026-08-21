'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';
import ThemeSelector from './ThemeSelector';
import { useLanguage } from '@/context/LanguageContext';
import { usePassport } from '@/context/PassportContext';
import { useBookmarks } from '@/context/BookmarksContext';

interface NavbarProps {
  onOpenMegaMenu?: () => void;
  onOpenAIPlanner?: () => void;
  onOpenPassport?: () => void;
  onOpenSearch?: () => void;
  onOpenBookmarks?: () => void;
}

export default function Navbar({
  onOpenMegaMenu,
  onOpenAIPlanner,
  onOpenPassport,
  onOpenSearch,
  onOpenBookmarks,
}: NavbarProps) {
  const { t } = useLanguage();
  const { totalExperiencesCount } = usePassport();
  const { totalBookmarksCount } = useBookmarks();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Track scroll to toggle navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sectionIds = [
      'discover', 'explore', 'cultural-shadows', 'circuits',
      'documentaries', 'festivals', 'wildlife', 'hidden-gems',
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const smoothScroll = useCallback((href: string, pageRoute?: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/' && pageRoute) {
        window.location.href = pageRoute;
        return;
      }
      if (href === '#') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.querySelector(href);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else if (pageRoute) {
          window.location.href = pageRoute;
        }
      }
    }
    setIsOpen(false);
  }, []);

  // Standard Navigation Links matching requirements
  const navLinks = [
    { label: 'Home', href: '#', pageRoute: '/', icon: '🏠' },
    { label: 'Destinations', href: '#explore', pageRoute: '/destinations', icon: '🏛️', isMega: true },
    { label: 'Experiences', href: '#explore', pageRoute: '/experiences', icon: '🗺️' },
    { label: 'Plan', href: '#gis-map', pageRoute: '/plan', icon: '🧭' },
    { label: 'Festivals', href: '#festivals', pageRoute: '/festivals', icon: '🎭' },
    { label: 'Shadows', href: '#cultural-shadows', pageRoute: '/cultural-shadows', icon: '✦' },
    { label: 'Stories', href: '#documentaries', pageRoute: '/stories', icon: '🎬' },
    { label: 'Guides', href: '#guides', pageRoute: '/guides', icon: '👥' },
    { label: 'My Bharat', href: '/my-bharat', pageRoute: '/my-bharat', icon: '🇮🇳' },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out border-b ${
          scrolled
            ? 'bg-[#031527]/85 backdrop-blur-xl border-ivory/12 shadow-lg shadow-black/20'
            : 'bg-transparent backdrop-blur-sm border-transparent'
        }`}
        style={{ paddingTop: scrolled ? '8px' : '14px', paddingBottom: scrolled ? '8px' : '14px' }}
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* ── Brand Logo + Wordmark ─────────────── */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group shrink-0"
          >
            <div
              className={`relative rounded-full overflow-hidden border border-saffron/50 shadow-md bg-navy-dark shrink-0 transition-all duration-300 ${
                scrolled ? 'w-9 h-9' : 'w-10 h-10 sm:w-11 sm:h-11'
              }`}
            >
              <Image
                src="/images/logo.png"
                alt="Bharat Bharman Official Logo"
                fill
                sizes="44px"
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span
                className={`font-heading tracking-[0.14em] font-light uppercase text-ivory leading-tight transition-all duration-300 ${
                  scrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
                }`}
              >
                <span className="font-semibold text-white">BHARAT</span>{' '}
                <span className="text-saffron font-semibold">BHARMAN</span>
              </span>
              <span
                className={`tracking-[0.25em] text-ivory/60 uppercase font-heading transition-all duration-300 ${
                  scrolled ? 'text-[7px] sm:text-[8px]' : 'text-[8px] sm:text-[9px]'
                }`}
              >
                {t.tagline}
              </span>
            </div>
          </a>

          {/* ── Center Navigation Links (Desktop) ────────────── */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive =
                item.href === '#'
                  ? !scrolled && activeSection === ''
                  : activeSection === item.href.replace('#', '');

              if (item.isMega) {
                return (
                  <button
                    key={item.label}
                    onClick={onOpenMegaMenu}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase font-heading transition-all duration-200 ${
                      isActive
                        ? 'bg-saffron/15 text-saffron font-semibold border border-saffron/30'
                        : 'text-ivory/75 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="text-xs">{item.icon}</span>
                    <span>{item.label}</span>
                    <span className="text-[8px] text-saffron group-hover:rotate-180 transition-transform">▾</span>
                  </button>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.pageRoute || item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScroll(item.href, item.pageRoute);
                  }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] tracking-[0.1em] uppercase font-heading transition-all duration-200 ${
                    isActive
                      ? 'bg-saffron/15 text-saffron font-semibold border border-saffron/30'
                      : 'text-ivory/75 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <span className="text-xs">{item.icon}</span>
                  <span>{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* ── Right Actions: Search, Language, Bookmarks, Passport, AI ── */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-full bg-white/5 border border-ivory/10 hover:border-saffron/40 hover:bg-white/10 text-ivory/70 hover:text-white transition-all"
              title="Global Search (Ctrl/Cmd + K)"
              aria-label="Search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="M21 21l-4.35-4.35" />
              </svg>
            </button>

            {/* Language Selector */}
            <LanguageSelector />

            {/* Theme Selector */}
            <ThemeSelector />

            {/* My Bharat Saved Bookmarks */}
            <button
              onClick={onOpenBookmarks}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-ivory/10 hover:border-gold/50 text-xs font-heading uppercase text-ivory/80 hover:text-gold transition-all"
              title="My Bharat Saved Journeys"
            >
              <span>🔖</span>
              <span className="hidden 2xl:inline">Saved</span>
              <span className="px-1.5 py-0.5 rounded-full bg-gold/20 text-gold text-[9px] font-bold min-w-[18px] text-center">
                {totalBookmarksCount}
              </span>
            </button>

            {/* Cultural Passport Badge */}
            <button
              onClick={onOpenPassport}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/5 border border-gold/30 hover:border-gold text-xs font-heading uppercase text-gold transition-all"
              title="My Cultural Passport"
            >
              <span>🛂</span>
              <span className="hidden 2xl:inline">{t.myPassport}</span>
              <span className="px-1.5 py-0.5 rounded-full bg-gold/20 text-gold text-[9px] font-bold min-w-[18px] text-center">
                {totalExperiencesCount}
              </span>
            </button>

            {/* AI Guide CTA */}
            <button
              onClick={onOpenAIPlanner}
              className="btn-primary text-[10px] !py-2 !px-3.5 !rounded-full flex items-center gap-1.5"
            >
              <span>🤖</span>
              <span>{t.planWithAI}</span>
            </button>
          </div>

          {/* ── Mobile Menu Trigger ────────────────────────── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2 z-[60]"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-ivory"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block w-6 h-[1.5px] bg-ivory"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block w-6 h-[1.5px] bg-ivory"
            />
          </button>
        </div>
      </nav>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[55] bg-[#020d1a]/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-4 px-6 overflow-y-auto"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-saffron/50 mb-1">
              <Image src="/images/logo.png" alt="Logo" fill sizes="56px" className="object-cover" />
            </div>
            <span className="text-xs tracking-[0.3em] uppercase text-saffron font-heading">
              Bharat Bharman
            </span>
            <div className="accent-line-tricolor my-1" />

            {/* Mobile Utility Row */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 my-2">
              <LanguageSelector />
              <ThemeSelector />
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenPassport) onOpenPassport();
                }}
                className="px-3 py-1.5 rounded-full bg-navy-card border border-gold/30 text-xs text-gold font-heading"
              >
                🛂 Passport ({totalExperiencesCount})
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenBookmarks) onOpenBookmarks();
                }}
                className="px-3 py-1.5 rounded-full bg-navy-card border border-ivory/10 text-xs text-ivory font-heading"
              >
                🔖 ({totalBookmarksCount})
              </button>
            </div>

            {/* Mobile Navigation Links */}
            <div className="flex flex-col items-center gap-3 w-full max-w-sm">
              {/* Mega Menu Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenMegaMenu) onOpenMegaMenu();
                }}
                className="text-base font-heading tracking-[0.15em] uppercase text-saffron font-semibold flex items-center gap-2"
              >
                🗺️ Explore Destinations ▾
              </button>

              {/* Section Links */}
              {navLinks
                .filter((item) => !item.isMega)
                .map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.pageRoute || item.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={(e) => {
                      e.preventDefault();
                      smoothScroll(item.href, item.pageRoute);
                    }}
                    className={`text-base font-heading tracking-[0.15em] uppercase transition-colors flex items-center gap-2.5 ${
                      activeSection === item.href.replace('#', '')
                        ? 'text-saffron font-semibold'
                        : 'text-ivory hover:text-saffron'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </motion.a>
                ))}
            </div>

            {/* Mobile AI CTA */}
            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenAIPlanner) onOpenAIPlanner();
              }}
              className="btn-primary mt-3 text-xs !rounded-full"
            >
              🤖 {t.planWithAI}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
