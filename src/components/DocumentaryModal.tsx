'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePassport } from '@/context/PassportContext';

export interface DocumentaryStory {
  id: string;
  title: string;
  destination: string;
  duration: string;
  image: string;
  narrative: string;
  livingCulturePoints: string[];
}

export const sampleDocumentaries: Record<string, DocumentaryStory> = {
  varanasi: {
    id: 'doc-varanasi',
    title: 'The Eternal Riverfront: Beyond the 84 Ghats of Kashi',
    destination: 'Varanasi',
    duration: '14 min Documentary Experience',
    image: '/images/varanasi.jpg',
    narrative:
      'For over three thousand years, life, death, devotion, and music have met upon the sacred stone steps of Varanasi. Beneath the popular sunrise boat rides lies a city of generational Dhrupad classical vocalists, Sanskrit grammarians, and master handloom silk weavers keeping centuries of Indian identity alive.',
    livingCulturePoints: [
      'The sacred dawn raagas of Tulsi Ghat',
      'Heirloom jacquard pit loom silk weaving in Madanpura',
      'The ancient wrestling and akhada philosophy of Banaras',
      'Generational winter Malaiyo milk froth artisans',
    ],
  },
  lucknow: {
    id: 'doc-lucknow',
    title: 'The Last Courtyards of Awadh: Poetry, Stone & Zardozi',
    destination: 'Lucknow',
    duration: '12 min Documentary Experience',
    image: '/images/lucknow.jpg',
    narrative:
      'Lucknow’s architecture was designed not merely to display imperial power, but to foster human conversation, acoustic marvels, and unmatched culinary refinement. Walk through the unsupported vaults of Bara Imambara and discover the women’s embroidery cooperatives of Kakori.',
    livingCulturePoints: [
      'Acoustic engineering of the unsupported Bhulbhulaiya vaults',
      'The 32 traditional stitches of authentic Chikankari needlework',
      'Centuries of copper deg slow-fire Dum Pukht cuisine',
      'The Ittar fragrance distillers of old Chowk',
    ],
  },
  agra: {
    id: 'doc-agra',
    title: 'Echoes in Marble: The Living Stonecutters of Taj Ganj',
    destination: 'Agra',
    duration: '10 min Documentary Experience',
    image: '/images/agra-crafts.jpg',
    narrative:
      'Behind the white marble domes of the Taj Mahal, generational artisan families continue the exact same Parchin Kari semi-precious stone inlay technique that built the world wonder.',
    livingCulturePoints: [
      'Semi-precious stone grinding and floral lapidary arts',
      'Mehtab Bagh moonlight perspective and Yamuna ecology',
      'Mughal Agra street cuisine and winter petha making',
    ],
  },
};

interface DocumentaryModalProps {
  storyId: string | null;
  onClose: () => void;
}

export default function DocumentaryModal({
  storyId,
  onClose,
}: DocumentaryModalProps) {
  const { watchStory } = usePassport();

  if (!storyId) return null;

  const doc = sampleDocumentaries[storyId] || sampleDocumentaries['varanasi'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-dark/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl max-h-[90vh] bg-navy-dark border border-ivory/15 rounded-sm shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Cinema Player Screen Container */}
        <div className="relative aspect-[16/9] w-full bg-black overflow-hidden shrink-0">
          <Image
            src={doc.image}
            alt={doc.title}
            fill
            className="object-cover opacity-80"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-black/60" />

          {/* Top Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="category-pill text-[9px] bg-navy-dark/90 border-ivory/20 text-saffron">
              🎬 {doc.destination} • {doc.duration}
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-navy-dark/90 border border-ivory/20 flex items-center justify-center text-white"
            >
              ✕
            </button>
          </div>

          {/* Central Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={() => watchStory(doc.title)}
              className="w-16 h-16 rounded-full bg-saffron text-white flex items-center justify-center pl-1 shadow-2xl hover:scale-110 transition-transform"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-4 left-6 right-6">
            <h3 className="font-heading text-xl sm:text-2xl text-white font-light">
              {doc.title}
            </h3>
          </div>
        </div>

        {/* Narrative & Cultural Context */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div>
            <span className="text-[10px] uppercase font-heading text-saffron tracking-widest block mb-2 font-semibold">
              Documentary Narrative & Cultural Depth
            </span>
            <p className="font-body text-xs sm:text-sm text-ivory/80 leading-relaxed">
              {doc.narrative}
            </p>
          </div>

          <div className="p-4 rounded bg-navy-card border border-ivory/10 space-y-3">
            <span className="text-[10px] uppercase font-heading text-green tracking-wider block font-semibold">
              Living Cultural Insights Featured in this Story
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ivory/70 font-body">
              {doc.livingCulturePoints.map((point) => (
                <div key={point} className="flex items-start gap-2">
                  <span className="text-saffron">✦</span>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-ivory/5 flex items-center justify-between text-xs">
            <button
              onClick={() => {
                watchStory(doc.title);
                onClose();
              }}
              className="btn-primary text-[10px] !py-2.5 !px-5"
            >
              ✓ Mark Story Watched in Passport
            </button>
            <span className="text-ivory/40 font-body">
              Heritage is something India still lives.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
