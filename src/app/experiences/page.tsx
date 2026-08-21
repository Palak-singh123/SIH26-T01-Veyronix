'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';

const experienceCategories = [
  {
    id: 'heritage',
    name: 'Iconic Monuments & Citadels',
    tagline: 'UNESCO World Heritage forts, monolithic rock-cut caves, and marble wonders.',
    image: '/images/rajasthan.jpg',
    badge: 'Heritage',
    link: '/destinations',
    highlights: ['Amer Fort & Sheesh Mahal', 'Taj Mahal & Agra Complex', 'Hampi Vijayanagara Citadel'],
  },
  {
    id: 'culture',
    name: 'Living Cultural Shadows',
    tagline: 'Artisan settlements, oral epics, and generational master weavers behind the monuments.',
    image: '/images/lucknow.jpg',
    badge: 'Culture',
    link: '/cultural-shadows',
    highlights: ['Rumi Darwaza Chikankari Guilds', 'Varanasi Zari Master Weavers', 'Swamimalai Chola Bronze Casting'],
  },
  {
    id: 'spiritual',
    name: 'Sacred Bharat & Ancient Ghats',
    tagline: 'Timeless riverfront aartis, Jyotirlinga temples, and Himalayan spiritual routes.',
    image: '/images/varanasi.jpg',
    badge: 'Spiritual',
    link: '/destinations/varanasi-ghats',
    highlights: ['Kashi Vishwanath & Dashashwamedh Ghat', 'Madurai Meenakshi Amman Temple', 'Ayodhya Saryu Ghats'],
  },
  {
    id: 'wildlife',
    name: 'Wild Bharat Safaris',
    tagline: 'Premier tiger reserves, high-altitude snow leopard habitats, and rhino grasslands.',
    image: '/images/hero-bg.jpg',
    badge: 'Wildlife',
    link: '/national-parks',
    highlights: ['Kaziranga Grasslands', 'Jim Corbett Tiger Reserve', 'Gir Asiatic Lion Sanctuary'],
  },
  {
    id: 'festivals',
    name: 'Pan-Indian Annual Festivals',
    tagline: '12 months of desert camel fairs, Kerala boat races, Durga Puja, and Holi.',
    image: '/images/indian-festivals.jpg',
    badge: 'Festivals',
    link: '/festivals',
    highlights: ['Pushkar Desert Camel Fair', 'Kolkata Durga Puja', 'Varanasi Dev Deepawali'],
  },
  {
    id: 'crafts',
    name: 'Handcrafted Bharat Mementos',
    tagline: 'GI-tagged authentic textiles, Bidriware, Tanjore gold leaf paintings, and terracotta.',
    image: '/images/agra-crafts.jpg',
    badge: 'Crafts',
    link: '/passport',
    highlights: ['Lucknow Chikankari', 'Kashmir Pashmina', 'Jaipur Blue Pottery'],
  },
];

export default function ExperiencesPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);

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
              <span className="text-white">Experiences</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  Thematic Experiences of <span className="font-semibold text-gold">Bharat</span>
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Immerse yourself in authentic Indian journeys organized by theme: from UNESCO heritage to living crafts, wildlife, and spiritual traditions.
                </p>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Plan Custom Experience With AI</span>
              </button>
            </div>
          </div>
        </section>

        {/* Experience Cards Grid */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {experienceCategories.map((exp) => (
              <div
                key={exp.id}
                className="group bg-navy-card border border-ivory/15 rounded-lg overflow-hidden shadow-xl hover:border-gold/50 transition-all flex flex-col justify-between"
              >
                <div className="relative h-60 w-full overflow-hidden bg-navy-dark">
                  <Image
                    src={exp.image}
                    alt={exp.name}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-card via-transparent to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded bg-saffron text-white text-[10px] font-heading font-semibold uppercase shadow">
                      {exp.badge}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h2 className="font-heading text-xl text-white group-hover:text-gold transition-colors font-medium">
                      {exp.name}
                    </h2>
                    <p className="font-body text-xs text-ivory/70 leading-relaxed">
                      {exp.tagline}
                    </p>

                    <div className="pt-2 space-y-1">
                      <span className="text-[10px] uppercase font-heading text-gold tracking-wider block font-semibold">
                        Highlights:
                      </span>
                      {exp.highlights.map((h) => (
                        <span key={h} className="text-xs text-ivory/80 block">
                          ✦ {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-ivory/10 flex items-center justify-between gap-3">
                    <Link
                      href={exp.link}
                      className="btn-primary text-xs uppercase !py-2.5 !px-4 flex-1 text-center font-heading"
                    >
                      Explore {exp.badge} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
