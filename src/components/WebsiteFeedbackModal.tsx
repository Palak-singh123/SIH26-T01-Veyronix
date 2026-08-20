'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WebsiteFeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function WebsiteFeedbackModal({
  isOpen,
  onClose,
}: WebsiteFeedbackModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState('Website Experience');
  const [recommend, setRecommend] = useState<'YES' | 'MAYBE' | 'NO'>('YES');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const feedbackRecord = {
        id: `fb-${Date.now()}`,
        name: name || 'Anonymous Traveller',
        email,
        rating,
        category,
        recommend,
        message,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('bharat_feedback_records') || '[]');
      existing.unshift(feedbackRecord);
      localStorage.setItem('bharat_feedback_records', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to save feedback locally', err);
    }

    setIsSubmitted(true);
  };

  const categories = [
    'Website Experience',
    'Design & Aesthetics',
    'Bharat AI Guide',
    'Interactive India Map',
    'Cultural Shadows Content',
    'Performance & Speed',
    'Other',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-dark/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl bg-navy-card border border-ivory/15 rounded-sm shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-navy-dark border-b border-ivory/10 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-base sm:text-lg text-white font-semibold uppercase tracking-wider">
              HOW WAS YOUR BHARAT BHARMAN EXPERIENCE?
            </h3>
            <span className="text-[10px] text-ivory/50 font-body">
              Help us shape the future of Indian cultural tourism
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-navy-card border border-ivory/10 flex items-center justify-center text-ivory/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Form Body or Success State */}
        <div className="p-6 overflow-y-auto">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-8 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-green/20 border-2 border-green text-green flex items-center justify-center mx-auto text-2xl">
                ✓
              </div>
              <h4 className="font-heading text-xl text-white font-light">
                Dhanyavaad! Thank you for your valuable feedback.
              </h4>
              <p className="font-body text-xs text-ivory/70 max-w-md mx-auto leading-relaxed">
                Your feedback helps us continuously enrich Bharat Bharman’s cultural discovery archives and AI companion.
              </p>
              <button
                onClick={onClose}
                className="btn-primary text-xs !py-2.5 !px-6 mt-4"
              >
                Return to Exploration
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
              {/* Rating Stars */}
              <div>
                <label className="block text-[10px] uppercase font-heading text-saffron tracking-wider mb-1.5 font-semibold">
                  Overall Rating:
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl transition-transform hover:scale-125 ${
                        star <= rating ? 'text-saffron' : 'text-ivory/20'
                      }`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="text-xs text-ivory/60 ml-2 font-heading">
                    {rating === 5 ? 'Exceptional' : rating === 4 ? 'Great' : rating === 3 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                  Feedback Category:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory focus:outline-none focus:border-saffron"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-navy-dark">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Recommendation Question */}
              <div>
                <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1.5">
                  Would you recommend Bharat Bharman to fellow travellers?
                </label>
                <div className="flex items-center gap-3">
                  {(['YES', 'MAYBE', 'NO'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setRecommend(opt)}
                      className={`flex-1 py-1.5 rounded text-xs font-heading font-semibold transition-all ${
                        recommend === opt
                          ? 'bg-saffron text-white shadow'
                          : 'bg-navy-dark text-ivory/60 border border-ivory/10 hover:text-white'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                    Your Name (Optional):
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-saffron"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                    Email (Optional):
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. ananya@example.com"
                    className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-saffron"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                  Your Suggestions / Experience:
                </label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share what you loved or how we can make your cultural journey even more authentic..."
                  className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-saffron resize-none"
                />
              </div>

              {/* Submit Action */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded text-xs text-ivory/60 hover:text-white font-heading"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="btn-primary text-xs !py-2.5 !px-6 disabled:opacity-40"
                >
                  Send Feedback →
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
