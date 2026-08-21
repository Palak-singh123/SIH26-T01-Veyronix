'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import DocumentaryModal from '@/components/DocumentaryModal';

const sampleStories = [
  {
    id: 'varanasi',
    title: 'The Weavers of the Infinite Ghats',
    subtitle: 'Varanasi, Uttar Pradesh',
    duration: '14 min',
    director: 'Anand Kumar',
    coverImage: '/images/varanasi.jpg',
    description: 'In the narrow alleys of Madanpura, master weavers preserve 500-year-old pure silver Zari brocade techniques while the sacred Ganga flows eternally.',
    tags: ['Artisan Cinema', 'Oral History', 'Sacred Bharat'],
  },
  {
    id: 'kashmir',
    title: 'Pashmina: Threads of the Himalayas',
    subtitle: 'Srinagar, Jammu & Kashmir',
    duration: '18 min',
    director: 'Zubair Shah',
    coverImage: '/images/kashmir.jpg',
    description: 'High in the Changthang plateau and across Srinagar houseboats, nomadic Changpa herders and Kashmiri sozni master artisans weave the world’s softest fabric.',
    tags: ['Himalayan Heritage', 'Living Crafts'],
  },
  {
    id: 'kerala',
    title: 'Theyyam: Where Gods Walk the Earth',
    subtitle: 'Kannur, Kerala',
    duration: '22 min',
    director: 'Meera Nambiar',
    coverImage: '/images/kerala.jpg',
    description: 'A nocturnal spiritual ritual where humble village performers enter divine trance states to heal and guide coastal village communities.',
    tags: ['Sacred Rituals', 'Spiritual Bharat'],
  },
  {
    id: 'rajasthan',
    title: 'Echoes of the Thar: Manganiyar Ballads',
    subtitle: 'Jaisalmer & Jodhpur, Rajasthan',
    duration: '16 min',
    director: 'Vikramaditya Rathore',
    coverImage: '/images/rajasthan.jpg',
    description: 'Generations of desert bards singing centuries of royal chivalry and desert survival with the ancient bowed Kamaicha instrument.',
    tags: ['Folk Music', 'Desert Heritage'],
  },
  {
    id: 'tamil-nadu',
    title: 'Lost Wax Bronzes of the Cholas',
    subtitle: 'Swamimalai, Tamil Nadu',
    duration: '19 min',
    director: 'K. Senthil',
    coverImage: '/images/tamil-nadu.jpg',
    description: 'Following the traditional sthapatis who pour molten panchaloha alloy using the exact 1,000-year-old Shilpa Shastra proportions.',
    tags: ['Chola Bronze', 'Temple Heritage'],
  },
  {
    id: 'lucknow',
    title: 'Awadh in Thread & Spice',
    subtitle: 'Lucknow, Uttar Pradesh',
    duration: '15 min',
    director: 'Farah Rizvi',
    coverImage: '/images/lucknow.jpg',
    description: 'The poetic synthesis of delicate Chikankari white-on-white needlework and the slow-cooked Dum Pukht culinary art of the Nawabs.',
    tags: ['Awadhi Heritage', 'Culinary & Craft'],
  },
];

export default function StoriesPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col bg-navy-dark text-ivory">
      <Navbar onOpenAIPlanner={() => setIsAIOpen(true)} />

      <main className="flex-1 pt-28 pb-20">
        {/* Header */}
        <section className="px-6 py-12 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-2 text-xs font-heading uppercase text-saffron tracking-widest mb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-white">Stories & Documentaries</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold mb-1">
                  India Through the Lens
                </span>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  Cinematic <span className="font-semibold text-gold">Heritage Documentaries</span>
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Immerse yourself in award-winning short documentaries capturing oral heritage, living artisan masters, and sacred traditions across Bharat.
                </p>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Ask AI About Cultural Documentaries</span>
              </button>
            </div>
          </div>
        </section>

        {/* Stories Grid */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleStories.map((story) => (
              <div
                key={story.id}
                className="group bg-navy-card border border-ivory/15 rounded-lg overflow-hidden shadow-xl hover:border-gold/50 transition-all flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden bg-navy-dark">
                  <Image
                    src={story.coverImage}
                    alt={story.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-transparent to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <button
                    onClick={() => setSelectedDocId(story.id)}
                    className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                    aria-label="Play Story"
                  >
                    <div className="w-14 h-14 rounded-full bg-saffron/90 text-white flex items-center justify-center shadow-2xl pl-1 text-xl border-2 border-white/40 group-hover:bg-saffron">
                      ▶
                    </div>
                  </button>

                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-1 rounded bg-navy-dark/90 text-gold text-[10px] font-heading font-semibold uppercase border border-gold/30">
                      ⏱️ {story.duration}
                    </span>
                  </div>

                  <div className="absolute bottom-2 left-3 right-3">
                    <span className="text-[11px] font-heading uppercase text-saffron tracking-wider font-semibold">
                      📍 {story.subtitle}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-heading text-xl text-white group-hover:text-gold transition-colors font-medium">
                      {story.title}
                    </h3>
                    <p className="font-body text-xs text-ivory/70 line-clamp-3 mt-2 leading-relaxed">
                      {story.description}
                    </p>
                    <p className="text-[10px] text-ivory/50 font-heading mt-2 uppercase tracking-wider">
                      Directed by {story.director}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-ivory/10 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setSelectedDocId(story.id)}
                      className="btn-primary text-xs uppercase !py-2 !px-4 flex-1 text-center font-heading flex items-center justify-center gap-1.5"
                    >
                      <span>▶</span>
                      <span>Watch Story</span>
                    </button>

                    <Link
                      href={`/stories/${story.id}`}
                      className="px-3 py-2 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory hover:text-white"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <DocumentaryModal
        storyId={selectedDocId}
        onClose={() => setSelectedDocId(null)}
      />
      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
