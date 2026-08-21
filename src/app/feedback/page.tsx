'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';

export default function FeedbackPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Website Experience');
  const [recommend, setRecommend] = useState<'YES' | 'MAYBE' | 'NO'>('YES');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const record = {
        id: `fb-${Date.now()}`,
        name: name || 'Anonymous Traveller',
        email,
        rating,
        category,
        recommend,
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('bharat_feedback_submissions') || '[]');
      existing.unshift(record);
      localStorage.setItem('bharat_feedback_submissions', JSON.stringify(existing));
    } catch (err) {
      console.error(err);
    }

    setIsSubmitted(true);
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
              <span className="text-white">Website Feedback</span>
            </div>

            <div>
              <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold mb-1">
                Help Us Build Bharat Bharman
              </span>
              <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                Share Your <span className="font-semibold text-gold">Traveller Feedback</span>
              </h1>
              <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                Your suggestions help us preserve forgotten cultural shadows, expand verified artisan guilds, and refine India's national tourism platform.
              </p>
            </div>
          </div>
        </section>

        {/* Feedback Form Section */}
        <section className="max-w-3xl mx-auto px-6 py-12">
          <div className="bg-navy-card border border-ivory/15 p-8 rounded-lg shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green/20 border border-green text-green flex items-center justify-center text-3xl mx-auto shadow">
                  ✓
                </div>
                <h3 className="font-heading text-2xl text-white uppercase font-medium">
                  Dhanyavaad! Feedback Received
                </h3>
                <p className="font-body text-xs sm:text-sm text-ivory/80 max-w-md mx-auto leading-relaxed">
                  Your feedback has been logged securely into the Bharat Bharman platform improvement ledger.
                </p>
                <div className="pt-4 flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2.5 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory hover:text-white"
                  >
                    Submit Another Note
                  </button>
                  <Link href="/" className="btn-primary text-xs uppercase !py-2.5 !px-5">
                    Return to Home →
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                      Your Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Vikramaditya Sharma"
                      className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white placeholder-ivory/30 focus:outline-none focus:border-gold font-body"
                    />
                  </div>

                  <div>
                    <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. vikram@example.com"
                      className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white placeholder-ivory/30 focus:outline-none focus:border-gold font-body"
                    />
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <label className="text-xs uppercase font-heading text-gold block mb-2 font-semibold">
                    Overall Experience Rating (1 to 5 Stars) *
                  </label>
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setRating(star)}
                        className={`text-3xl transition-transform hover:scale-125 ${
                          rating >= star ? 'text-gold' : 'text-ivory/20'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="text-xs font-heading text-white ml-2">{rating} out of 5 Stars</span>
                  </div>
                </div>

                {/* Category & Recommendation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                      Feedback Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                    >
                      <option value="Website Experience">🖥️ Website & UI Experience</option>
                      <option value="Cultural Shadows Accuracy">✦ Cultural Shadows & Stories</option>
                      <option value="Bharat AI Assistant">🤖 Bharat AI & Trip Planner</option>
                      <option value="Artisan Mementos Data">🧵 Artisan Mementos & Crafts</option>
                      <option value="New Feature Suggestion">💡 New Feature Suggestion</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                      Would you recommend Bharat Bharman?
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['YES', 'MAYBE', 'NO'] as const).map((opt) => (
                        <button
                          type="button"
                          key={opt}
                          onClick={() => setRecommend(opt)}
                          className={`py-3 rounded text-xs font-heading uppercase font-semibold transition-all ${
                            recommend === opt
                              ? 'bg-saffron text-white shadow'
                              : 'bg-navy-dark border border-ivory/15 text-ivory/70 hover:text-white'
                          }`}
                        >
                          {opt === 'YES' ? '👍 Yes' : opt === 'MAYBE' ? '🤔 Maybe' : '👎 No'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Detailed Comments */}
                <div>
                  <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                    Your Detailed Message or Suggestions *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you loved, what we can improve, or suggest a lesser-known cultural story..."
                    className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white placeholder-ivory/30 focus:outline-none focus:border-gold font-body"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary text-xs uppercase !py-3.5 tracking-wider font-heading font-semibold shadow-xl"
                >
                  Submit Official Feedback →
                </button>
              </form>
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
