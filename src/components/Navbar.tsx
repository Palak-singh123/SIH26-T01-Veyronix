'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
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
  const { scrollY } = useScroll();

  const navItems = [
    { label: t.navDestinations, action: onOpenMegaMenu, isMega: true },
    { label: t.navExperiences, href: '#explore' },
    { label: t.navPlan, href: '#gis-map' },
    { label: t.navFestivals, href: '#festival-calendar' },
    { label: t.navCulturalShadows, href: '#cultural-shadows' },
  ];

  const navBg = useTransform(
    scrollY,
    [0, 100],
    ['rgba(4, 26, 49, 0.4)', 'rgba(4, 26, 49, 0.96)']
  );
  const navBlur = useTransform(scrollY, [0, 100], ['blur(8px)', 'blur(20px)']);
  const navPadding = useTransform(scrollY, [0, 100], ['16px', '10px']);
  const logoScale = useTransform(scrollY, [0, 100], [1, 0.88]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0.08, 0.16]);
  const borderColor = useTransform(borderOpacity, (v) => `rgba(255, 248, 236, ${v})`);

  return (
    <>
      <motion.nav
        style={{
          backgroundColor: navBg,
          backdropFilter: navBlur,
          WebkitBackdropFilter: navBlur,
          paddingTop: navPadding,
          paddingBottom: navPadding,
          borderBottomColor: borderColor,
        }}
        className="fixed top-0 left-0 right-0 z-50 border-b transition-colors"
      >
        <div className="max-w-[1440px] mx-auto px-6 flex items-center justify-between">
          {/* ── Official Brand Logo + Wordmark ─────────────── */}
          <motion.a
            href="#"
            style={{ scale: logoScale }}
            className="flex items-center gap-3.5 group"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-saffron/50 shadow-md bg-navy-dark shrink-0">
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
              <span className="font-heading text-lg sm:text-xl tracking-[0.14em] font-light uppercase text-ivory leading-tight">
                <span className="font-semibold text-white">BHARAT</span>{' '}
                <span className="text-saffron font-semibold">BHARMAN</span>
              </span>
              <span className="text-[8px] sm:text-[9px] tracking-[0.25em] text-ivory/60 uppercase font-heading">
                {t.tagline}
              </span>
            </div>
          </motion.a>

          {/* ── Center National Navigation Items ────────────── */}
          <div className="hidden xl:flex items-center gap-6 2xl:gap-8">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.isMega ? (
                  <button
                    onClick={item.action}
                    className="flex items-center gap-1 text-xs tracking-[0.12em] uppercase font-heading text-ivory/90 hover:text-saffron transition-colors font-medium group"
                  >
                    <span>{item.label}</span>
                    <span className="text-[10px] text-saffron group-hover:rotate-180 transition-transform">
                      ▾
                    </span>
                  </button>
                ) : (
                  <a
                    href={item.href}
                    className="text-xs tracking-[0.12em] uppercase font-heading text-ivory/80 hover:text-saffron transition-colors"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* ── Right Actions: Language, Search, Bookmarks, Passport, AI ── */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 rounded-sm bg-navy-card/80 border border-ivory/10 hover:border-saffron/40 text-ivory/70 hover:text-white transition-colors"
              title="Global Search (Ctrl/Cmd + K)"
              aria-label="Search"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-navy-card/80 border border-ivory/10 hover:border-gold/50 text-xs font-heading uppercase text-ivory/80 hover:text-gold transition-colors"
              title="My Bharat Saved Journeys"
            >
              <span>🔖</span>
              <span className="hidden 2xl:inline">Saved</span>
              <span className="px-1.5 py-0.2 rounded-full bg-gold/20 text-gold text-[9px] font-bold">
                {totalBookmarksCount}
              </span>
            </button>

            {/* Cultural Passport Badge */}
            <button
              onClick={onOpenPassport}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-navy-card/80 border border-gold/30 hover:border-gold text-xs font-heading uppercase text-gold transition-colors"
              title="My Cultural Passport"
            >
              <span>🛂</span>
              <span className="hidden 2xl:inline">{t.myPassport}</span>
              <span className="px-1.5 py-0.2 rounded-full bg-gold/20 text-gold text-[9px] font-bold">
                {totalExperiencesCount}
              </span>
            </button>

            {/* AI Guide CTA */}
            <button
              onClick={onOpenAIPlanner}
              className="btn-primary text-[10px] !py-2 !px-3.5 flex items-center gap-1.5"
            >
              <span>🤖</span>
              <span>{t.planWithAI}</span>
            </button>
          </div>

          {/* ── Mobile Menu Trigger ────────────────────────── */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
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
      </motion.nav>

      {/* ── Mobile Drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy-dark/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-5 px-6"
          >
            <div className="relative w-14 h-14 rounded-full overflow-hidden border border-saffron/50 mb-1">
              <Image src="/images/logo.png" alt="Logo" fill sizes="56px" className="object-cover" />
            </div>
            <span className="text-xs tracking-[0.3em] uppercase text-saffron font-heading">
              Bharat Bharman
            </span>
            <div className="accent-line-tricolor my-1" />

            <div className="flex flex-wrap items-center justify-center gap-2.5 my-2">
              <LanguageSelector />
              <ThemeSelector />
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenPassport) onOpenPassport();
                }}
                className="px-3 py-1.5 rounded bg-navy-card border border-gold/30 text-xs text-gold font-heading"
              >
                🛂 Passport ({totalExperiencesCount})
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenBookmarks) onOpenBookmarks();
                }}
                className="px-3 py-1.5 rounded bg-navy-card border border-ivory/10 text-xs text-ivory font-heading"
              >
                🔖 ({totalBookmarksCount})
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenMegaMenu) onOpenMegaMenu();
                }}
                className="text-base font-heading tracking-[0.15em] uppercase text-saffron font-semibold"
              >
                Explore Destinations Mega Menu ▾
              </button>
              {navItems
                .filter((item) => !item.isMega)
                .map((item, i) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-heading tracking-[0.15em] uppercase text-ivory hover:text-saffron transition-colors"
                  >
                    {item.label}
                  </motion.a>
                ))}
            </div>

            <button
              onClick={() => {
                setIsOpen(false);
                if (onOpenAIPlanner) onOpenAIPlanner();
              }}
              className="btn-primary mt-3 text-xs"
            >
              🤖 {t.planWithAI}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
