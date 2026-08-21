'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useBookmarks } from '@/context/BookmarksContext';

interface MyBharatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MyBharatModal({ isOpen, onClose }: MyBharatModalProps) {
  const { bookmarks, toggleBookmark } = useBookmarks();

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl max-h-[85vh] bg-[#031527] border-2 border-gold/40 rounded-lg shadow-2xl flex flex-col overflow-hidden text-ivory my-auto"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-navy-card border-b border-ivory/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl">🔖</span>
            <div>
              <h3 className="font-heading text-lg text-white font-semibold tracking-wider uppercase">
                MY BHARAT — SAVED JOURNEYS
              </h3>
              <span className="text-[10px] text-ivory/50 font-body">
                {bookmarks.length} Saved Destinations, Experiences & Cultural Memories
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-navy border border-ivory/10 flex items-center justify-center text-ivory/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Saved List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {bookmarks.length > 0 ? (
            bookmarks.map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-sm bg-navy-card border border-ivory/10 flex items-center justify-between gap-4 group hover:border-saffron/40 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded overflow-hidden shrink-0 border border-ivory/10">
                    <Image src={b.image} alt={b.title} fill className="object-cover" />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase font-heading text-saffron tracking-widest block">
                      {b.type} • Saved {b.savedAt}
                    </span>
                    <h4 className="font-heading text-sm text-white font-medium">
                      {b.title}
                    </h4>
                    <span className="text-xs text-ivory/50 font-body">
                      {b.subtitle}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      onClose();
                      document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="btn-secondary text-[9px] !py-1.5 !px-3"
                  >
                    View →
                  </button>
                  <button
                    onClick={() => toggleBookmark(b)}
                    className="p-1.5 text-ivory/40 hover:text-red-400 text-xs"
                    title="Remove Bookmark"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-12 text-center text-ivory/40 font-body text-xs glass-navy rounded">
              No saved items yet. Explore destinations, circuits, and festivals across Bharat to save them here!
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 bg-navy-card border-t border-ivory/10 flex items-center justify-between text-xs text-ivory/50">
          <span>Personalized Offline-Cached Journey Ledger</span>
          <button onClick={onClose} className="btn-primary text-[9px] !py-1.5 !px-4">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
