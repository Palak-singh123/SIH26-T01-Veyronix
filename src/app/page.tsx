'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import DestinationsMegaMenu from '@/components/DestinationsMegaMenu';
import Hero from '@/components/Hero';
import SideActions from '@/components/SideActions';
import StoryIntro from '@/components/StoryIntro';
import InteractiveIndiaMap from '@/components/InteractiveIndiaMap';
import CulturalShadows from '@/components/CulturalShadows';
import TourismCircuits from '@/components/TourismCircuits';
import IndiaThroughTheLens from '@/components/IndiaThroughTheLens';
import BharatMementos from '@/components/BharatMementos';
import FestivalCalendar from '@/components/FestivalCalendar';
import WildBharat from '@/components/WildBharat';
import BeyondThePostcard from '@/components/BeyondThePostcard';
import SmartTravelSection from '@/components/SmartTravelSection';
import ResponsibleTourism from '@/components/ResponsibleTourism';
import FinalCTA from '@/components/FinalCTA';
import Footer from '@/components/Footer';

// Modals & Cultural Ecosystem Overlays
import BharatAIModal from '@/components/BharatAIModal';
import CulturalPassportModal from '@/components/CulturalPassportModal';
import MyBharatModal from '@/components/MyBharatModal';
import GlobalSearch from '@/components/GlobalSearch';
import DocumentaryModal from '@/components/DocumentaryModal';
import DestinationExperienceModal from '@/components/DestinationExperienceModal';
import SanctuaryModal from '@/components/SanctuaryModal';
import FestivalModal from '@/components/FestivalModal';
import WebsiteFeedbackModal from '@/components/WebsiteFeedbackModal';
import GuidesDirectoryModal from '@/components/GuidesDirectoryModal';
import ContactModal from '@/components/ContactModal';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import { ItineraryPlan, defaultItineraries } from '@/data/gisCoordinates';

export default function Home() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [isAIPlannerOpen, setIsAIPlannerOpen] = useState(false);
  const [isPassportOpen, setIsPassportOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isGuidesOpen, setIsGuidesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedDestId, setSelectedDestId] = useState<string | null>(null);
  const [selectedSanctuaryId, setSelectedSanctuaryId] = useState<string | null>(null);
  const [selectedFestivalId, setSelectedFestivalId] = useState<string | null>(null);
  const [activePlan, setActivePlan] = useState<ItineraryPlan>(defaultItineraries['lucknow-3day']);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* ── 00: Sticky Transparent / Solid National Navigation ── */}
      <Navbar
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* ── 00: Interactive Destinations Mega Menu ───────────── */}
      <DestinationsMegaMenu
        isOpen={isMegaMenuOpen}
        onClose={() => setIsMegaMenuOpen(false)}
        onSelectState={() => scrollToSection('interactive-map')}
        onSelectDestination={(destId) => setSelectedDestId(destId)}
        onSelectPark={(parkId) => setSelectedSanctuaryId(parkId)}
      />

      {/* ── 00: Vertical Edge Side Actions ───────────────────── */}
      <SideActions
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        onScrollToShadows={() => scrollToSection('cultural-shadows')}
      />

      {/* ── 01: Full-Screen Cinematic Video Hero with Sound ──── */}
      <Hero />

      {/* ── 02: Editorial Narrative: India is Not One Destination ── */}
      <div id="discover">
        <StoryIntro />
      </div>

      {/* ── 03: Interactive India Map (Destinations, Parks, Shadows) ── */}
      <InteractiveIndiaMap
        onSelectDestination={(destId) => setSelectedDestId(destId)}
        onSelectPark={(parkId) => setSelectedSanctuaryId(parkId)}
        onRevealShadow={() => scrollToSection('cultural-shadows')}
      />

      {/* ── 04: Signature Feature: Cultural Shadows ─────────── */}
      <CulturalShadows />

      {/* ── 05: Journeys Through Bharat (Thematic Circuits & AI Routes) ── */}
      <TourismCircuits
        onPlanWithAI={(circuitName) => setIsAIPlannerOpen(true)}
        onSelectCity={(city) => setSelectedDestId(city.toLowerCase())}
      />

      {/* ── 06: India Through the Lens (Documentary Heritage Stories) ── */}
      <IndiaThroughTheLens
        onWatchStory={(docId) => setSelectedDocId(docId)}
        onSelectLocation={(loc) => setSelectedDestId(loc.toLowerCase())}
      />

      {/* ── 07: Bharat Mementos (Authentic Cultural Keepsakes & Artisans) ── */}
      <BharatMementos />

      {/* ── 08: India in Season (Annual 12-Month Festival Discovery) ── */}
      <FestivalCalendar
        onSelectFestival={(id) => setSelectedFestivalId(id)}
      />

      {/* ── 09: Wild Bharat (National Parks & Protected Sanctuaries) ── */}
      <WildBharat
        onSelectSanctuary={(id) => setSelectedSanctuaryId(id)}
      />

      {/* ── 10: Beyond the Postcard (Hidden Waterfalls, Caves & Forts) ── */}
      <BeyondThePostcard
        onSelectDestination={(destId) => setSelectedDestId(destId)}
      />

      {/* ── 11: Plan Smart (24x7 Tourist Helplines & Climate Guide) ── */}
      <SmartTravelSection />

      {/* ── 12: Ethical & Responsible Tourism ───────────────── */}
      <ResponsibleTourism />

      {/* ── 13: Final Call to Exploration & Floating Chatbot Flow ── */}
      <FinalCTA
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        onScrollToCircuits={() => scrollToSection('circuits')}
        onScrollToShadows={() => scrollToSection('cultural-shadows')}
      />

      {/* Bharat AI Chatbot Button (Scrolls naturally with page) */}
      <FloatingAIChatButton onOpen={() => setIsAIPlannerOpen(true)} />

      <Footer
        onOpenMegaMenu={() => setIsMegaMenuOpen(true)}
        onOpenAIPlanner={() => setIsAIPlannerOpen(true)}
        onOpenPassport={() => setIsPassportOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenFeedback={() => setIsFeedbackOpen(true)}
        onOpenGuides={() => setIsGuidesOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* ─────────────────────────────────────────────────────────────
          Interactive Modals & Ecosystem Intelligence Overlays
          ───────────────────────────────────────────────────────────── */}
      
      {/* 1. Bharat AI Travel Companion Chatbot */}
      <BharatAIModal
        isOpen={isAIPlannerOpen}
        onClose={() => setIsAIPlannerOpen(false)}
        onSelectItineraryOnMap={(plan) => setActivePlan(plan)}
      />

      {/* 2. My Bharat Cultural Passport Booklet */}
      <CulturalPassportModal
        isOpen={isPassportOpen}
        onClose={() => setIsPassportOpen(false)}
      />

      {/* 3. My Bharat Saved Bookmarks Ledger */}
      <MyBharatModal
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
      />

      {/* 4. Universal Global Search */}
      <GlobalSearch
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectResult={(type, id) => {
          if (type === 'destination') {
            setSelectedDestId(id);
          } else if (type === 'national-park') {
            setSelectedSanctuaryId(id);
          } else if (type === 'festival') {
            setSelectedFestivalId(id);
          }
        }}
        onAskAI={() => {
          setIsAIPlannerOpen(true);
        }}
      />

      {/* 5. "Watch the Story" Cinema Player */}
      <DocumentaryModal
        storyId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />

      {/* 6. Destination Deep-Dive Modal */}
      <DestinationExperienceModal
        destinationId={selectedDestId}
        onClose={() => setSelectedDestId(null)}
        onWatchDocumentary={(docId) => setSelectedDocId(docId)}
        onPlanWithAI={() => {
          setIsAIPlannerOpen(true);
        }}
      />

      {/* 7. Protected Sanctuary & National Park Deep-Dive Modal */}
      <SanctuaryModal
        sanctuaryId={selectedSanctuaryId}
        onClose={() => setSelectedSanctuaryId(null)}
        onPlanWithAI={() => {
          setIsAIPlannerOpen(true);
        }}
        onViewOnMap={() => {
          scrollToSection('interactive-map');
        }}
      />

      {/* 8. Annual 12-Month Festival Experience Modal */}
      <FestivalModal
        festivalId={selectedFestivalId}
        onClose={() => setSelectedFestivalId(null)}
        onPlanWithAI={() => {
          setIsAIPlannerOpen(true);
        }}
        onViewOnMap={() => {
          scrollToSection('interactive-map');
        }}
      />

      {/* 9. Website Feedback Modal */}
      <WebsiteFeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />

      {/* 10. Guides of Bharat Directory & Review Modal */}
      <GuidesDirectoryModal
        isOpen={isGuidesOpen}
        onClose={() => setIsGuidesOpen(false)}
        onWatchStory={(docId) => setSelectedDocId(docId)}
      />

      {/* 11. Contact Bharat Bharman Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
