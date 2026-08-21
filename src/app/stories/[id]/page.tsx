'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import DocumentaryModal from '@/components/DocumentaryModal';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function StoryDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id || '';
  const cleanId = decodeURIComponent(rawId).toLowerCase().trim();

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const story = {
    id: cleanId,
    title: cleanId === 'kashmir' ? 'Pashmina: Threads of the Himalayas' : cleanId === 'kerala' ? 'Theyyam: Where Gods Walk the Earth' : cleanId === 'rajasthan' ? 'Echoes of the Thar: Manganiyar Ballads' : cleanId === 'lucknow' ? 'Awadh in Thread & Spice' : 'The Weavers of the Infinite Ghats',
    location: cleanId === 'kashmir' ? 'Srinagar, Jammu & Kashmir' : cleanId === 'kerala' ? 'Kannur, Kerala' : cleanId === 'rajasthan' ? 'Jaisalmer, Rajasthan' : cleanId === 'lucknow' ? 'Lucknow, Uttar Pradesh' : 'Varanasi, Uttar Pradesh',
    director: 'Anand Kumar & Cultural Documentation Guild',
    duration: '14 min',
    image: cleanId === 'kashmir' ? '/images/kashmir.jpg' : cleanId === 'kerala' ? '/images/kerala.jpg' : cleanId === 'rajasthan' ? '/images/rajasthan.jpg' : cleanId === 'lucknow' ? '/images/lucknow.jpg' : '/images/varanasi.jpg',
    description: 'An immersive documentary exploring living oral heritage, master craftsmen, and sacred community traditions passed down through centuries.',
  };

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
              <Link href="/stories" className="hover:text-white transition-colors">Stories</Link>
              <span>/</span>
              <span className="text-saffron font-medium">{story.title}</span>
            </div>
            <span className="text-gold uppercase text-[10px]">India Through the Lens</span>
          </div>
        </div>

        {/* Cinematic Player Hero */}
        <section className="relative h-[65vh] min-h-[420px] w-full overflow-hidden bg-black flex items-center justify-center">
          <Image
            src={story.image}
            alt={story.title}
            fill
            unoptimized
            priority
            className="object-cover opacity-60"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-black/40 to-transparent" />

          {/* Big Play Action */}
          <div className="relative z-10 text-center space-y-4 max-w-2xl px-6">
            <button
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 rounded-full bg-saffron text-white flex items-center justify-center shadow-2xl pl-1 text-3xl border-2 border-white/50 hover:scale-110 transition-transform mx-auto"
              aria-label="Play Documentary"
            >
              ▶
            </button>
            <span className="text-xs uppercase font-heading tracking-[0.2em] text-gold block font-semibold">
              Click to Watch High-Definition Cinema ({story.duration})
            </span>
            <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide leading-tight">
              {story.title}
            </h1>
            <p className="text-xs font-heading text-saffron uppercase tracking-widest">
              📍 {story.location}
            </p>
          </div>
        </section>

        {/* Narrative & Filmmaker Notes */}
        <section className="max-w-[1440px] mx-auto px-6 py-12 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 p-8 rounded-lg bg-navy-card border border-ivory/15 space-y-4">
              <h2 className="font-heading text-2xl text-gold uppercase font-medium">
                Documentary Synopsis
              </h2>
              <p className="font-body text-base text-ivory/85 leading-relaxed">
                {story.description}
              </p>
              <p className="font-body text-sm text-ivory/70 leading-relaxed pt-3 border-t border-ivory/10">
                Filmed entirely on location with authentic acoustic field recordings of temple bells, handloom shuttles, and chanting.
              </p>
            </div>

            <div className="p-8 rounded-lg bg-navy-card border border-ivory/15 space-y-4">
              <span className="text-xs uppercase font-heading text-saffron tracking-widest block font-semibold">
                Credits & Production
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="text-ivory/50">Director</span>
                  <span className="text-white font-heading">{story.director}</span>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="text-ivory/50">Runtime</span>
                  <span className="text-gold font-heading">{story.duration}</span>
                </div>
                <div className="flex justify-between border-b border-ivory/10 pb-2">
                  <span className="text-ivory/50">Location</span>
                  <span className="text-white font-heading">{story.location}</span>
                </div>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="w-full btn-primary text-xs uppercase !py-2.5 mt-2"
              >
                Plan Trip to this Location →
              </button>
            </div>
          </div>
        </section>
      </main>

      <DocumentaryModal
        storyId={isPlaying ? story.id : null}
        onClose={() => setIsPlaying(false)}
      />
      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
