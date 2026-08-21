'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { nationalParks, NationalPark } from '@/data/nationalParksData';

export interface SanctuaryDetail {
  id: string;
  name: string;
  location: string;
  state: string;
  importance: string;
  wildlife: string[];
  image: string;
  badge?: string;
  bestSeason?: string;
  landscape?: string;
  activities?: string[];
  guidelines?: string;
}

interface SanctuaryModalProps {
  sanctuaryId: string | null;
  onClose: () => void;
  onPlanWithAI?: (sanctuaryName: string) => void;
  onViewOnMap?: () => void;
}

export default function SanctuaryModal({
  sanctuaryId,
  onClose,
  onPlanWithAI,
  onViewOnMap,
}: SanctuaryModalProps) {
  if (!sanctuaryId) return null;

  // Search in national parks data or fallback
  const parkMatch = nationalParks.find(
    (p) =>
      p.id === sanctuaryId ||
      p.name.toLowerCase().includes(sanctuaryId.toLowerCase()) ||
      sanctuaryId.toLowerCase().includes(p.id)
  );

  // Custom data mapping
  const sanctuary: SanctuaryDetail = parkMatch
    ? {
        id: parkMatch.id,
        name: parkMatch.name,
        location: `${parkMatch.state}, ${parkMatch.region} India`,
        state: parkMatch.state,
        importance: parkMatch.tagline,
        wildlife: parkMatch.wildlife,
        image: parkMatch.heroImage,
        badge: parkMatch.tagline.includes('TX2') ? 'TX2 Global Award' : 'Protected Sanctuary',
        bestSeason: parkMatch.bestSeason,
        landscape: parkMatch.landscape,
        activities: parkMatch.activities,
        guidelines: parkMatch.responsibleGuidelines,
      }
    : sanctuaryId.includes('chambal')
    ? {
        id: 'chambal',
        name: 'National Chambal Sanctuary',
        location: 'Agra / Etawah, Uttar Pradesh',
        state: 'Uttar Pradesh',
        importance: 'India’s premier aquatic sanctuary for critically endangered Gharials, Red-crowned roofed turtles, and rare Gangetic river dolphins.',
        wildlife: ['Gharial (Fish-eating crocodile)', 'Gangetic River Dolphin', 'Mugger Crocodile', '8 Species of Freshwater Turtles', 'Indian Skimmer'],
        image: '/images/hero-bg.jpg',
        badge: 'Tri-State Protected Reserve',
        bestSeason: 'November to March',
        landscape: 'Pristine Chambal river ravine gorges, quiet sandbanks and mudflats',
        activities: ['Motorboat River Safari', 'Bird Watching on Sandbars', 'Ravine Eco-Treks'],
        guidelines: 'Boats must maintain a 30m distance from basking gharials and nesting sandbars. No plastic.',
      }
    : sanctuaryId.includes('pilibhit')
    ? {
        id: 'pilibhit',
        name: 'Pilibhit Tiger Reserve & Chuka Beach',
        location: 'Pilibhit, Uttar Pradesh',
        state: 'Uttar Pradesh',
        importance: 'Global TX2 Award winner for doubling its wild tiger population in record time. Sharda Sagar dam backwaters create a tranquil inland forest beach.',
        wildlife: ['Royal Bengal Tiger', 'Indian Leopard', 'Swamp Deer', 'Fishing Cat', 'Over 450 Bird Species'],
        image: '/images/hero-bg.jpg',
        badge: 'TX2 Award Winner',
        bestSeason: 'November to May',
        landscape: 'Sharda Sagar backwaters, dense Sal canopy, reed grasslands along Indo-Nepal border',
        activities: ['Chuka Beach Eco-Cottages', 'Jungle Jeep Safari', 'Sharda Canal Birding'],
        guidelines: 'Night driving is strictly prohibited in core tiger corridors.',
      }
    : sanctuaryId.includes('katarniaghat')
    ? {
        id: 'katarniaghat',
        name: 'Katarniaghat Wildlife Sanctuary',
        location: 'Bahraich, Uttar Pradesh',
        state: 'Uttar Pradesh',
        importance: 'Strategic Terai corridor connecting Dudhwa and Bardia National Park in Nepal. Celebrated for its tranquil Girwa River boating among swimming tigers and endangered Gharials.',
        wildlife: ['Gharial', 'Gangetic Dolphin', 'Royal Bengal Tiger', 'Indian Leopard', 'Swamp Deer', 'Otters'],
        image: '/images/hero-bg.jpg',
        badge: 'Terai Eco-Corridor',
        bestSeason: 'November to April',
        landscape: 'Girwa river wetlands, teak-sal forests, and lush Indo-Nepal border floodplains',
        activities: ['Girwa River Boating', 'Watchtower Wildlife Spotting', 'Jungle Jeep Safari'],
        guidelines: 'Boating is regulated by the Forest Department. Maintain silence near riverbanks.',
      }
    : {
        id: 'dudhwa',
        name: 'Dudhwa National Park & Tiger Reserve',
        location: 'Lakhimpur Kheri, Uttar Pradesh',
        state: 'Uttar Pradesh',
        importance: 'Vast Terai ecosystem home to Tigers, One-Horned Rhinoceros, and the rare Swamp Deer (Barasingha) amidst towering Sal canopies.',
        wildlife: ['Royal Bengal Tiger', 'Indian One-Horned Rhinoceros', 'Swamp Deer (Barasingha)', 'Hispid Hare', 'Bengal Florican'],
        image: '/images/hero-bg.jpg',
        badge: 'Terai Tiger Reserve',
        bestSeason: 'November to April',
        landscape: 'Vast alluvial floodplains, dense Sal forest and wetland lagoons',
        activities: ['Elephant-back Rhino Tracking', 'Open Gypsy Safari', 'Tharu Tribal Cultural Village'],
        guidelines: 'Support local Tharu indigenous guides and maintain silence on safari tracks.',
      };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl max-h-[90vh] bg-[#031527] border-2 border-green/50 rounded-lg shadow-2xl flex flex-col overflow-hidden text-ivory my-auto"
      >
        {/* Visual Hero Header */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
          <Image
            src={sanctuary.image}
            alt={sanctuary.name}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-navy-dark/80 border border-ivory/20 flex items-center justify-center text-white hover:bg-green transition-colors"
            aria-label="Close"
          >
            ✕
          </button>

          {/* Title Header */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="category-pill text-[9px] bg-navy-dark/90 border-green/40 text-green-light">
                🐾 {sanctuary.location}
              </span>
              {sanctuary.badge && (
                <span className="px-2.5 py-0.5 rounded bg-green text-white text-[8px] font-heading font-semibold uppercase tracking-wider shadow">
                  {sanctuary.badge}
                </span>
              )}
            </div>
            <h2 className="font-heading text-2xl sm:text-4xl text-white font-light">
              {sanctuary.name}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Importance & Overview */}
          <div>
            <span className="text-[10px] uppercase font-heading text-green tracking-widest block mb-2 font-semibold">
              Ecological Significance & Conservation
            </span>
            <p className="font-body text-xs sm:text-sm text-ivory/85 leading-relaxed">
              {sanctuary.importance}
            </p>
          </div>

          {/* Keystone Species */}
          <div className="p-4 rounded bg-navy-card border border-ivory/10 space-y-2.5">
            <span className="text-[10px] uppercase font-heading text-gold tracking-wider block font-semibold">
              Keystone Wildlife Species
            </span>
            <div className="flex flex-wrap gap-2">
              {sanctuary.wildlife.map((animal) => (
                <span
                  key={animal}
                  className="px-2.5 py-1 rounded bg-navy-dark text-xs text-ivory/90 border border-ivory/10 font-heading"
                >
                  🐾 {animal}
                </span>
              ))}
            </div>
          </div>

          {/* Landscape, Best Season & Activities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {sanctuary.landscape && (
              <div className="p-3.5 rounded bg-navy-card/60 border border-ivory/5">
                <span className="text-[9px] uppercase font-heading text-ivory/50 block mb-1 font-semibold">
                  Landscape & Habitat
                </span>
                <p className="text-xs text-ivory/70 font-body leading-relaxed">
                  {sanctuary.landscape}
                </p>
              </div>
            )}

            {sanctuary.bestSeason && (
              <div className="p-3.5 rounded bg-navy-card/60 border border-ivory/5">
                <span className="text-[9px] uppercase font-heading text-ivory/50 block mb-1 font-semibold">
                  Best Safari Season
                </span>
                <p className="text-xs text-green font-heading font-medium leading-relaxed">
                  ☀️ {sanctuary.bestSeason}
                </p>
              </div>
            )}
          </div>

          {/* Responsible Guidelines */}
          {sanctuary.guidelines && (
            <div className="p-3.5 rounded bg-green/10 border border-green/30 text-xs text-green-light font-body space-y-1">
              <span className="font-heading font-semibold uppercase tracking-wider text-[10px] block text-white">
                🌿 Responsible Wildlife & Eco-Tourism Rules:
              </span>
              <p>{sanctuary.guidelines}</p>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#031527] border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onPlanWithAI && (
              <button
                onClick={() => {
                  onPlanWithAI(sanctuary.name);
                  onClose();
                }}
                className="btn-primary text-[10px] !py-2 !px-4 flex items-center gap-1.5"
              >
                <span>🤖</span>
                <span>Plan Safari with AI</span>
              </button>
            )}

            {onViewOnMap && (
              <button
                onClick={() => {
                  onViewOnMap();
                  onClose();
                }}
                className="btn-secondary text-[10px] !py-2 !px-4 flex items-center gap-1.5"
              >
                <span>🗺️</span>
                <span>Focus on Interactive Map</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/national-parks"
              className="text-green-light hover:text-white font-heading uppercase text-[10px] underline tracking-wider"
            >
              Browse All National Parks →
            </Link>
            <button onClick={onClose} className="px-3 py-1 rounded bg-navy-card border border-ivory/20 text-xs text-ivory/70 hover:text-white font-heading">
              Close View
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
