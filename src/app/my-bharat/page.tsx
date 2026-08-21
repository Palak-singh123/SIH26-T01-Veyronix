'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { useUserProfile, TravelCompanion, UserJourney, UserProfile } from '@/context/UserProfileContext';
import { usePassport } from '@/context/PassportContext';
import { useBookmarks } from '@/context/BookmarksContext';
import { useLanguage } from '@/context/LanguageContext';
import { bharatMementos } from '@/data/mementosData';

export default function MyBharatDashboardPage() {
  const { language } = useLanguage();
  const {
    profile,
    updateProfile,
    journeys,
    removeJourney,
    updateJourneyStatus,
    addJourney,
    reviews,
    addReview,
    removeReview,
    resetToDefaultProfile,
  } = useUserProfile();

  const {
    stats,
    isMementoCollected,
    collectMemento,
    totalExperiencesCount,
  } = usePassport();

  const { bookmarks, toggleBookmark, totalBookmarksCount } = useBookmarks();

  // Modals & Navigation States
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string>('');
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isAddJourneyOpen, setIsAddJourneyOpen] = useState(false);
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    'overview' | 'journeys' | 'saved' | 'passport' | 'shadows' | 'mementos' | 'ai' | 'reviews' | 'profile'
  >('overview');
  const [journeyFilter, setJourneyFilter] = useState<'All' | 'Planned' | 'In Progress' | 'Completed'>('All');

  // Edit Profile Form State
  const [editFormData, setEditFormData] = useState({ ...profile });
  const [newCompanion, setNewCompanion] = useState<TravelCompanion>({ name: '', age: '', relationship: '' });

  // New Journey Form State
  const [newJourneyForm, setNewJourneyForm] = useState({
    name: '',
    duration: '3 Days / 2 Nights',
    destinations: '',
    travelStyle: 'Heritage & Cultural Discovery',
    status: 'Planned' as 'Planned' | 'In Progress' | 'Completed',
    season: 'Autumn',
    notes: '',
  });

  // New Review Form State
  const [newReviewForm, setNewReviewForm] = useState({
    targetType: 'guide' as 'guide' | 'destination' | 'feedback',
    targetTitle: '',
    rating: 5,
    comment: '',
  });

  // Open AI Planner with custom context
  const handleOpenAIWithPrompt = (prompt: string) => {
    const contextualPrompt = `Context: User is ${profile.name} (${profile.travelGroup} of ${profile.numberOfTravellers} travellers, interested in ${profile.travelInterests.join(', ')}). Query: ${prompt}`;
    setAiInitialPrompt(contextualPrompt);
    setIsAIOpen(true);
  };

  // Profile Save
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(editFormData);
    setIsEditProfileOpen(false);
  };

  // Add Companion to Form
  const handleAddCompanion = () => {
    if (newCompanion.name.trim()) {
      setEditFormData((prev) => ({
        ...prev,
        companions: [...prev.companions, newCompanion],
        numberOfTravellers: prev.numberOfTravellers + 1,
      }));
      setNewCompanion({ name: '', age: '', relationship: '' });
    }
  };

  const handleRemoveCompanion = (index: number) => {
    setEditFormData((prev) => ({
      ...prev,
      companions: prev.companions.filter((_, i) => i !== index),
      numberOfTravellers: Math.max(1, prev.numberOfTravellers - 1),
    }));
  };

  // Add New Journey
  const handleCreateJourney = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newJourneyForm.name.trim()) return;
    addJourney({
      name: newJourneyForm.name,
      duration: newJourneyForm.duration,
      destinations: newJourneyForm.destinations.split(',').map((d) => d.trim()).filter(Boolean),
      travelStyle: newJourneyForm.travelStyle,
      status: newJourneyForm.status,
      season: newJourneyForm.season,
      notes: newJourneyForm.notes,
    });
    setNewJourneyForm({
      name: '',
      duration: '3 Days / 2 Nights',
      destinations: '',
      travelStyle: 'Heritage & Cultural Discovery',
      status: 'Planned',
      season: 'Autumn',
      notes: '',
    });
    setIsAddJourneyOpen(false);
  };

  // Add New Review
  const handleCreateReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewForm.targetTitle.trim() || !newReviewForm.comment.trim()) return;
    addReview({
      targetType: newReviewForm.targetType,
      targetTitle: newReviewForm.targetTitle,
      rating: Number(newReviewForm.rating),
      comment: newReviewForm.comment,
    });
    setNewReviewForm({
      targetType: 'guide',
      targetTitle: '',
      rating: 5,
      comment: '',
    });
    setIsAddReviewOpen(false);
  };

  // Saved Bookmarks Filter
  const savedDestinations = bookmarks.filter((b) => b.type === 'destination');
  const savedFestivals = bookmarks.filter((b) => b.type === 'festival');

  // Filtered Journeys
  const filteredJourneys =
    journeyFilter === 'All' ? journeys : journeys.filter((j) => j.status === journeyFilter);

  // Mementos collection status
  const collectedMementosList = bharatMementos.filter((m) => isMementoCollected(m.id));

  // Available All Badges
  const allAvailableBadges = [
    {
      id: 'HERITAGE EXPLORER',
      icon: '🏛️',
      title: 'Heritage Explorer',
      desc: 'Explored 3+ living heritage monuments across India',
      isUnlocked: stats.destinationsExplored.length >= 2,
    },
    {
      id: 'CULTURAL SHADOW HUNTER',
      icon: '✦',
      title: 'Cultural Shadow Hunter',
      desc: 'Uncovered 2+ hidden artisan and folklore layers',
      isUnlocked: stats.shadowsRevealed.length >= 1,
    },
    {
      id: 'CRAFT DISCOVERER',
      icon: '🧵',
      title: 'Craft Discoverer',
      desc: 'Collected authentic generational handmade mementos',
      isUnlocked: stats.mementosCollected.length >= 1,
    },
    {
      id: 'FESTIVAL VOYAGER',
      icon: '🎭',
      title: 'Festival Voyager',
      desc: 'Experienced sacred annual celebrations & folk fairs',
      isUnlocked: stats.festivalsExperienced.length >= 1,
    },
    {
      id: 'BHARAT EXPLORER',
      icon: '🧭',
      title: 'Bharat Explorer',
      desc: 'Explored multiple cultural thematic circuits',
      isUnlocked: stats.destinationsExplored.length >= 3,
    },
    {
      id: 'SACRED PILGRIM',
      icon: '🪔',
      title: 'Sacred Pilgrim',
      desc: 'Visited holy confluence ghats and Jyotirlinga shrines',
      isUnlocked: true,
    },
  ];

  // Continue Exploring Smart Next Steps
  const continueExploringPaths = [
    {
      exploredPlace: 'Varanasi & Kashi Ghats',
      nextTitle: 'Ayodhya & Prayagraj Confluence',
      circuit: 'Ramayana & Ganga Circuit',
      description: 'Continue from Dashashwamedh Ghat up the sacred river highway to Triveni Sangam and Shri Ram Janmabhoomi',
      link: '/destinations/ayodhya',
      shadowLink: '/cultural-shadows/ayodhya',
    },
    {
      exploredPlace: 'Lucknow Awadhi Heritage',
      nextTitle: 'Chunar Fort & Dudhwa Tiger Haven',
      circuit: 'Awadh & Terai Wildlife',
      description: 'Journey from Rumi Darwaza into the ancient cliffside ramparts of Chunar and the tall grasslands of Katarniaghat',
      link: '/destinations/lucknow',
      shadowLink: '/cultural-shadows/lucknow',
    },
    {
      exploredPlace: 'Taj Mahal & Agra',
      nextTitle: 'Bateshwar 101 Shiva Temples & Chambal',
      circuit: 'Braj & Yamuna Heritage',
      description: 'Explore the 101 crescent river shrines of Bateshwar and the pristine wildlife gorge of National Chambal Sanctuary',
      link: '/destinations/agra',
      shadowLink: '/cultural-shadows/agra',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#031527] text-ivory select-none font-body">
      <Navbar onOpenAIPlanner={() => handleOpenAIWithPrompt('Help me plan my next Bharat journey')} />

      <main className="flex-1 pt-24 pb-20">
        {/* ── 1. LUXURY TRAVEL JOURNAL HERO / HEADER ────────── */}
        <section className="relative px-6 py-10 sm:py-14 bg-gradient-to-b from-[#020d1a] via-[#031527] to-[#041a31] border-b border-ivory/10 overflow-hidden">
          {/* Ambient Lighting Motifs */}
          <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-saffron/10 blur-[130px] pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 rounded-full bg-gold/10 blur-[130px] pointer-events-none" />

          <div className="max-w-[1440px] mx-auto relative z-10">
            {/* Breadcrumb & Status */}
            <div className="flex items-center justify-between gap-4 mb-4 text-xs font-heading uppercase tracking-widest text-gold">
              <div className="flex items-center gap-2">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <span>/</span>
                <span className="text-white font-semibold">My Bharat Dashboard</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
                <span className="text-[10px] text-ivory/70 font-semibold tracking-wider">
                  Verified Cultural Journal
                </span>
              </div>
            </div>

            {/* Profile Greeting Card */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 p-6 sm:p-8 rounded-xl bg-navy-card/70 border border-ivory/15 shadow-2xl backdrop-blur-md">
              {/* Left: Avatar & Identity */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-gold shadow-lg bg-navy-dark shrink-0 flex items-center justify-center text-3xl">
                  <span>🇮🇳</span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-saffron/20 border border-saffron/40 text-saffron text-[10px] font-heading font-semibold uppercase tracking-wider">
                      Namaste
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-gold/20 border border-gold/40 text-gold text-[10px] font-heading font-semibold uppercase tracking-wider">
                      {profile.country}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-green/20 border border-green/40 text-green-light text-[10px] font-heading font-semibold uppercase tracking-wider">
                      {profile.travelGroup} ({profile.numberOfTravellers} {profile.numberOfTravellers === 1 ? 'Traveller' : 'Travellers'})
                    </span>
                  </div>

                  <h1 className="font-heading text-2xl sm:text-4xl font-light text-white tracking-wide uppercase">
                    {profile.name} <span className="text-gold font-semibold">• Your Bharat Journey</span>
                  </h1>

                  <p className="text-xs sm:text-sm text-ivory/70 italic font-body max-w-2xl">
                    &ldquo;Every journey adds a new story to your Bharat&rdquo;
                  </p>

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[10px] text-ivory/50 font-heading uppercase">Interests:</span>
                    {profile.travelInterests.slice(0, 3).map((interest) => (
                      <span
                        key={interest}
                        className="px-2 py-0.5 rounded bg-white/5 border border-ivory/10 text-[9px] font-heading uppercase text-ivory/80"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Quick Action Controls */}
              <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
                <button
                  onClick={() => {
                    setEditFormData({ ...profile });
                    setIsEditProfileOpen(true);
                  }}
                  className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 flex-1 lg:flex-none text-center shadow-lg"
                >
                  ✎ Edit Profile
                </button>
                <button
                  onClick={() => handleOpenAIWithPrompt(`Plan a 3-day cultural heritage itinerary for my group of ${profile.numberOfTravellers} interested in ${profile.travelInterests.join(', ')}`)}
                  className="btn-secondary text-xs uppercase tracking-wider !py-3 !px-5 flex-1 lg:flex-none text-center"
                >
                  🤖 Plan with AI
                </button>
              </div>
            </div>

            {/* ── Real-Time Cultural Stats Strip ───────────────── */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-6">
              <div className="p-4 rounded-lg bg-navy-card/50 border border-ivory/10 text-center space-y-1 hover:border-gold/40 transition-colors">
                <span className="text-lg">🗺️</span>
                <div className="font-heading text-xl sm:text-2xl font-semibold text-white">
                  {Math.min(28, stats.destinationsExplored.length + 2)} / 28
                </div>
                <div className="text-[9px] uppercase font-heading tracking-wider text-ivory/60">
                  States Explored
                </div>
              </div>

              <div className="p-4 rounded-lg bg-navy-card/50 border border-ivory/10 text-center space-y-1 hover:border-saffron/40 transition-colors">
                <span className="text-lg">🏛️</span>
                <div className="font-heading text-xl sm:text-2xl font-semibold text-saffron">
                  {stats.destinationsExplored.length + savedDestinations.length}
                </div>
                <div className="text-[9px] uppercase font-heading tracking-wider text-ivory/60">
                  Destinations
                </div>
              </div>

              <div className="p-4 rounded-lg bg-navy-card/50 border border-ivory/10 text-center space-y-1 hover:border-gold/40 transition-colors">
                <span className="text-lg">✦</span>
                <div className="font-heading text-xl sm:text-2xl font-semibold text-gold">
                  {stats.shadowsRevealed.length}
                </div>
                <div className="text-[9px] uppercase font-heading tracking-wider text-ivory/60">
                  Cultural Shadows
                </div>
              </div>

              <div className="p-4 rounded-lg bg-navy-card/50 border border-ivory/10 text-center space-y-1 hover:border-green/40 transition-colors">
                <span className="text-lg">🧵</span>
                <div className="font-heading text-xl sm:text-2xl font-semibold text-green-light">
                  {stats.mementosCollected.length}
                </div>
                <div className="text-[9px] uppercase font-heading tracking-wider text-ivory/60">
                  Mementos
                </div>
              </div>

              <div className="p-4 rounded-lg bg-navy-card/50 border border-ivory/10 text-center space-y-1 hover:border-saffron/40 transition-colors">
                <span className="text-lg">🎭</span>
                <div className="font-heading text-xl sm:text-2xl font-semibold text-white">
                  {stats.festivalsExperienced.length + savedFestivals.length}
                </div>
                <div className="text-[9px] uppercase font-heading tracking-wider text-ivory/60">
                  Festivals
                </div>
              </div>

              <div className="p-4 rounded-lg bg-navy-card/50 border border-ivory/10 text-center space-y-1 hover:border-gold/40 transition-colors">
                <span className="text-lg">🎖️</span>
                <div className="font-heading text-xl sm:text-2xl font-semibold text-gold">
                  {allAvailableBadges.filter((b) => b.isUnlocked).length} / {allAvailableBadges.length}
                </div>
                <div className="text-[9px] uppercase font-heading tracking-wider text-ivory/60">
                  Badges Earned
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. INTERNAL SECTION NAVIGATION TABS ─────────── */}
        <section className="sticky top-[60px] z-30 bg-[#020e1a]/95 backdrop-blur-lg border-b border-ivory/10 py-3 px-6 shadow-md">
          <div className="max-w-[1440px] mx-auto flex items-center gap-2 overflow-x-auto no-scrollbar">
            {[
              { id: 'overview', label: 'Overview', icon: '🏛️' },
              { id: 'journeys', label: `My Journeys (${journeys.length})`, icon: '🧭' },
              { id: 'saved', label: `Saved (${totalBookmarksCount})`, icon: '🔖' },
              { id: 'passport', label: 'Cultural Passport', icon: '🛂' },
              { id: 'shadows', label: `Shadows (${stats.shadowsRevealed.length})`, icon: '✦' },
              { id: 'mementos', label: `Mementos (${stats.mementosCollected.length})`, icon: '🧵' },
              { id: 'ai', label: 'AI Recommendations', icon: '🤖' },
              { id: 'reviews', label: `My Reviews (${reviews.length})`, icon: '⭐' },
              { id: 'profile', label: 'Profile Details', icon: '👤' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-heading uppercase tracking-wider whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-gold text-navy-dark font-bold shadow-md'
                    : 'bg-white/5 text-ivory/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* ── 3. MAIN DASHBOARD CONTENT AREA ──────────────── */}
        <div className="max-w-[1440px] mx-auto px-6 py-10 space-y-16">
          {/* SECTION: CONTINUE EXPLORING */}
          {(activeTab === 'overview' || activeTab === 'journeys') && (
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-widest font-semibold block">
                    Intelligent Pathway Progression
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    Continue <span className="text-gold font-semibold">Your Journey</span>
                  </h2>
                </div>
                <span className="text-xs text-ivory/50">
                  Curated next steps based on your active exploration history
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {continueExploringPaths.map((path, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl bg-navy-card border border-ivory/15 hover:border-gold/50 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-heading uppercase text-saffron font-semibold">
                        <span>Explored: {path.exploredPlace}</span>
                        <span className="text-gold">→ Next Leg</span>
                      </div>

                      <h3 className="font-heading text-xl text-white font-medium group-hover:text-gold transition-colors">
                        {path.nextTitle}
                      </h3>

                      <p className="text-xs text-ivory/70 font-body leading-relaxed">
                        {path.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                      <Link
                        href={path.link}
                        className="btn-primary text-[11px] uppercase !py-2.5 flex-1 text-center font-heading"
                      >
                        Explore Destination →
                      </Link>
                      <Link
                        href={path.shadowLink}
                        className="px-3 py-2.5 rounded bg-navy-dark border border-ivory/20 text-[10px] uppercase font-heading text-gold hover:text-white"
                        title="View Cultural Shadow"
                      >
                        ✦ Shadow
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION: MY JOURNEYS */}
          {(activeTab === 'overview' || activeTab === 'journeys') && (
            <section id="journeys" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-widest font-semibold block">
                    Travel Itinerary Ledger
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    My <span className="text-saffron font-semibold">Journeys & Circuits</span>
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {(['All', 'Planned', 'In Progress', 'Completed'] as const).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setJourneyFilter(filter)}
                      className={`px-3 py-1 rounded text-xs font-heading uppercase transition-all ${
                        journeyFilter === filter
                          ? 'bg-saffron text-white font-semibold shadow'
                          : 'bg-navy-card text-ivory/60 hover:text-white'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                  <button
                    onClick={() => setIsAddJourneyOpen(true)}
                    className="btn-primary text-xs uppercase !py-1.5 !px-3.5 ml-2 font-heading"
                  >
                    + Add Journey
                  </button>
                </div>
              </div>

              {filteredJourneys.length === 0 ? (
                <div className="p-10 rounded-xl bg-navy-card/40 border border-ivory/10 text-center space-y-4 max-w-xl mx-auto my-6">
                  <span className="text-4xl block">🧭</span>
                  <h3 className="font-heading text-xl text-white uppercase">Your Next Bharat Journey is Waiting</h3>
                  <p className="font-body text-xs text-ivory/60 leading-relaxed">
                    You have no journeys in this status. Generate a complete multi-day heritage itinerary tailored to your travel group with Bharat AI.
                  </p>
                  <button
                    onClick={() => handleOpenAIWithPrompt('Synthesize a 4-day customized cultural journey through Uttar Pradesh & Rajasthan')}
                    className="btn-primary text-xs uppercase !py-2.5 !px-6 font-heading"
                  >
                    Plan with Bharat AI →
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredJourneys.map((journey) => (
                    <div
                      key={journey.id}
                      className="p-6 rounded-xl bg-navy-card border border-ivory/15 hover:border-gold/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded text-[9px] font-heading font-semibold uppercase bg-saffron/20 text-saffron">
                            ⏱ {journey.duration} • {journey.season}
                          </span>
                          <span
                            className={`px-2.5 py-0.5 rounded text-[9px] font-heading font-bold uppercase ${
                              journey.status === 'Completed'
                                ? 'bg-green/20 text-green-light border border-green/30'
                                : journey.status === 'In Progress'
                                ? 'bg-gold/20 text-gold border border-gold/30'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                            }`}
                          >
                            {journey.status}
                          </span>
                        </div>

                        <h3 className="font-heading text-xl text-white font-medium">
                          {journey.name}
                        </h3>

                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="text-[10px] text-ivory/50 font-heading uppercase">Route:</span>
                          {journey.destinations.map((dest, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-white/5 border border-ivory/10 text-[10px] text-ivory/90 font-medium"
                            >
                              📍 {dest}
                            </span>
                          ))}
                        </div>

                        {journey.notes && (
                          <p className="text-xs text-ivory/70 font-body leading-relaxed bg-navy-dark/60 p-3 rounded border border-ivory/5">
                            {journey.notes}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() =>
                              handleOpenAIWithPrompt(`Provide a detailed day-wise breakdown and local tips for my journey: "${journey.name}" covering ${journey.destinations.join(', ')}`)
                            }
                            className="btn-primary text-[10px] uppercase !py-2 !px-3 font-heading"
                          >
                            View Breakdown (AI)
                          </button>
                          <select
                            value={journey.status}
                            onChange={(e) =>
                              updateJourneyStatus(journey.id, e.target.value as UserJourney['status'])
                            }
                            className="px-2 py-1.5 rounded bg-navy-dark border border-ivory/20 text-[10px] font-heading uppercase text-ivory focus:outline-none"
                          >
                            <option value="Planned">Status: Planned</option>
                            <option value="In Progress">Status: In Progress</option>
                            <option value="Completed">Status: Completed</option>
                          </select>
                        </div>

                        <button
                          onClick={() => removeJourney(journey.id)}
                          className="text-[10px] text-ivory/40 hover:text-red-400 font-heading uppercase tracking-wider"
                          title="Remove Journey"
                        >
                          ✕ Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* SECTION: SAVED DESTINATIONS */}
          {(activeTab === 'overview' || activeTab === 'saved') && (
            <section id="saved" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-gold tracking-widest font-semibold block">
                    Personal Saved Landmarks
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    Saved <span className="text-gold font-semibold">Destinations & Festivals</span> ({totalBookmarksCount})
                  </h2>
                </div>

                <Link
                  href="/destinations"
                  className="btn-secondary text-xs uppercase tracking-wider !py-2 !px-4"
                >
                  Browse All Destinations →
                </Link>
              </div>

              {totalBookmarksCount === 0 ? (
                <div className="p-10 rounded-xl bg-navy-card/40 border border-ivory/10 text-center space-y-4 max-w-xl mx-auto my-6">
                  <span className="text-4xl block">🔖</span>
                  <h3 className="font-heading text-xl text-white uppercase">Your Bharat Journey Starts Here</h3>
                  <p className="font-body text-xs text-ivory/60 leading-relaxed">
                    You have not bookmarked any destinations or annual festivals yet. Explore the 29 official UP tourism destinations, national parks, and thematic circuits to curate your personalized wishlist.
                  </p>
                  <Link href="/destinations" className="btn-primary text-xs uppercase !py-2.5 !px-6 inline-block">
                    Explore Destinations
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bookmarks.map((item) => (
                    <div
                      key={item.id}
                      className="p-5 rounded-xl bg-navy-card border border-ivory/15 hover:border-gold/50 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-heading uppercase text-saffron font-semibold">
                            {item.type === 'festival' ? '🗓️ Festival' : '📍 Destination'} • {item.subtitle}
                          </span>
                          <button
                            onClick={() => toggleBookmark(item)}
                            className="text-xs text-ivory/40 hover:text-red-400 font-heading uppercase"
                            title="Remove Bookmark"
                          >
                            ✕
                          </button>
                        </div>

                        <h3 className="font-heading text-lg text-white font-medium">{item.title}</h3>
                        <p className="text-xs text-ivory/60 font-body">
                          Saved to your personal offline browser journal.
                        </p>
                      </div>

                      <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                        <Link
                          href={item.type === 'festival' ? `/festivals/${item.id}` : `/destinations/${item.id}`}
                          className="btn-primary text-[11px] uppercase !py-2 flex-1 text-center font-heading"
                        >
                          Explore Details →
                        </Link>
                        {item.type === 'destination' && (
                          <Link
                            href={`/cultural-shadows/${item.id}`}
                            className="px-3 py-2 rounded bg-navy-dark border border-ivory/20 text-[10px] uppercase font-heading text-gold hover:text-white"
                          >
                            ✦ Shadow
                          </Link>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* SECTION: DIGITAL CULTURAL PASSPORT */}
          {(activeTab === 'overview' || activeTab === 'passport') && (
            <section id="passport" className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-gold tracking-widest font-semibold block">
                    Official Digital Credential
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    My Bharat <span className="text-gold font-semibold">Cultural Passport</span>
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-gold font-semibold uppercase font-heading">
                    {stats.destinationsExplored.length + 2} / 28 States & UTs Explored
                  </span>
                </div>
              </div>

              {/* Passport Progress Bar */}
              <div className="space-y-2 p-6 rounded-xl bg-navy-card/60 border border-ivory/15">
                <div className="flex justify-between text-xs font-heading uppercase text-ivory/80">
                  <span>National Exploration Journey Progress</span>
                  <span className="text-gold font-bold">
                    {Math.round(((stats.destinationsExplored.length + 2) / 28) * 100)}% Completed
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-navy-dark border border-ivory/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-saffron via-gold to-green transition-all duration-1000"
                    style={{
                      width: `${Math.min(100, Math.max(15, Math.round(((stats.destinationsExplored.length + 2) / 28) * 100)))}%`,
                    }}
                  />
                </div>
              </div>

              {/* ── Verified Passport Stamps ──────────────────── */}
              <div className="space-y-4">
                <h3 className="font-heading text-lg text-white font-medium uppercase tracking-wider">
                  Verified Cultural Stamps ({stats.destinationsExplored.length + 3})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {[
                    { title: 'LUCKNOW', subtitle: 'Awadh Architecture', state: 'Uttar Pradesh', date: 'AUG 2026', color: 'border-saffron/60 text-saffron' },
                    { title: 'VARANASI', subtitle: 'Sacred Ganga Ghats', state: 'Uttar Pradesh', date: 'AUG 2026', color: 'border-gold/60 text-gold' },
                    { title: 'AYODHYA', subtitle: 'Saryu Riverfront', state: 'Uttar Pradesh', date: 'AUG 2026', color: 'border-green/60 text-green-light' },
                    { title: 'AGRA', subtitle: 'Mughal Wonder', state: 'Uttar Pradesh', date: 'AUG 2026', color: 'border-saffron/60 text-saffron' },
                    { title: 'PRAYAGRAJ', subtitle: 'Triveni Sangam', state: 'Uttar Pradesh', date: 'JUL 2026', color: 'border-gold/60 text-gold' },
                    { title: 'SARNATH', subtitle: 'Dharmachakra', state: 'Uttar Pradesh', date: 'JUL 2026', color: 'border-green/60 text-green-light' },
                  ].map((stamp, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl bg-[#020e1a] border-2 border-dashed ${stamp.color} flex flex-col items-center justify-center text-center space-y-1 shadow-lg transform rotate-${idx % 2 === 0 ? '1' : '-1'}`}
                    >
                      <span className="text-xl">🪔</span>
                      <span className="font-heading text-xs font-bold uppercase tracking-widest block">
                        {stamp.title}
                      </span>
                      <span className="text-[8px] text-ivory/60 uppercase font-heading">
                        {stamp.subtitle}
                      </span>
                      <span className="text-[7px] px-1.5 py-0.2 rounded bg-white/5 font-mono text-ivory/40">
                        {stamp.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Earned Badges Showcase ───────────────────── */}
              <div className="space-y-4 pt-4 border-t border-ivory/10">
                <h3 className="font-heading text-lg text-white font-medium uppercase tracking-wider">
                  Badges & Accolades
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allAvailableBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className={`p-5 rounded-xl border flex items-center gap-4 transition-all ${
                        badge.isUnlocked
                          ? 'bg-navy-card border-gold/40 shadow-lg'
                          : 'bg-navy-card/30 border-ivory/10 opacity-50'
                      }`}
                    >
                      <div
                        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 border ${
                          badge.isUnlocked
                            ? 'bg-gold/20 border-gold text-gold shadow-md'
                            : 'bg-white/5 border-ivory/20 text-ivory/40'
                        }`}
                      >
                        {badge.icon}
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-heading text-sm font-semibold uppercase text-white">
                            {badge.title}
                          </h4>
                          {badge.isUnlocked ? (
                            <span className="text-[8px] px-1.5 py-0.2 rounded bg-green/20 text-green-light font-bold">
                              UNLOCKED
                            </span>
                          ) : (
                            <span className="text-[8px] px-1.5 py-0.2 rounded bg-white/10 text-ivory/40 font-bold">
                              LOCKED
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-ivory/60 font-body leading-relaxed">
                          {badge.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* SECTION: CULTURAL SHADOWS */}
          {(activeTab === 'overview' || activeTab === 'shadows') && (
            <section id="shadows" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-widest font-semibold block">
                    Living Artisan & Oral History Layers
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    My <span className="text-saffron font-semibold">Cultural Shadows</span> ({stats.shadowsRevealed.length})
                  </h2>
                </div>

                <Link
                  href="/cultural-shadows"
                  className="btn-secondary text-xs uppercase tracking-wider !py-2 !px-4"
                >
                  Explore All Cultural Shadows →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    id: 'taj-mahal',
                    title: 'Taj Mahal: The Living Lapidary Guilds',
                    location: 'Taj Ganj, Agra',
                    mainstream: 'Iconic white marble mausoleum built by Shah Jahan in 1631',
                    shadow: 'Generational stone cutters and Parchin Kari masters who still grind lapis lazuli, jasper, and malachite by hand in the narrow alleys of Taj Ganj.',
                  },
                  {
                    id: 'rumi-darwaza',
                    title: 'Rumi Darwaza: Badshahi Brick & Stucco Masons',
                    location: 'Husainabad, Lucknow',
                    mainstream: '60-foot monumental gateway built in 1784 by Nawab Asaf-ud-Daula',
                    shadow: 'The famine-relief wage tradition where nobleman and laborer worked side-by-side sculpting lime-surkhi plaster without outside stone.',
                  },
                  {
                    id: 'kashi-ghats',
                    title: 'Varanasi Ghats: 20-Generation Manjhi Lineages',
                    location: 'Assi to Manikarnika Ghats, Varanasi',
                    mainstream: 'Ancient riverfront stone ghats and evening Ganga Maha Aarti',
                    shadow: 'The boatmen communities (Manjhis) and Dom Raja custodians of the 3,000-year continuous sacred cremation flame.',
                  },
                ].map((shadow) => (
                  <div
                    key={shadow.id}
                    className="p-6 rounded-xl bg-navy-card border border-ivory/15 hover:border-saffron/40 transition-all flex flex-col justify-between space-y-4 shadow-xl"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-heading uppercase text-saffron font-semibold">
                        <span>📍 {shadow.location}</span>
                        <span className="text-gold">✦ Living Shadow</span>
                      </div>
                      <h3 className="font-heading text-lg text-white font-medium">
                        {shadow.title}
                      </h3>
                      <div className="p-3 rounded bg-navy-dark/60 border border-ivory/5 text-xs text-ivory/70 space-y-1">
                        <p className="text-ivory/40 text-[10px] uppercase font-heading font-semibold">
                          Living Folk Tradition:
                        </p>
                        <p>{shadow.shadow}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                      <Link
                        href={`/cultural-shadows/${shadow.id}`}
                        className="btn-primary text-[11px] uppercase !py-2.5 flex-1 text-center font-heading"
                      >
                        View Full Cultural Shadow →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION: BHARAT MEMENTOS */}
          {(activeTab === 'overview' || activeTab === 'mementos') && (
            <section id="mementos" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-gold tracking-widest font-semibold block">
                    Authentic Artisan Keepsakes
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    My <span className="text-gold font-semibold">Bharat Mementos</span> ({collectedMementosList.length || 1})
                  </h2>
                </div>

                <Link
                  href="/experiences"
                  className="btn-secondary text-xs uppercase tracking-wider !py-2 !px-4"
                >
                  Discover Mementos →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(collectedMementosList.length > 0 ? collectedMementosList : bharatMementos.slice(0, 3)).map((memento) => (
                  <div
                    key={memento.id}
                    className="p-5 rounded-xl bg-navy-card border border-gold/30 hover:border-gold transition-all flex flex-col justify-between space-y-4 shadow-xl"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-heading uppercase text-gold font-semibold">
                        <span>📍 {memento.destination}</span>
                        <span className="px-2 py-0.5 rounded bg-gold/20 text-gold text-[9px] font-bold">
                          IN PASSPORT
                        </span>
                      </div>

                      <h3 className="font-heading text-lg text-white font-medium">
                        {memento.name}
                      </h3>

                      <p className="text-xs text-ivory/70 font-body leading-relaxed">
                        {memento.culturalSignificance}
                      </p>

                      <div className="text-[10px] font-heading uppercase text-ivory/50">
                        Artisan Guild: <span className="text-white font-medium">{memento.artisanCommunity}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                      <button
                        onClick={() => collectMemento(memento.id)}
                        className="btn-secondary text-[10px] uppercase !py-2 flex-1 text-center font-heading"
                      >
                        {isMementoCollected(memento.id) ? '✓ Collected in Passport' : 'Collect Memento'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* SECTION: AI RECOMMENDATIONS */}
          {(activeTab === 'overview' || activeTab === 'ai') && (
            <section id="ai-recommendations" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-widest font-semibold block">
                    Personalized by Profile & Travel Group
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    Recommended <span className="text-saffron font-semibold">For You</span>
                  </h2>
                </div>

                <button
                  onClick={() => handleOpenAIWithPrompt(`Synthesize a personalized travel itinerary recommendation based on my group (${profile.travelGroup}, ${profile.numberOfTravellers} persons) and interests (${profile.travelInterests.join(', ')})`)}
                  className="btn-primary text-xs uppercase tracking-wider !py-2 !px-4"
                >
                  🤖 Generate Custom Itinerary
                </button>
              </div>

              {/* Personalized Cards based on Real Profile State */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-xl bg-navy-card border border-ivory/15 hover:border-saffron/40 transition-all space-y-4 shadow-xl">
                  <span className="px-2.5 py-0.5 rounded text-[9px] font-heading font-semibold uppercase bg-saffron/20 text-saffron">
                    Because you love Heritage
                  </span>
                  <h3 className="font-heading text-xl text-white font-medium">
                    Orchha, Khajuraho & Bundelkhand Fortresses
                  </h3>
                  <p className="text-xs text-ivory/70 font-body leading-relaxed">
                    16th-century Bundela cenotaphs on the Betwa river, erotic temple stone carvings of Khajuraho, and the rock fortress of Jhansi.
                  </p>
                  <button
                    onClick={() => handleOpenAIWithPrompt('Plan a 3-day Bundelkhand Heritage trip covering Orchha and Jhansi')}
                    className="btn-secondary text-[11px] uppercase !py-2 w-full font-heading"
                  >
                    Plan with AI →
                  </button>
                </div>

                <div className="p-6 rounded-xl bg-navy-card border border-ivory/15 hover:border-gold/40 transition-all space-y-4 shadow-xl">
                  <span className="px-2.5 py-0.5 rounded text-[9px] font-heading font-semibold uppercase bg-gold/20 text-gold">
                    Travelling with {profile.travelGroup} ({profile.numberOfTravellers} People)
                  </span>
                  <h3 className="font-heading text-xl text-white font-medium">
                    Ayodhya Ram Ki Paidi & Saryu Riverfront
                  </h3>
                  <p className="text-xs text-ivory/70 font-body leading-relaxed">
                    Serene family-friendly illuminated ghats, musical laser fountain shows, Hanuman Garhi blessings, and sweet peda prasadam.
                  </p>
                  <Link
                    href="/destinations/ayodhya"
                    className="btn-primary text-[11px] uppercase !py-2 w-full text-center block font-heading"
                  >
                    Explore Ayodhya →
                  </Link>
                </div>

                <div className="p-6 rounded-xl bg-navy-card border border-ivory/15 hover:border-green/40 transition-all space-y-4 shadow-xl">
                  <span className="px-2.5 py-0.5 rounded text-[9px] font-heading font-semibold uppercase bg-green/20 text-green-light">
                    Because you explored Varanasi
                  </span>
                  <h3 className="font-heading text-xl text-white font-medium">
                    Sarnath Buddhist Monasteries & Deer Park
                  </h3>
                  <p className="text-xs text-ivory/70 font-body leading-relaxed">
                    Just 10km north of Kashi: The ancient Dhamek Stupa, original Lion Capital of Ashoka, and peaceful Thai & Tibetan monasteries.
                  </p>
                  <Link
                    href="/destinations/sarnath"
                    className="btn-secondary text-[11px] uppercase !py-2 w-full text-center block font-heading"
                  >
                    Explore Sarnath →
                  </Link>
                </div>
              </div>

              {/* 5 Quick AI Action Triggers */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-4">
                <button
                  onClick={() => handleOpenAIWithPrompt('Plan my next complete cultural trip for next weekend')}
                  className="p-3 rounded-lg bg-navy-card border border-ivory/10 hover:border-saffron/50 text-center space-y-1 text-xs font-heading uppercase text-ivory hover:text-white"
                >
                  <span className="text-base block">✈️</span>
                  <span>Plan My Next Trip</span>
                </button>
                <button
                  onClick={() => handleOpenAIWithPrompt('Surprise me with an offbeat hidden cultural jewel in India that tourists rarely visit')}
                  className="p-3 rounded-lg bg-navy-card border border-ivory/10 hover:border-gold/50 text-center space-y-1 text-xs font-heading uppercase text-ivory hover:text-white"
                >
                  <span className="text-base block">💎</span>
                  <span>Discover Offbeat</span>
                </button>
                <button
                  onClick={() => handleOpenAIWithPrompt('What are the top 3 living cultural shadows and artisan traditions in Uttar Pradesh?')}
                  className="p-3 rounded-lg bg-navy-card border border-ivory/10 hover:border-saffron/50 text-center space-y-1 text-xs font-heading uppercase text-ivory hover:text-white"
                >
                  <span className="text-base block">✦</span>
                  <span>Find Shadows</span>
                </button>
                <Link
                  href="/festivals"
                  className="p-3 rounded-lg bg-navy-card border border-ivory/10 hover:border-green/50 text-center space-y-1 text-xs font-heading uppercase text-ivory hover:text-white block"
                >
                  <span className="text-base block">🎭</span>
                  <span>Find Festivals</span>
                </Link>
                <Link
                  href="/guides"
                  className="p-3 rounded-lg bg-navy-card border border-ivory/10 hover:border-gold/50 text-center space-y-1 text-xs font-heading uppercase text-ivory hover:text-white block"
                >
                  <span className="text-base block">👥</span>
                  <span>Find a Guide</span>
                </Link>
              </div>
            </section>
          )}

          {/* SECTION: MY REVIEWS & FEEDBACK */}
          {(activeTab === 'overview' || activeTab === 'reviews') && (
            <section id="reviews" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-gold tracking-widest font-semibold block">
                    Community Reviews & Guide Feedback
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    My <span className="text-gold font-semibold">Reviews</span> ({reviews.length})
                  </h2>
                </div>

                <button
                  onClick={() => setIsAddReviewOpen(true)}
                  className="btn-primary text-xs uppercase tracking-wider !py-2 !px-4"
                >
                  + Write a Review
                </button>
              </div>

              {reviews.length === 0 ? (
                <div className="p-8 rounded-xl bg-navy-card/40 border border-ivory/10 text-center space-y-3 max-w-lg mx-auto">
                  <span className="text-3xl block">⭐</span>
                  <h4 className="font-heading text-base text-white uppercase">No Reviews Yet</h4>
                  <p className="text-xs text-ivory/60">
                    Share your experiences with certified guides and heritage landmarks to help fellow voyagers.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {reviews.map((review) => (
                    <div
                      key={review.id}
                      className="p-6 rounded-xl bg-navy-card border border-ivory/15 hover:border-gold/40 transition-all flex flex-col justify-between space-y-3 shadow-xl"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-gold text-sm font-semibold">
                            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                          </span>
                          <span className="text-[10px] text-ivory/50 font-mono">
                            {review.date}
                          </span>
                        </div>

                        <h4 className="font-heading text-base text-white font-medium">
                          {review.targetTitle}
                        </h4>

                        <p className="text-xs text-ivory/80 font-body leading-relaxed italic">
                          &ldquo;{review.comment}&rdquo;
                        </p>
                      </div>

                      <div className="pt-3 border-t border-ivory/10 flex justify-end">
                        <button
                          onClick={() => removeReview(review.id)}
                          className="text-[10px] text-ivory/40 hover:text-red-400 font-heading uppercase"
                        >
                          ✕ Delete Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* SECTION: FULL PROFILE DETAILS */}
          {(activeTab === 'overview' || activeTab === 'profile') && (
            <section id="profile" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-ivory/10 pb-4">
                <div>
                  <span className="text-[10px] uppercase font-heading text-saffron tracking-widest font-semibold block">
                    Traveller Profile & Credentials
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-white font-light uppercase">
                    Profile <span className="text-saffron font-semibold">& Preferences</span>
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setEditFormData({ ...profile });
                      setIsEditProfileOpen(true);
                    }}
                    className="btn-primary text-xs uppercase tracking-wider !py-2 !px-4"
                  >
                    ✎ Edit Profile
                  </button>
                  <button
                    onClick={resetToDefaultProfile}
                    className="px-3 py-2 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory/50 hover:text-white"
                  >
                    Reset Demo
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="p-6 rounded-xl bg-navy-card border border-ivory/15 space-y-4 shadow-xl">
                  <h3 className="font-heading text-lg text-white font-medium uppercase tracking-wider border-b border-ivory/10 pb-2">
                    Personal Details
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-ivory/5">
                      <span className="text-ivory/50 uppercase font-heading">Full Name:</span>
                      <span className="text-white font-medium">{profile.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-ivory/5">
                      <span className="text-ivory/50 uppercase font-heading">Age:</span>
                      <span className="text-white font-medium">{profile.age} Years</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-ivory/5">
                      <span className="text-ivory/50 uppercase font-heading">Country:</span>
                      <span className="text-white font-medium">{profile.country}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-ivory/5">
                      <span className="text-ivory/50 uppercase font-heading">Home City / Region:</span>
                      <span className="text-white font-medium">{profile.address.split(',')[1] || profile.address}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-ivory/50 uppercase font-heading">Preferred Language:</span>
                      <span className="text-gold font-medium">{profile.preferredLanguage}</span>
                    </div>
                  </div>
                </div>

                {/* Travel Group & Companions */}
                <div className="p-6 rounded-xl bg-navy-card border border-ivory/15 space-y-4 shadow-xl">
                  <h3 className="font-heading text-lg text-white font-medium uppercase tracking-wider border-b border-ivory/10 pb-2">
                    Travel Group ({profile.travelGroup})
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-ivory/5">
                      <span className="text-ivory/50 uppercase font-heading">Total Members:</span>
                      <span className="text-green-light font-bold">{profile.numberOfTravellers} People</span>
                    </div>
                    <div className="space-y-2 pt-1">
                      <span className="text-ivory/50 uppercase font-heading block">Companions:</span>
                      {profile.companions.length > 0 ? (
                        profile.companions.map((comp, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between p-2 rounded bg-navy-dark/60 border border-ivory/5 text-xs"
                          >
                            <span className="font-medium text-white">{comp.name} ({comp.age}y)</span>
                            <span className="text-gold text-[10px] uppercase font-heading font-semibold">
                              {comp.relationship}
                            </span>
                          </div>
                        ))
                      ) : (
                        <p className="text-ivory/40 italic">Solo Voyager — No additional companions registered.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* ── 4. EDIT PROFILE MODAL ───────────────────────── */}
      <AnimatePresence>
        {isEditProfileOpen && (
          <div
            onClick={() => setIsEditProfileOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl max-h-[90vh] bg-[#031527] border-2 border-gold/50 rounded-xl shadow-2xl flex flex-col overflow-hidden text-ivory my-auto"
            >
              <div className="px-6 py-4 bg-navy-card border-b border-ivory/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">✎</span>
                  <h3 className="font-heading text-lg text-white font-semibold uppercase tracking-wider">
                    Edit Personal Profile & Preferences
                  </h3>
                </div>
                <button
                  onClick={() => setIsEditProfileOpen(false)}
                  className="w-8 h-8 rounded-full bg-navy border border-ivory/20 flex items-center justify-center text-ivory/60 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleSaveProfile} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ivory/70 font-heading uppercase mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/70 font-heading uppercase mb-1">Age *</label>
                    <input
                      type="number"
                      required
                      value={editFormData.age}
                      onChange={(e) => setEditFormData({ ...editFormData, age: e.target.value })}
                      className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ivory/70 font-heading uppercase mb-1">Country *</label>
                    <input
                      type="text"
                      required
                      value={editFormData.country}
                      onChange={(e) => setEditFormData({ ...editFormData, country: e.target.value })}
                      className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/70 font-heading uppercase mb-1">Preferred Language</label>
                    <select
                      value={editFormData.preferredLanguage}
                      onChange={(e) => setEditFormData({ ...editFormData, preferredLanguage: e.target.value })}
                      className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                    >
                      <option value="English">English</option>
                      <option value="Hindi">Hindi (हिन्दी)</option>
                      <option value="Bengali">Bengali (বাংলা)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-ivory/70 font-heading uppercase mb-1">Address / Home City (Private)</label>
                  <input
                    type="text"
                    value={editFormData.address}
                    onChange={(e) => setEditFormData({ ...editFormData, address: e.target.value })}
                    className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 font-heading uppercase mb-1">Bio / Journey Statement</label>
                  <textarea
                    rows={2}
                    value={editFormData.bio}
                    onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                    className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                  />
                </div>

                {/* Travel Group */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-ivory/70 font-heading uppercase mb-1">Travel Group</label>
                    <select
                      value={editFormData.travelGroup}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          travelGroup: e.target.value as UserProfile['travelGroup'],
                        })
                      }
                      className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                    >
                      <option value="Solo">Solo Voyager</option>
                      <option value="Couple">Couple</option>
                      <option value="Family">Family</option>
                      <option value="Friends / Group">Friends / Group</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-ivory/70 font-heading uppercase mb-1">Number of Travellers</label>
                    <input
                      type="number"
                      min={1}
                      value={editFormData.numberOfTravellers}
                      onChange={(e) =>
                        setEditFormData({
                          ...editFormData,
                          numberOfTravellers: Math.max(1, Number(e.target.value)),
                        })
                      }
                      className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                    />
                  </div>
                </div>

                {/* Companions Manager */}
                {(editFormData.travelGroup === 'Family' || editFormData.travelGroup === 'Friends / Group' || editFormData.travelGroup === 'Couple') && (
                  <div className="p-3 rounded bg-navy-dark/70 border border-ivory/10 space-y-2">
                    <span className="text-[10px] uppercase font-heading text-gold font-semibold block">
                      Manage Companions ({editFormData.companions.length})
                    </span>

                    <div className="space-y-1.5 max-h-28 overflow-y-auto">
                      {editFormData.companions.map((c, i) => (
                        <div key={i} className="flex items-center justify-between text-xs p-1.5 bg-navy-card rounded border border-ivory/5">
                          <span>{c.name} ({c.age}y) — {c.relationship}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveCompanion(i)}
                            className="text-red-400 text-xs px-1"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Name"
                        value={newCompanion.name}
                        onChange={(e) => setNewCompanion({ ...newCompanion, name: e.target.value })}
                        className="p-1.5 bg-navy-card border border-ivory/15 rounded text-xs text-white"
                      />
                      <input
                        type="number"
                        placeholder="Age"
                        value={newCompanion.age}
                        onChange={(e) => setNewCompanion({ ...newCompanion, age: e.target.value })}
                        className="p-1.5 bg-navy-card border border-ivory/15 rounded text-xs text-white"
                      />
                      <div className="flex gap-1">
                        <input
                          type="text"
                          placeholder="Relation"
                          value={newCompanion.relationship}
                          onChange={(e) => setNewCompanion({ ...newCompanion, relationship: e.target.value })}
                          className="p-1.5 bg-navy-card border border-ivory/15 rounded text-xs text-white flex-1"
                        />
                        <button
                          type="button"
                          onClick={handleAddCompanion}
                          className="px-2 py-1 bg-gold text-navy-dark font-bold rounded text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-ivory/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditProfileOpen(false)}
                    className="px-4 py-2 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs uppercase tracking-wider !py-2 !px-6 shadow"
                  >
                    Save Profile
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 5. ADD JOURNEY MODAL ───────────────────────── */}
      <AnimatePresence>
        {isAddJourneyOpen && (
          <div
            onClick={() => setIsAddJourneyOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#031527] border-2 border-saffron/50 rounded-xl shadow-2xl flex flex-col overflow-hidden text-ivory"
            >
              <div className="px-6 py-4 bg-navy-card border-b border-ivory/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧭</span>
                  <h3 className="font-heading text-base text-white font-semibold uppercase">
                    Add New Planned Journey
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddJourneyOpen(false)}
                  className="w-7 h-7 rounded-full bg-navy border border-ivory/20 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateJourney} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-ivory/70 font-heading uppercase mb-1">Journey Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Braj Holi & Yamuna Sacred Circuit"
                    value={newJourneyForm.name}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, name: e.target.value })}
                    className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-saffron focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-ivory/70 font-heading uppercase mb-1">Duration</label>
                    <input
                      type="text"
                      placeholder="e.g. 3 Days / 2 Nights"
                      value={newJourneyForm.duration}
                      onChange={(e) => setNewJourneyForm({ ...newJourneyForm, duration: e.target.value })}
                      className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-saffron focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-ivory/70 font-heading uppercase mb-1">Season</label>
                    <input
                      type="text"
                      placeholder="e.g. Spring / March"
                      value={newJourneyForm.season}
                      onChange={(e) => setNewJourneyForm({ ...newJourneyForm, season: e.target.value })}
                      className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-saffron focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-ivory/70 font-heading uppercase mb-1">Destinations (Comma Separated) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mathura, Vrindavan, Barsana, Govardhan"
                    value={newJourneyForm.destinations}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, destinations: e.target.value })}
                    className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-saffron focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 font-heading uppercase mb-1">Journey Notes & Highlights</label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Lathmar Holi at Barsana, evening Aarti at Vishram Ghat"
                    value={newJourneyForm.notes}
                    onChange={(e) => setNewJourneyForm({ ...newJourneyForm, notes: e.target.value })}
                    className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-saffron focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-ivory/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddJourneyOpen(false)}
                    className="px-4 py-2 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs uppercase tracking-wider !py-2 !px-6"
                  >
                    Add to Ledger
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 6. ADD REVIEW MODAL ───────────────────────── */}
      <AnimatePresence>
        {isAddReviewOpen && (
          <div
            onClick={() => setIsAddReviewOpen(false)}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-[#031527] border-2 border-gold/50 rounded-xl shadow-2xl flex flex-col overflow-hidden text-ivory"
            >
              <div className="px-6 py-4 bg-navy-card border-b border-ivory/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <h3 className="font-heading text-base text-white font-semibold uppercase">
                    Write Guide or Landmark Review
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddReviewOpen(false)}
                  className="w-7 h-7 rounded-full bg-navy border border-ivory/20 flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateReview} className="p-6 space-y-4 text-xs">
                <div>
                  <label className="block text-ivory/70 font-heading uppercase mb-1">Target Name (Guide / Landmark) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarnath Archaeological Museum or Guide Name"
                    value={newReviewForm.targetTitle}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, targetTitle: e.target.value })}
                    className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-ivory/70 font-heading uppercase mb-1">Rating</label>
                  <select
                    value={newReviewForm.rating}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, rating: Number(e.target.value) })}
                    className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                  >
                    <option value={5}>★★★★★ (5 Stars — Excellent)</option>
                    <option value={4}>★★★★☆ (4 Stars — Very Good)</option>
                    <option value={3}>★★★☆☆ (3 Stars — Good)</option>
                    <option value={2}>★★☆☆☆ (2 Stars — Fair)</option>
                    <option value={1}>★☆☆☆☆ (1 Star — Needs Improvement)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-ivory/70 font-heading uppercase mb-1">Review Comments *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share your authentic feedback and memories..."
                    value={newReviewForm.comment}
                    onChange={(e) => setNewReviewForm({ ...newReviewForm, comment: e.target.value })}
                    className="w-full p-2.5 rounded bg-navy-dark border border-ivory/20 text-white font-medium focus:border-gold focus:outline-none"
                  />
                </div>

                <div className="pt-3 border-t border-ivory/10 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsAddReviewOpen(false)}
                    className="px-4 py-2 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary text-xs uppercase tracking-wider !py-2 !px-6"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── 7. STICKY BHARAT AI CHATBOT & OVERLAYS ──────── */}
      <FloatingAIChatButton onOpen={() => handleOpenAIWithPrompt(`Help me plan my next trip for my group (${profile.travelGroup}, ${profile.numberOfTravellers} members)`)} />
      <BharatAIModal
        isOpen={isAIOpen}
        onClose={() => {
          setIsAIOpen(false);
          setAiInitialPrompt('');
        }}
      />
      <Footer onOpenAIPlanner={() => handleOpenAIWithPrompt('Help me plan my journey')} />
    </div>
  );
}
