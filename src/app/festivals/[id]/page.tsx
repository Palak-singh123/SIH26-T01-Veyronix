'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { allAnnualFestivals } from '@/data/festivalsData';
import { useBookmarks } from '@/context/BookmarksContext';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function FestivalDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id || '';
  const cleanId = decodeURIComponent(rawId).toLowerCase().trim();

  const [isAIOpen, setIsAIOpen] = useState(false);
  const { toggleBookmark, isBookmarked } = useBookmarks();

  const fest = allAnnualFestivals.find(
    (f) =>
      f.id.toLowerCase() === cleanId ||
      cleanId.includes(f.id.toLowerCase()) ||
      f.name.toLowerCase().includes(cleanId) ||
      cleanId.includes(f.name.toLowerCase())
  ) || allAnnualFestivals[0];

  const saved = isBookmarked(fest.id);

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-24 pb-20">
        {/* Breadcrumb */}
        <div className="bg-[#020e1a] border-b border-ivory/10 px-6 py-3">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between text-xs font-heading">
            <div className="flex items-center gap-2 text-ivory/60">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <Link href="/festivals" className="hover:text-white transition-colors">Festivals</Link>
              <span>/</span>
              <span className="text-saffron font-medium">{fest.name}</span>
            </div>
            <button
              onClick={() =>
                toggleBookmark({
                  id: fest.id,
                  type: 'festival',
                  title: fest.name,
                  subtitle: fest.state,
                  image: fest.heroImage,
                })
              }
              className={`px-3 py-1 rounded text-[11px] uppercase tracking-wider font-heading flex items-center gap-1.5 transition-all ${
                saved
                  ? 'bg-gold text-white font-semibold'
                  : 'bg-navy-card border border-ivory/20 text-ivory hover:text-white'
              }`}
            >
              <span>{saved ? '★' : '☆'}</span>
              <span>{saved ? 'Saved in My Bharat' : 'Save Festival'}</span>
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden bg-navy-dark">
          <Image
            src={fest.heroImage}
            alt={fest.name}
            fill
            unoptimized
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12 max-w-[1440px] mx-auto">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded bg-saffron text-white text-xs font-heading uppercase font-semibold">
                  🗓️ {fest.month}
                </span>
                <span className="px-3 py-1 rounded bg-navy-dark/90 text-gold border border-gold/40 text-xs font-heading">
                  📍 {fest.state}
                </span>
              </div>

              <h1 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-light uppercase tracking-wide text-white leading-tight">
                {fest.name}
              </h1>

              <p className="font-body text-base text-ivory/85 max-w-2xl leading-relaxed">
                {fest.culturalMeaning}
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 flex items-center gap-2 shadow-xl"
                >
                  <span>🤖</span>
                  <span>Plan {fest.name} Journey With AI</span>
                </button>
                <Link
                  href="/festivals"
                  className="px-4 py-3 rounded bg-navy-card border border-ivory/20 hover:border-gold text-xs font-heading uppercase text-ivory hover:text-white transition-all"
                >
                  ← All Festivals
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Sections */}
        <section className="max-w-[1440px] mx-auto px-6 py-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-lg bg-navy-card border border-ivory/15 space-y-2">
              <span className="text-xs font-heading uppercase text-saffron tracking-wider font-semibold">
                🗓️ Seasonal Timing
              </span>
              <p className="text-sm text-ivory/80">{fest.month} ({fest.approximateSeason})</p>
            </div>

            <div className="p-6 rounded-lg bg-navy-card border border-ivory/15 space-y-2">
              <span className="text-xs font-heading uppercase text-gold tracking-wider font-semibold">
                📍 Geographic Epicenter
              </span>
              <p className="text-sm text-ivory/80">{fest.state}</p>
            </div>

            <div className="p-6 rounded-lg bg-navy-card border border-ivory/15 space-y-2">
              <span className="text-xs font-heading uppercase text-green-light tracking-wider font-semibold">
                🎭 Category
              </span>
              <p className="text-sm text-ivory/80">{fest.category}</p>
            </div>
          </div>

          <div className="p-8 rounded-lg bg-navy-card border border-ivory/15 space-y-4">
            <h2 className="font-heading text-2xl text-white uppercase font-medium">
              Cultural & Spiritual Significance
            </h2>
            <p className="font-body text-base text-ivory/85 leading-relaxed">
              {fest.culturalMeaning}
            </p>
            {fest.ritualsAndHighlights && fest.ritualsAndHighlights.length > 0 && (
              <div className="pt-4 border-t border-ivory/10 space-y-2">
                <span className="text-xs font-heading uppercase text-gold tracking-wider font-semibold">
                  Rituals & Living Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {fest.ritualsAndHighlights.map((r) => (
                    <span key={r} className="px-3 py-1 rounded bg-navy-dark text-xs text-ivory/90 border border-ivory/15">
                      ✦ {r}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
