'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface BookmarkItem {
  id: string;
  type: 'destination' | 'circuit' | 'festival' | 'memento' | 'national-park';
  title: string;
  subtitle: string;
  image: string;
  savedAt: string;
}

interface BookmarksContextType {
  bookmarks: BookmarkItem[];
  toggleBookmark: (item: Omit<BookmarkItem, 'savedAt'>) => void;
  isBookmarked: (id: string) => boolean;
  totalBookmarksCount: number;
}

const BookmarksContext = createContext<BookmarksContextType | undefined>(undefined);

const BOOKMARKS_STORAGE_KEY = 'bharat_bharman_bookmarks_v1';

export function BookmarksProvider({ children }: { children: React.ReactNode }) {
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (stored) {
        setBookmarks(JSON.parse(stored));
      } else {
        // Initial sample saved items
        setBookmarks([
          {
            id: 'lucknow-rumi',
            type: 'destination',
            title: 'Rumi Darwaza & Bara Imambara',
            subtitle: 'Lucknow, Uttar Pradesh',
            image: '/images/lucknow.jpg',
            savedAt: '2026-08-20',
          },
          {
            id: 'varanasi-ghats',
            type: 'destination',
            title: 'Kashi Vishwanath & 84 Sacred Ghats',
            subtitle: 'Varanasi, Uttar Pradesh',
            image: '/images/varanasi.jpg',
            savedAt: '2026-08-20',
          },
        ]);
      }
    } catch (e) {
      console.error('Failed to load bookmarks', e);
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(bookmarks));
      } catch (e) {
        console.error('Failed to save bookmarks', e);
      }
    }
  }, [bookmarks, isLoaded]);

  const toggleBookmark = (item: Omit<BookmarkItem, 'savedAt'>) => {
    setBookmarks((prev) => {
      const exists = prev.some((b) => b.id === item.id);
      if (exists) {
        return prev.filter((b) => b.id !== item.id);
      } else {
        return [
          ...prev,
          {
            ...item,
            savedAt: new Date().toISOString().split('T')[0],
          },
        ];
      }
    });
  };

  const isBookmarked = (id: string) => {
    return bookmarks.some((b) => b.id === id);
  };

  return (
    <BookmarksContext.Provider
      value={{
        bookmarks,
        toggleBookmark,
        isBookmarked,
        totalBookmarksCount: bookmarks.length,
      }}
    >
      {children}
    </BookmarksContext.Provider>
  );
}

export function useBookmarks() {
  const context = useContext(BookmarksContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarksProvider');
  }
  return context;
}
