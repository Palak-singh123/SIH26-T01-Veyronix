'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { StateData } from '@/data/states';

interface StateExperienceProps {
  state: StateData;
  onClose: () => void;
}

export default function StateExperience({ state, onClose }: StateExperienceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 40 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mt-12 glass rounded-sm overflow-hidden"
    >
      {/* Hero Image */}
      <div className="relative h-[250px] sm:h-[350px] overflow-hidden">
        <Image
          src={state.image}
          alt={state.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 gradient-overlay-dark" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center glass rounded-full text-ivory/60 hover:text-ivory transition-colors"
          aria-label="Close"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* State Info Overlay */}
        <div className="absolute bottom-8 left-8 right-8">
          <span className="text-[10px] tracking-[0.4em] uppercase text-terracotta font-heading block mb-2">
            {state.region} India
          </span>
          <h3 className="font-heading text-3xl sm:text-4xl md:text-5xl font-light tracking-wider uppercase text-ivory mb-3">
            {state.name}
          </h3>
          <p className="text-xs text-sandstone font-heading tracking-[0.2em] uppercase">
            {state.tagline}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 sm:p-10">
        <p className="text-ivory/60 font-body text-sm leading-relaxed max-w-3xl mb-8">
          {state.description}
        </p>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {state.categories.map((cat) => (
            <span key={cat} className="category-pill">
              {cat}
            </span>
          ))}
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Famous Destinations */}
          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-ivory/40 mb-4">
              Famous Destinations
            </h4>
            <div className="space-y-3">
              {state.famousDestinations.map((dest) => (
                <div
                  key={dest}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-terracotta/60 group-hover:bg-terracotta transition-colors" />
                  <span className="text-sm text-ivory/70 font-body group-hover:text-ivory transition-colors">
                    {dest}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Hidden Experiences */}
          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] uppercase text-sandstone/60 mb-4">
              Hidden Experiences
            </h4>
            <div className="space-y-3">
              {state.hiddenExperiences.map((exp) => (
                <div
                  key={exp}
                  className="flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-sandstone/40 group-hover:bg-sandstone transition-colors mt-1.5 shrink-0" />
                  <span className="text-sm text-ivory/50 font-body group-hover:text-ivory/80 transition-colors">
                    {exp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Explore CTA */}
        <div className="mt-10 pt-8 border-t border-ivory/5">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <p className="text-xs text-ivory/30 font-heading tracking-wider">
              Full state exploration coming in Step 2
            </p>
            <button className="btn-secondary text-[10px] !py-2 !px-5">
              Explore {state.name} →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
