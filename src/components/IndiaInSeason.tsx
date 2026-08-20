'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { seasonalFestivals } from '@/data/tourismData';

export default function IndiaInSeason() {
  return (
    <section id="festivals" className="relative section-cinematic bg-navy-dark overflow-hidden">
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
            Living Celebrations & Sacred Calendars
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wide text-white mb-6">
            INDIA, <span className="text-saffron font-medium">IN SEASON</span>
          </h2>
          <p className="font-body text-ivory/60 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Experience cultural traditions when they come alive. Connect with regional celebrations, 
            monsoon raagas, and timeless sacred gatherings.
          </p>
          <div className="accent-line-tricolor mx-auto mt-6" />
        </motion.div>

        {/* 2x2 Festival Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {seasonalFestivals.map((fest, i) => (
            <motion.div
              key={fest.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="glass-navy rounded-sm overflow-hidden border border-ivory/10 group hover:border-saffron/40 transition-all duration-500 flex flex-col sm:flex-row"
            >
              {/* Image */}
              <div className="relative w-full sm:w-2/5 min-h-[220px] overflow-hidden shrink-0">
                <Image
                  src={fest.image}
                  alt={fest.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 30vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t sm:bg-gradient-to-r from-navy-dark via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2 py-0.5 rounded bg-saffron text-white text-[9px] uppercase font-heading font-semibold">
                    {fest.seasonPeriod}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-ivory/40 uppercase font-heading tracking-widest block mb-1">
                    {fest.destination}
                  </span>
                  <h3 className="font-heading text-xl text-white font-light mb-2">
                    {fest.name}
                  </h3>
                  <p className="font-body text-xs text-ivory/70 leading-relaxed mb-3">
                    {fest.culturalMeaning}
                  </p>
                  <p className="font-body text-xs text-gold/80 italic leading-relaxed">
                    &ldquo;{fest.experience}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-ivory/5 flex items-center justify-between">
                  <span className="text-[10px] text-green font-heading uppercase tracking-wider">
                    Authentic Cultural Experience
                  </span>
                  <button className="text-xs text-saffron font-heading uppercase group-hover:underline">
                    View Guide →
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
