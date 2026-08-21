'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface TravelCompanion {
  name: string;
  age: string;
  relationship: string;
}

export interface UserProfile {
  name: string;
  age: string;
  country: string;
  address: string;
  preferredLanguage: string;
  travelInterests: string[];
  favouriteDestinations: string[];
  bio: string;
  foodPreferences: string[];
  travelGroup: 'Solo' | 'Couple' | 'Family' | 'Friends / Group';
  numberOfTravellers: number;
  companions: TravelCompanion[];
  avatarUrl: string;
}

export interface UserJourney {
  id: string;
  name: string;
  duration: string;
  destinations: string[];
  travelStyle: string;
  status: 'Planned' | 'In Progress' | 'Completed';
  season: string;
  notes?: string;
  createdAt: string;
}

export interface UserReview {
  id: string;
  targetType: 'guide' | 'destination' | 'feedback';
  targetTitle: string;
  rating: number;
  date: string;
  comment: string;
}

interface UserProfileContextType {
  profile: UserProfile;
  updateProfile: (updated: Partial<UserProfile>) => void;
  journeys: UserJourney[];
  addJourney: (journey: Omit<UserJourney, 'id' | 'createdAt'>) => void;
  removeJourney: (id: string) => void;
  updateJourneyStatus: (id: string, status: UserJourney['status']) => void;
  reviews: UserReview[];
  addReview: (review: Omit<UserReview, 'id' | 'date'>) => void;
  removeReview: (id: string) => void;
  resetToDefaultProfile: () => void;
}

const defaultProfile: UserProfile = {
  name: 'Aarav Sharma',
  age: '28',
  country: 'India',
  address: 'Civil Lines, Prayagraj, Uttar Pradesh',
  preferredLanguage: 'English',
  travelInterests: ['Heritage & Architecture', 'Cultural Shadows', 'Artisan Crafts', 'Spiritual Sanctuaries'],
  favouriteDestinations: ['Varanasi', 'Lucknow', 'Ayodhya', 'Hampi'],
  bio: 'Passionate cultural voyager exploring ancient temple architecture, living handloom craft traditions, and sacred river ghats across Bharat.',
  foodPreferences: ['Vegetarian', 'Regional Awadhi & Banarasi Cuisine', 'Traditional Street Food'],
  travelGroup: 'Family',
  numberOfTravellers: 4,
  companions: [
    { name: 'Priya Sharma', age: '27', relationship: 'Spouse' },
    { name: 'Ramesh Sharma', age: '58', relationship: 'Father' },
    { name: 'Sunita Sharma', age: '54', relationship: 'Mother' },
  ],
  avatarUrl: '/images/user-avatar.png',
};

const defaultJourneys: UserJourney[] = [
  {
    id: 'journey-kashi-ayodhya',
    name: 'Sacred Ganga & Saryu Heritage Trail',
    duration: '4 Days / 3 Nights',
    destinations: ['Varanasi (Kashi)', 'Sarnath', 'Ayodhya'],
    travelStyle: 'Spiritual, Architectural & Cultural Shadows',
    status: 'Planned',
    season: 'Autumn / Kartik Purnima',
    notes: 'Morning Subah-e-Banaras raagas, Kashi Vishwanath corridor, and Saryu Deepotsav Aarti.',
    createdAt: '2026-08-15',
  },
  {
    id: 'journey-awadh-nawabs',
    name: 'Imperial Awadh & Living Crafts Expedition',
    duration: '3 Days / 2 Nights',
    destinations: ['Lucknow', 'Chunar', 'Vindhyachal'],
    travelStyle: 'Heritage, Handicrafts & Culinary Discovery',
    status: 'Completed',
    season: 'Winter',
    notes: 'Explored Bara Imambara Bhool Bhulaiya, Chowk Zardozi master weavers, and Chunar Fort.',
    createdAt: '2026-06-20',
  },
];

const defaultReviews: UserReview[] = [
  {
    id: 'review-1',
    targetType: 'guide',
    targetTitle: 'Pt. Rameshwar Shastri (Senior Varanasi Sanskrit Guide)',
    rating: 5,
    date: '2026-07-10',
    comment: 'Exceptional scholar who explained the Vedic astronomical significance of Man Mandir observatory and the 3000-year history of the Ganga Ghats.',
  },
  {
    id: 'review-2',
    targetType: 'destination',
    targetTitle: 'Bara Imambara & Bhool Bhulaiya (Lucknow)',
    rating: 5,
    date: '2026-06-22',
    comment: 'The unsupported vaulted ceiling and acoustic whispering galleries are an engineering marvel of 18th-century Awadh.',
  },
];

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [journeys, setJourneys] = useState<UserJourney[]>(defaultJourneys);
  const [reviews, setReviews] = useState<UserReview[]>(defaultReviews);

  // Load from LocalStorage
  useEffect(() => {
    try {
      const savedProfile = localStorage.getItem('bharat_user_profile');
      if (savedProfile) {
        setProfile(JSON.parse(savedProfile));
      }
      const savedJourneys = localStorage.getItem('bharat_user_journeys');
      if (savedJourneys) {
        setJourneys(JSON.parse(savedJourneys));
      }
      const savedReviews = localStorage.getItem('bharat_user_reviews');
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      }
    } catch (e) {
      console.warn('Could not load user data from localStorage', e);
    }
  }, []);

  const updateProfile = (updated: Partial<UserProfile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updated };
      try {
        localStorage.setItem('bharat_user_profile', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not persist profile', e);
      }
      return next;
    });
  };

  const addJourney = (journey: Omit<UserJourney, 'id' | 'createdAt'>) => {
    const newJourney: UserJourney = {
      ...journey,
      id: `journey-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
    };
    setJourneys((prev) => {
      const next = [newJourney, ...prev];
      try {
        localStorage.setItem('bharat_user_journeys', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not persist journeys', e);
      }
      return next;
    });
  };

  const removeJourney = (id: string) => {
    setJourneys((prev) => {
      const next = prev.filter((j) => j.id !== id);
      try {
        localStorage.setItem('bharat_user_journeys', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not persist journeys', e);
      }
      return next;
    });
  };

  const updateJourneyStatus = (id: string, status: UserJourney['status']) => {
    setJourneys((prev) => {
      const next = prev.map((j) => (j.id === id ? { ...j, status } : j));
      try {
        localStorage.setItem('bharat_user_journeys', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not persist journeys', e);
      }
      return next;
    });
  };

  const addReview = (review: Omit<UserReview, 'id' | 'date'>) => {
    const newReview: UserReview = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews((prev) => {
      const next = [newReview, ...prev];
      try {
        localStorage.setItem('bharat_user_reviews', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not persist reviews', e);
      }
      return next;
    });
  };

  const removeReview = (id: string) => {
    setReviews((prev) => {
      const next = prev.filter((r) => r.id !== id);
      try {
        localStorage.setItem('bharat_user_reviews', JSON.stringify(next));
      } catch (e) {
        console.warn('Could not persist reviews', e);
      }
      return next;
    });
  };

  const resetToDefaultProfile = () => {
    setProfile(defaultProfile);
    setJourneys(defaultJourneys);
    setReviews(defaultReviews);
    try {
      localStorage.setItem('bharat_user_profile', JSON.stringify(defaultProfile));
      localStorage.setItem('bharat_user_journeys', JSON.stringify(defaultJourneys));
      localStorage.setItem('bharat_user_reviews', JSON.stringify(defaultReviews));
    } catch (e) {
      console.warn('Could not reset profile in localStorage', e);
    }
  };

  return (
    <UserProfileContext.Provider
      value={{
        profile,
        updateProfile,
        journeys,
        addJourney,
        removeJourney,
        updateJourneyStatus,
        reviews,
        addReview,
        removeReview,
        resetToDefaultProfile,
      }}
    >
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
