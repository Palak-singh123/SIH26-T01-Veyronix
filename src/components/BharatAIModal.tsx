'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';
import { usePassport } from '@/context/PassportContext';
import { sendChatMessageToN8N, ChatMessage } from '@/services/n8nChatService';
import { ItineraryPlan } from '@/data/gisCoordinates';

interface BharatAIModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectItineraryOnMap?: (itinerary: ItineraryPlan) => void;
}

const quickActionServices = [
  {
    label: '🏛️ Explore Tourist Places',
    query: 'Recommend the best tourist places to visit in India.',
  },
  {
    label: '📅 Plan My Trip',
    query: 'I want to plan a personalized trip.',
  },
  {
    label: '🎭 Explore Culture & Heritage',
    query: "Show me India's culture and heritage experiences.",
  },
  {
    label: '🍛 Discover Local Experiences',
    query: 'Show me authentic local food, crafts, festivals, and local experiences.',
  },
  {
    label: '🌐 Explore in My Language',
    query: 'I want to explore Bharat Bhraman in my preferred language.',
  },
];

export default function BharatAIModal({
  isOpen,
  onClose,
  onSelectItineraryOnMap,
}: BharatAIModalProps) {
  const { language } = useLanguage();
  const { collectMemento, isMementoCollected, exploreDestination } = usePassport();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize greeting on open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialGreeting: ChatMessage = {
        id: 'init-1',
        sender: 'ai',
        text: `नमस्ते! Welcome to भारत भ्रमण 🇮🇳

I’m your AI travel companion, here to help you discover India your way. I can help you:

🗺️ Discover the best tourist places and hidden gems
🏛️ Explore India’s heritage, culture, food & local experiences
📅 Plan personalized trips and itineraries
🌐 Chat with you in your preferred language
💡 Recommend places based on your interests, time & preferences

Tell me what you’d like to explore, and let’s begin your journey! ✨`,
        timestamp: new Date(),
        suggestedPrompts: quickActionServices.map((s) => s.label),
      };
      setMessages([initialGreeting]);
    }
  }, [isOpen, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (queryText?: string) => {
    let textToSend = queryText || input;
    if (!textToSend.trim() || loading) return;

    // Check if the query is one of the quick action button labels and map to its query
    const matchedService = quickActionServices.find((s) => s.label === textToSend);
    if (matchedService) {
      textToSend = matchedService.query;
    }

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const aiResponse = await sendChatMessageToN8N(
        textToSend,
        language === 'hi' ? 'hi' : 'en',
        [...messages, userMsg]
      );
      setMessages((prev) => [...prev, aiResponse]);
    } catch (e) {
      console.error(e);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: "Sorry, I'm having trouble connecting right now. Please try again.",
          timestamp: new Date(),
          isError: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-dark/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-4xl h-[90vh] max-h-[820px] bg-navy-dark border border-ivory/15 rounded-sm shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-navy-card border-b border-ivory/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-saffron/50 p-0.5 bg-navy shrink-0">
              <Image
                src="/images/logo.png"
                alt="Bharat Bhraman Logo"
                fill
                sizes="40px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading text-base font-semibold text-white tracking-wider uppercase">
                  BHARAT BHRAMAN
                </span>
                <span className="px-2 py-0.5 rounded bg-green/20 border border-green/40 text-[9px] font-heading uppercase text-green font-semibold">
                  LIVE
                </span>
              </div>
              <span className="text-[10px] text-ivory/60 font-body">
                Your AI Travel Companion
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-navy border border-ivory/10 text-ivory/60 hover:text-white hover:border-saffron/40 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages Log */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-start gap-2.5 max-w-[88%] sm:max-w-[80%]">
                {msg.sender === 'ai' && (
                  <div className="relative w-7 h-7 rounded-full overflow-hidden border border-saffron/40 shrink-0 mt-1 bg-navy">
                    <Image
                      src="/images/logo.png"
                      alt="AI"
                      fill
                      sizes="28px"
                      className="object-cover"
                    />
                  </div>
                )}

                <div
                  className={`p-4 rounded-sm font-body text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-saffron text-white shadow-md'
                      : 'bg-navy-card text-ivory/90 border border-ivory/10'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Render Structured Itinerary if provided */}
                  {msg.structuredItinerary && (
                    <div className="mt-4 pt-4 border-t border-ivory/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-heading text-saffron tracking-widest font-semibold">
                          {msg.structuredItinerary.theme}
                        </span>
                        <span className="text-[10px] text-green font-heading font-medium">
                          {msg.structuredItinerary.durationDays} Days Route
                        </span>
                      </div>

                      {/* Day Waypoints */}
                      <div className="space-y-2 mt-2">
                        {msg.structuredItinerary.waypoints.map((wp) => (
                          <div
                            key={wp.day}
                            className="p-3 rounded bg-navy-dark/90 border border-ivory/5 text-xs space-y-1"
                          >
                            <div className="flex items-center justify-between text-gold font-heading font-semibold">
                              <span>Day {wp.day}: {wp.name}</span>
                              <span className="text-[9px] text-ivory/40">{wp.stayDuration}</span>
                            </div>
                            <p className="text-ivory/70 font-body text-[11px] leading-relaxed">
                              {wp.highlight}
                            </p>
                            <div className="text-[10px] text-saffron/90 flex items-center gap-1.5 pt-1">
                              <span>✦ Shadow:</span>
                              <span className="text-ivory/60">{wp.shadowNote}</span>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Why This Route */}
                      <div className="p-2.5 rounded bg-navy-dark/50 border-l-2 border-saffron text-[11px] text-ivory/60">
                        <span className="font-heading font-semibold text-saffron block mb-0.5">
                          Why This Route:
                        </span>
                        {msg.structuredItinerary.whyThisRoute}
                      </div>

                      {/* Action to show on GIS Map */}
                      {onSelectItineraryOnMap && (
                        <button
                          onClick={() => {
                            onSelectItineraryOnMap(msg.structuredItinerary!);
                            exploreDestination(msg.structuredItinerary!.destinationSummary);
                            onClose();
                            const el = document.getElementById('gis-map');
                            el?.scrollIntoView({ behavior: 'smooth' });
                          }}
                          className="btn-primary w-full text-[10px] !py-2.5 justify-center mt-2"
                        >
                          🗺️ Focus Route on Interactive GIS Map
                        </button>
                      )}
                    </div>
                  )}

                  {/* Render Suggested Mementos if provided */}
                  {msg.suggestedMementos && msg.suggestedMementos.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-ivory/10">
                      <span className="text-[10px] uppercase font-heading text-gold tracking-widest block mb-2 font-semibold">
                        Recommended Bharat Mementos:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.suggestedMementos.map((m) => {
                          const collected = isMementoCollected(m.id);
                          return (
                            <div
                              key={m.id}
                              className="p-2.5 rounded bg-navy-dark border border-ivory/5 flex flex-col justify-between"
                            >
                              <div>
                                <span className="text-xs font-heading text-white font-medium block">
                                  {m.name}
                                </span>
                                <span className="text-[9px] text-ivory/40 block mb-1">
                                  {m.destination} • {m.type}
                                </span>
                              </div>
                              <button
                                onClick={() => collectMemento(m.id)}
                                className={`text-[9px] uppercase font-heading tracking-wider py-1 px-2 rounded mt-2 transition-all ${
                                  collected
                                    ? 'bg-green text-white'
                                    : 'bg-navy-card text-saffron border border-saffron/40 hover:bg-saffron hover:text-white'
                                }`}
                              >
                                {collected ? '✓ In Cultural Passport' : '+ Collect Memento'}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Suggested Prompts Chips */}
              {msg.suggestedPrompts && (
                <div className="flex flex-wrap gap-1.5 mt-2.5 ml-9">
                  {msg.suggestedPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSend(prompt)}
                      className="px-3 py-1 rounded-full bg-navy-card border border-ivory/10 hover:border-saffron/50 text-[10px] text-ivory/80 hover:text-saffron transition-all font-heading"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-ivory/60 text-xs font-heading">
              <div className="w-2 h-2 rounded-full bg-saffron animate-bounce" />
              <span>Your AI travel companion is thinking...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Action Buttons */}
        <div className="px-6 py-2 bg-navy-card/60 border-t border-ivory/5 flex items-center gap-2 overflow-x-auto">
          <span className="text-[9px] uppercase font-heading text-ivory/40 tracking-wider shrink-0">
            Services:
          </span>
          {quickActionServices.map((service) => (
            <button
              key={service.label}
              onClick={() => handleSend(service.query)}
              className="px-3 py-1.5 rounded-full bg-navy-dark text-[10px] text-ivory/80 hover:text-saffron hover:border-saffron/40 border border-ivory/10 whitespace-nowrap transition-colors font-heading"
            >
              {service.label}
            </button>
          ))}
        </div>

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-4 bg-navy-card border-t border-ivory/10 flex items-center gap-3"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about travelling in India..."
            className="flex-1 px-4 py-3 bg-navy-dark border border-ivory/15 rounded-sm text-xs sm:text-sm text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-saffron transition-colors font-body"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="btn-primary !py-3 !px-6 text-xs uppercase font-heading disabled:opacity-40"
          >
            Send →
          </button>
        </form>
      </motion.div>
    </div>
  );
}
