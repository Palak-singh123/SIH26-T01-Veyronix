'use client';

import { use, useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';
import { registeredGuides, CulturalGuide, GuideReview } from '@/data/guidesData';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function GuideDetailPage({ params }: PageProps) {
  const resolvedParams = use(params);
  const rawId = resolvedParams.id || '';
  const cleanId = decodeURIComponent(rawId).toLowerCase().trim();

  const [isAIOpen, setIsAIOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewsList, setReviewsList] = useState<GuideReview[]>([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const guide = registeredGuides.find(
    (g) => g.id.toLowerCase() === cleanId || g.name.toLowerCase().includes(cleanId)
  ) || registeredGuides[0];

  useEffect(() => {
    // Load persisted reviews
    const stored = localStorage.getItem(`guide_reviews_${guide.id}`);
    if (stored) {
      try {
        setReviewsList(JSON.parse(stored));
      } catch (e) {
        setReviewsList(guide.reviews);
      }
    } else {
      setReviewsList(guide.reviews);
    }
  }, [guide]);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerComment.trim()) return;

    const newReview: GuideReview = {
      id: `rev-${Date.now()}`,
      userName: reviewerName.trim() || 'Traveller',
      userLocation: 'India',
      rating: reviewerRating,
      date: 'Just now',
      comment: reviewerComment.trim(),
      aspectsLiked: ['Knowledge', 'Storytelling'],
    };

    const updated = [newReview, ...reviewsList];
    setReviewsList(updated);
    localStorage.setItem(`guide_reviews_${guide.id}`, JSON.stringify(updated));

    setReviewerName('');
    setReviewerComment('');
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 4000);
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
              <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
              <span>/</span>
              <span className="text-saffron font-medium">{guide.name}</span>
            </div>
            {guide.isVerified && (
              <span className="text-green text-xs font-heading uppercase font-semibold">
                ✓ Ministry Verified Guide
              </span>
            )}
          </div>
        </div>

        {/* Profile Header */}
        <section className="px-6 py-12 bg-navy-card/40 border-b border-ivory/10">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-start sm:items-center gap-6">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-navy-dark border-2 border-gold/50 flex items-center justify-center text-5xl shrink-0 shadow-2xl">
                  👤
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-heading text-2xl sm:text-4xl text-white font-medium">
                      {guide.name}
                    </h1>
                    {guide.isVerified && (
                      <span className="px-2 py-0.5 rounded bg-green/20 text-green text-[10px] font-bold border border-green/30">
                        ✓ VERIFIED GUIDE
                      </span>
                    )}
                  </div>

                  <p className="text-sm font-heading text-gold">📍 {guide.location}</p>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-ivory/70">
                    <span>⭐ <strong className="text-white">{guide.rating}</strong> / 5.0 ({reviewsList.length} reviews)</span>
                    <span>•</span>
                    <span>💼 {guide.experienceYears} Years Experience</span>
                    <span>•</span>
                    <span>🗣️ {guide.languages.join(', ')}</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {guide.specializations.map((spec) => (
                      <span
                        key={spec}
                        className="px-2.5 py-0.5 rounded bg-saffron/20 text-saffron text-[10px] font-heading font-semibold uppercase border border-saffron/40"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 self-start lg:self-auto">
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="btn-primary text-xs uppercase tracking-wider !py-3 !px-5 flex items-center gap-2"
                >
                  <span>🤖</span>
                  <span>Plan Walk With {guide.name.split(' ')[0]}</span>
                </button>
                <Link
                  href="/guides"
                  className="px-4 py-3 rounded bg-navy-card border border-ivory/20 hover:border-gold text-xs font-heading uppercase text-ivory hover:text-white"
                >
                  ← All Guides
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Biography & Reviews */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Bio & Reviews List */}
            <div className="lg:col-span-2 space-y-8">
              {/* Bio */}
              <div className="p-8 rounded-lg bg-navy-card border border-ivory/15 space-y-4">
                <h2 className="font-heading text-xl text-gold uppercase font-medium">
                  About the Cultural Guide
                </h2>
                <p className="font-body text-sm sm:text-base text-ivory/85 leading-relaxed">
                  {guide.bio}
                </p>
              </div>

              {/* Reviews List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading text-xl text-white uppercase">
                    Traveller Reviews ({reviewsList.length})
                  </h3>
                  <span className="text-xs text-gold font-heading">⭐ {guide.rating} Average Rating</span>
                </div>

                <div className="space-y-4">
                  {reviewsList.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded bg-navy-card border border-ivory/10 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading text-sm text-white font-medium">{rev.userName}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gold">{'★'.repeat(rev.rating)}</span>
                          <span className="text-[10px] text-ivory/40">{rev.date}</span>
                        </div>
                      </div>
                      <p className="font-body text-xs text-ivory/80 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Col: Working Review Submission Form */}
            <div>
              <div className="p-6 rounded-lg bg-[#020e1a] border border-gold/30 space-y-5 sticky top-28">
                <div>
                  <span className="text-[10px] uppercase font-heading text-gold tracking-widest block font-semibold">
                    Verified Experience Feedback
                  </span>
                  <h3 className="font-heading text-lg text-white uppercase mt-1">
                    Leave a Guide Review
                  </h3>
                </div>

                {submitSuccess ? (
                  <div className="p-4 rounded bg-green/20 border border-green/40 text-green-light text-xs text-center space-y-1">
                    <span className="text-xl block">✓</span>
                    <p className="font-semibold font-heading uppercase">Thank you!</p>
                    <p>Your review has been verified and saved to this guide's profile.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitReview} className="space-y-4">
                    <div>
                      <label className="text-[10px] uppercase font-heading text-ivory/60 block mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                        placeholder="e.g. Siddharth M."
                        className="w-full bg-navy-dark border border-ivory/20 rounded p-2.5 text-xs text-white placeholder-ivory/30 focus:outline-none focus:border-gold font-body"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-heading text-ivory/60 block mb-1">
                        Rating (1 to 5 Stars)
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            type="button"
                            key={star}
                            onClick={() => setReviewerRating(star)}
                            className={`text-xl transition-colors ${
                              reviewerRating >= star ? 'text-gold' : 'text-ivory/20'
                            }`}
                          >
                            ★
                          </button>
                        ))}
                        <span className="text-xs text-ivory/60 ml-2 font-heading">{reviewerRating} Stars</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-heading text-ivory/60 block mb-1">
                        Your Review & Cultural Notes *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={reviewerComment}
                        onChange={(e) => setReviewerComment(e.target.value)}
                        placeholder="Share your experience during the heritage walk or artisan visit..."
                        className="w-full bg-navy-dark border border-ivory/20 rounded p-2.5 text-xs text-white placeholder-ivory/30 focus:outline-none focus:border-gold font-body"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full btn-primary text-xs uppercase !py-3 tracking-wider font-heading font-semibold"
                    >
                      Submit Verified Review →
                    </button>
                  </form>
                )}
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
