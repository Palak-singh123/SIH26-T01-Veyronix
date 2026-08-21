'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PassportStats {
  destinationsExplored: string[];
  shadowsRevealed: string[];
  storiesWatched: string[];
  festivalsExperienced: string[];
  mementosCollected: string[];
  badges: string[];
}

interface PassportContextType {
  stats: PassportStats;
  exploreDestination: (id: string) => void;
  revealShadow: (id: string) => void;
  watchStory: (id: string) => void;
  experienceFestival: (id: string) => void;
  collectMemento: (id: string) => void;
  isMementoCollected: (id: string) => boolean;
  totalExperiencesCount: number;
  unlockedBadgesCount: number;
  newBadgeAlert: string | null;
  dismissBadgeAlert: () => void;
}

const defaultStats: PassportStats = {
  destinationsExplored: ['Lucknow', 'Varanasi'],
  shadowsRevealed: ['Taj Mahal & Agra Complex', 'Sacred Ghats & Kashi Vishwanath'],
  storiesWatched: ['Varanasi Ghats Documentary'],
  festivalsExperienced: ['Lathmar Holi'],
  mementosCollected: ['rumi-darwaza-miniature'],
  badges: ['HERITAGE EXPLORER', 'CULTURAL STORYTELLER'],
};

const PassportContext = createContext<PassportContextType | undefined>(undefined);

export function PassportProvider({ children }: { children: React.ReactNode }) {
  const [stats, setStats] = useState<PassportStats>(defaultStats);
  const [newBadgeAlert, setNewBadgeAlert] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('bharat_passport_stats');
      if (saved) {
        setStats(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Could not load passport stats from storage', e);
    }
  }, []);

  const saveStats = (newStats: PassportStats) => {
    setStats(newStats);
    try {
      localStorage.setItem('bharat_passport_stats', JSON.stringify(newStats));
    } catch (e) {
      console.warn('Could not save passport stats to storage', e);
    }
  };

  const checkBadgeUnlocks = (updated: PassportStats) => {
    const badges = [...updated.badges];
    let newlyUnlocked: string | null = null;

    if (updated.destinationsExplored.length >= 3 && !badges.includes('BHARAT EXPLORER')) {
      badges.push('BHARAT EXPLORER');
      newlyUnlocked = 'BHARAT EXPLORER';
    }
    if (updated.mementosCollected.length >= 2 && !badges.includes('CRAFT DISCOVERER')) {
      badges.push('CRAFT DISCOVERER');
      newlyUnlocked = 'CRAFT DISCOVERER';
    }
    if (updated.festivalsExperienced.length >= 1 && !badges.includes('FESTIVAL VOYAGER')) {
      badges.push('FESTIVAL VOYAGER');
      newlyUnlocked = 'FESTIVAL VOYAGER';
    }

    if (newlyUnlocked) {
      setNewBadgeAlert(newlyUnlocked);
    }
    return badges;
  };

  const exploreDestination = (id: string) => {
    if (!stats.destinationsExplored.includes(id)) {
      const updated = {
        ...stats,
        destinationsExplored: [...stats.destinationsExplored, id],
      };
      updated.badges = checkBadgeUnlocks(updated);
      saveStats(updated);
    }
  };

  const revealShadow = (id: string) => {
    if (!stats.shadowsRevealed.includes(id)) {
      const updated = {
        ...stats,
        shadowsRevealed: [...stats.shadowsRevealed, id],
      };
      updated.badges = checkBadgeUnlocks(updated);
      saveStats(updated);
    }
  };

  const watchStory = (id: string) => {
    if (!stats.storiesWatched.includes(id)) {
      const updated = {
        ...stats,
        storiesWatched: [...stats.storiesWatched, id],
      };
      updated.badges = checkBadgeUnlocks(updated);
      saveStats(updated);
    }
  };

  const experienceFestival = (id: string) => {
    if (!stats.festivalsExperienced.includes(id)) {
      const updated = {
        ...stats,
        festivalsExperienced: [...stats.festivalsExperienced, id],
      };
      updated.badges = checkBadgeUnlocks(updated);
      saveStats(updated);
    }
  };

  const collectMemento = (id: string) => {
    if (stats.mementosCollected.includes(id)) {
      const updated = {
        ...stats,
        mementosCollected: stats.mementosCollected.filter((mId) => mId !== id),
      };
      saveStats(updated);
    } else {
      const updated = {
        ...stats,
        mementosCollected: [...stats.mementosCollected, id],
      };
      updated.badges = checkBadgeUnlocks(updated);
      saveStats(updated);
    }
  };

  const isMementoCollected = (id: string) => stats.mementosCollected.includes(id);

  const totalExperiencesCount =
    stats.destinationsExplored.length +
    stats.shadowsRevealed.length +
    stats.storiesWatched.length +
    stats.festivalsExperienced.length +
    stats.mementosCollected.length;

  const unlockedBadgesCount = stats.badges.length;

  const dismissBadgeAlert = () => setNewBadgeAlert(null);

  return (
    <PassportContext.Provider
      value={{
        stats,
        exploreDestination,
        revealShadow,
        watchStory,
        experienceFestival,
        collectMemento,
        isMementoCollected,
        totalExperiencesCount,
        unlockedBadgesCount,
        newBadgeAlert,
        dismissBadgeAlert,
      }}
    >
      {children}
    </PassportContext.Provider>
  );
}

export function usePassport() {
  const context = useContext(PassportContext);
  if (!context) {
    throw new Error('usePassport must be used within a PassportProvider');
  }
  return context;
}
