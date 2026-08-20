'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { cinematicDestinations } from '@/data/tourismData';

interface IndiaThroughTheLensProps {
  onWatchStory?: (storyId: string) => void;
  onSelectLocation?: (location: string) => void;
}

export default function IndiaThroughTheLens({ onWatchStory, onSelectLocation }: IndiaThroughTheLensProps) {
  return (
    <section id="cinematic" className="relative section-cinematic bg-navy-dark overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.4em] uppercase text-saffron font-heading block mb-3 font-medium">
            Cinematic Heritage & Storytelling
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            INDIA, <span className="text-saffron font-medium">THROUGH THE LENS</span>
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Where legendary filmmakers, authors, and documentarians discovered timeless visual poetry. 
            Experience destinations made famous on the silver screen.
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* 2x2 Cinema Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cinematicDestinations.map((spot, i) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              onClick={() => {
                if (onSelectLocation) onSelectLocation(spot.location);
                else if (onWatchStory) onWatchStory(spot.id);
              }}
              className="glass-navy rounded-sm overflow-hidden border border-ivory/10 group hover:border-saffron/40 transition-colors duration-500 flex flex-col cursor-pointer"
            >
              {/* Cinematic 16:9 Image container */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={spot.image}
                  alt={spot.place}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/30 to-transparent opacity-85" />

                {/* Location Badge */}
                <div className="absolute top-4 left-4">
                  <span className="category-pill text-[9px] bg-navy-dark/80 backdrop-blur-md border-ivory/20 text-saffron">
                    {spot.location}
                  </span>
                </div>

                {/* Quote overlay at bottom of image */}
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="font-heading text-xs sm:text-sm text-ivory/90 italic font-light">
                    &ldquo;{spot.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl text-white font-light mb-3 group-hover:text-saffron transition-colors">
                    {spot.place}
                  </h3>
                  
                  <div className="mb-4">
                    <span className="text-[9px] uppercase tracking-widest font-heading text-saffron block mb-1 font-semibold">
                      Screen & Documentary Connection
                    </span>
                    <p className="font-body text-xs sm:text-sm text-ivory/70 leading-relaxed">
                      {spot.filmConnection}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-ivory/5 flex items-center justify-between">
                  <span className="text-[10px] text-green font-heading uppercase tracking-wider">
                    {spot.tourismPotential}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onSelectLocation) onSelectLocation(spot.location);
                      else if (onWatchStory) onWatchStory(spot.id);
                    }}
                    className="text-xs text-saffron font-heading uppercase tracking-wider group-hover:translate-x-1 transition-transform font-semibold"
                  >
                    Explore Location →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
