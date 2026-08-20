'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { heritageDestinations, tourismCircuits } from '@/data/tourismData';
import { allStatesAndUTs } from '@/data/allStatesData';
import { nationalParks } from '@/data/nationalParksData';
import { allAnnualFestivals } from '@/data/festivalsData';
import { bharatMementos } from '@/data/mementosData';

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectResult?: (type: string, id: string) => void;
  onAskAI?: (prompt: string) => void;
}

export default function GlobalSearch({
  isOpen,
  onClose,
  onSelectResult,
  onAskAI,
}: GlobalSearchProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Is the search query conversational (e.g. "suggest places", "3 days in", "how to")
  const isConversational = useMemo(() => {
    const q = query.toLowerCase();
    return (
      q.includes('like ') ||
      q.includes('where to') ||
      q.includes('suggest') ||
      q.includes('plan ') ||
      q.includes('how to') ||
      q.includes('quiet') ||
      q.includes('best time') ||
      q.split(' ').length >= 4
    );
  }, [query]);

  const searchResults = useMemo(() => {
    if (!query.trim() || isConversational) return [];
    const q = query.toLowerCase();

    const results: Array<{
      category: string;
      title: string;
      subtitle: string;
      id: string;
      actionType: string;
    }> = [];

    // 1. Search States & UTs
    allStatesAndUTs.forEach((s) => {
      if (s.name.toLowerCase().includes(q) || s.capital.toLowerCase().includes(q) || s.culturalHighlight.toLowerCase().includes(q)) {
        results.push({
          category: `State / UT (${s.region})`,
          title: s.name,
          subtitle: `${s.capital} • ${s.destinationCount} Destinations`,
          id: s.id,
          actionType: 'state',
        });
      }
    });

    // 2. Search National Parks
    nationalParks.forEach((p) => {
      if (p.name.toLowerCase().includes(q) || p.state.toLowerCase().includes(q) || p.wildlife.some((w) => w.toLowerCase().includes(q))) {
        results.push({
          category: 'National Park / Wildlife Reserve',
          title: p.name,
          subtitle: `${p.state} • ${p.wildlife.slice(0, 2).join(', ')}`,
          id: p.id,
          actionType: 'national-park',
        });
      }
    });

    // 3. Search Heritage Destinations & Cultural Shadows
    heritageDestinations.forEach((d) => {
      if (
        d.name.toLowerCase().includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.culturalShadow.hiddenLayer.toLowerCase().includes(q)
      ) {
        results.push({
          category: 'Destination / Cultural Shadow',
          title: d.name,
          subtitle: `${d.location} • ${d.type}`,
          id: d.id,
          actionType: 'destination',
        });
      }
    });

    // 4. Search Festivals
    allAnnualFestivals.forEach((f) => {
      if (f.name.toLowerCase().includes(q) || f.state.toLowerCase().includes(q) || f.culturalMeaning.toLowerCase().includes(q)) {
        results.push({
          category: `Festival (${f.month})`,
          title: f.name,
          subtitle: `${f.state} • ${f.approximateSeason}`,
          id: f.id,
          actionType: 'festival',
        });
      }
    });

    // 5. Search Circuits
    tourismCircuits.forEach((c) => {
      if (c.name.toLowerCase().includes(q) || c.route.some((r) => r.toLowerCase().includes(q))) {
        results.push({
          category: 'Tourism Circuit',
          title: c.name,
          subtitle: `Route: ${c.route.join(' → ')}`,
          id: c.id,
          actionType: 'circuit',
        });
      }
    });

    return results.slice(0, 8);
  }, [query, isConversational]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 sm:pt-28 bg-navy-dark/85 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-2xl bg-navy-card border border-ivory/15 rounded-sm shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Search Bar */}
        <div className="p-4 bg-navy-dark flex items-center gap-3 border-b border-ivory/10">
          <span className="text-ivory/40 text-lg">🔍</span>
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search 28 States, 8 UTs, National Parks, Varanasi, Circuits, Holi..."
            className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-ivory/30 focus:outline-none font-body"
          />
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-navy-card border border-ivory/10 text-xs text-ivory/50 hover:text-white"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-96 overflow-y-auto p-2">
          {/* If query looks conversational, recommend Bharat AI directly */}
          {isConversational && query.trim() && (
            <div className="p-4 rounded bg-navy-dark/90 border border-saffron/30 m-2 flex items-center justify-between">
              <div>
                <span className="text-[9px] uppercase font-heading text-saffron tracking-widest block font-semibold">
                  AI Travel Intelligence Detected
                </span>
                <p className="text-xs text-ivory/80 font-body mt-0.5">
                  &ldquo;{query}&rdquo; is best answered by Bharat AI companion.
                </p>
              </div>
              <button
                onClick={() => {
                  if (onAskAI) onAskAI(query);
                  onClose();
                }}
                className="btn-primary text-[10px] !py-2 !px-4 shrink-0"
              >
                Ask Bharat AI →
              </button>
            </div>
          )}

          {searchResults.length > 0 ? (
            <div className="space-y-1">
              {searchResults.map((res, i) => (
                <button
                  key={`${res.id}-${i}`}
                  onClick={() => {
                    if (onSelectResult) onSelectResult(res.actionType, res.id);
                    onClose();
                    const target =
                      res.actionType === 'state' || res.actionType === 'destination'
                        ? 'explore'
                        : res.actionType === 'national-park'
                        ? 'wildlife'
                        : res.actionType === 'festival'
                        ? 'festival-calendar'
                        : 'circuits';
                    document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left p-3 rounded-sm hover:bg-navy-dark transition-colors flex items-center justify-between group"
                >
                  <div>
                    <span className="text-[9px] uppercase font-heading text-saffron tracking-widest block mb-0.5">
                      {res.category}
                    </span>
                    <span className="font-heading text-sm text-white font-medium block">
                      {res.title}
                    </span>
                    <span className="text-xs text-ivory/50 font-body">
                      {res.subtitle}
                    </span>
                  </div>
                  <span className="text-xs text-ivory/30 group-hover:text-saffron group-hover:translate-x-1 transition-all">
                    Explore →
                  </span>
                </button>
              ))}
            </div>
          ) : query.trim() && !isConversational ? (
            <div className="p-8 text-center text-xs text-ivory/40 font-body">
              No direct matches found. Try searching &apos;Rajasthan&apos;, &apos;Kaziranga&apos;, &apos;Lucknow&apos;, &apos;Durga Puja&apos;, or &apos;Ramayana&apos;.
            </div>
          ) : !query.trim() ? (
            <div className="p-6 text-center text-xs text-ivory/40 font-body">
              <span className="text-gold uppercase font-heading tracking-wider block mb-2 font-semibold">
                Popular National Searches
              </span>
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {['Uttar Pradesh', 'Kaziranga National Park', 'Lucknow Chowk', 'Varanasi Ghats', 'Lathmar Holi', 'Ramayana Circuit'].map((item) => (
                  <button
                    key={item}
                    onClick={() => setQuery(item)}
                    className="px-2.5 py-1 rounded bg-navy-dark text-[10px] text-ivory/60 hover:text-saffron border border-ivory/5 font-heading"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
}
