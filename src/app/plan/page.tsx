'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { defaultItineraries, ItineraryPlan } from '@/data/gisCoordinates';

export default function PlanPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [destination, setDestination] = useState('Lucknow & Awadh');
  const [duration, setDuration] = useState('3 Days');
  const [travelStyle, setTravelStyle] = useState('Heritage & Living Crafts');
  const [activePlan, setActivePlan] = useState<ItineraryPlan>(defaultItineraries['lucknow-3day']);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAIOpen(true);
  };

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
              <span className="text-white">Plan Your Journey</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold mb-1">
                  AI + GIS Route Architect
                </span>
                <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                  Plan Your Authentic <span className="font-semibold text-gold">Bharat Journey</span>
                </h1>
                <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                  Generate unscripted multi-day itineraries connecting monuments with living artisan quarters, sacred river aartis, and regional culinary trails.
                </p>
              </div>

              <button
                onClick={() => setIsAIOpen(true)}
                className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 self-start md:self-auto flex items-center gap-2 shrink-0"
              >
                <span>🤖</span>
                <span>Launch Bharat AI Travel Companion</span>
              </button>
            </div>
          </div>
        </section>

        {/* Interactive Planner Configuration & Results */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Col: Interactive Planner Form */}
            <div className="bg-[#020e1a] border border-gold/30 p-6 sm:p-8 rounded-lg space-y-6">
              <div>
                <span className="text-[10px] uppercase font-heading text-gold tracking-widest block font-semibold">
                  Step 1: Journey Preferences
                </span>
                <h2 className="font-heading text-xl text-white uppercase mt-1">
                  Configure Your Trip
                </h2>
              </div>

              <form onSubmit={handleGeneratePlan} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase font-heading text-ivory/60 block mb-1">
                    Primary Destination or Region
                  </label>
                  <select
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                  >
                    <option value="Lucknow & Awadh">Lucknow & Awadh Heritage</option>
                    <option value="Varanasi & Sarnath">Varanasi & Sarnath (Sacred Ganga)</option>
                    <option value="Rajasthan Royal Desert">Rajasthan Golden Triangle (Jaipur, Udaipur, Jaisalmer)</option>
                    <option value="Tamil Nadu Temple Architecture">Tamil Nadu & Chola Bronze Trail</option>
                    <option value="Kerala Backwaters & Rituals">Kerala Backwaters & Theyyam</option>
                    <option value="Kashmir Pashmina & Crafts">Kashmir Valley & Pashmina Trail</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-heading text-ivory/60 block mb-1">
                    Journey Duration
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['2 Days', '3 Days', '5 Days'].map((d) => (
                      <button
                        type="button"
                        key={d}
                        onClick={() => setDuration(d)}
                        className={`py-2 rounded text-xs font-heading uppercase transition-all ${
                          duration === d
                            ? 'bg-saffron text-white font-semibold'
                            : 'bg-navy-dark border border-ivory/15 text-ivory/70 hover:text-white'
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase font-heading text-ivory/60 block mb-1">
                    Travel Style
                  </label>
                  <select
                    value={travelStyle}
                    onChange={(e) => setTravelStyle(e.target.value)}
                    className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                  >
                    <option value="Heritage & Living Crafts">🏛️ Heritage & Living Crafts</option>
                    <option value="Spiritual & Sacred Ghats">🕉️ Spiritual & Sacred Ghats</option>
                    <option value="Culinary & Slow Food">🍛 Culinary & Food Trails</option>
                    <option value="Wild Bharat Safaris">🐅 Wildlife & Nature</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-xs uppercase !py-3.5 tracking-wider font-heading font-semibold shadow-xl flex items-center justify-center gap-2 mt-4"
                >
                  <span>🤖</span>
                  <span>Generate Itinerary with AI →</span>
                </button>
              </form>
            </div>

            {/* Right 2 Cols: Structured Itinerary Display */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-navy-card border border-ivory/15 p-6 sm:p-8 rounded-lg space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-ivory/10 pb-4">
                  <div>
                    <span className="text-[10px] uppercase font-heading text-saffron tracking-widest block font-semibold">
                      Featured Curated Route
                    </span>
                    <h3 className="font-heading text-2xl text-white uppercase mt-1">
                      {activePlan.title}
                    </h3>
                  </div>

                  <span className="px-3 py-1 rounded bg-gold/20 text-gold border border-gold/40 text-xs font-heading font-semibold uppercase self-start sm:self-auto">
                    ⏱️ {activePlan.durationDays} Days Journey
                  </span>
                </div>

                {/* Day by Day Stops */}
                <div className="space-y-6">
                  {activePlan.waypoints.map((day) => (
                    <div
                      key={day.day}
                      className="p-5 rounded bg-navy-dark border border-ivory/10 space-y-3 relative overflow-hidden"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded bg-saffron text-white text-[10px] font-heading font-semibold uppercase">
                          Day {day.day}
                        </span>
                        <span className="text-xs font-heading text-gold">📍 {day.name}</span>
                      </div>

                      <h4 className="font-heading text-lg text-white font-medium">
                        {day.highlight}
                      </h4>

                      <p className="font-body text-xs sm:text-sm text-ivory/80 leading-relaxed">
                        {day.shadowNote}
                      </p>

                      {/* Stops & Highlights */}
                      <div className="pt-2 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="text-xs text-saffron font-heading">
                          🍛 Food: {day.foodSuggestion}
                        </span>

                        <span className="text-[11px] text-gold font-heading">
                          🌙 Duration: {day.stayDuration}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-ivory/10 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs text-ivory/60">
                    Want to customize timings, hotels, or artisan workshops?
                  </span>
                  <button
                    onClick={() => setIsAIOpen(true)}
                    className="btn-primary text-xs uppercase !py-2.5 !px-5"
                  >
                    Chat With Bharat AI Companion →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <FloatingAIChatButton onOpen={() => setIsAIOpen(true)} />
      <BharatAIModal isOpen={isAIOpen} onClose={() => setIsAIOpen(false)} />
      <Footer onOpenAIPlanner={() => setIsAIOpen(true)} />
    </div>
  );
}
