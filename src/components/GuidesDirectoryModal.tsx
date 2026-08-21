'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { registeredGuides, CulturalGuide, GuideReview } from '@/data/guidesData';

interface GuidesDirectoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWatchStory?: (videoId: string) => void;
}

export default function GuidesDirectoryModal({
  isOpen,
  onClose,
  onWatchStory,
}: GuidesDirectoryModalProps) {
  const [selectedGuide, setSelectedGuide] = useState<CulturalGuide | null>(registeredGuides[0]);
  const [activeSpecialization, setActiveSpecialization] = useState<string>('ALL');
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [reviewerName, setReviewerName] = useState('');
  const [reviewerRating, setReviewerRating] = useState(5);
  const [reviewerComment, setReviewerComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (!isOpen) return null;

  const specializations = ['ALL', 'Heritage', 'Architecture', 'Food', 'Crafts', 'Spiritual', 'Wildlife'];

  const filteredGuides = registeredGuides.filter((g) => {
    if (activeSpecialization === 'ALL') return true;
    return g.specializations.includes(activeSpecialization);
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewerComment.trim() || !selectedGuide) return;

    const newRev: GuideReview = {
      id: `rev-${Date.now()}`,
      userName: reviewerName || 'Verified Traveller',
      userLocation: 'India',
      rating: reviewerRating,
      date: new Date().toISOString().split('T')[0],
      comment: reviewerComment,
      aspectsLiked: ['Knowledge', 'Storytelling'],
    };

    selectedGuide.reviews.unshift(newRev);
    setReviewSuccess(true);
    setTimeout(() => {
      setReviewSuccess(false);
      setReviewFormOpen(false);
      setReviewerComment('');
      setReviewerName('');
    }, 1800);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-5xl max-h-[90vh] bg-[#031527] border-2 border-gold/40 rounded-lg shadow-2xl overflow-hidden flex flex-col text-ivory my-auto"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-navy-dark border-b border-ivory/10 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎙️</span>
              <h3 className="font-heading text-base sm:text-lg text-white font-semibold uppercase tracking-wider">
                GUIDES OF BHARAT — LIVING STORYTELLERS
              </h3>
              <span className="px-2 py-0.5 rounded bg-green/20 border border-green/40 text-[9px] font-heading text-green font-semibold">
                Verified
              </span>
            </div>
            <span className="text-[10px] text-ivory/50 font-body">
              Accredited cultural chroniclers, heritage architects, and indigenous wildlife naturalists
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-navy-card border border-ivory/10 flex items-center justify-center text-ivory/60 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* 2-Column Guide Interface */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Guides List & Filters */}
          <div className="lg:col-span-5 space-y-4">
            {/* Specialization Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2">
              {specializations.map((spec) => (
                <button
                  key={spec}
                  onClick={() => setActiveSpecialization(spec)}
                  className={`px-2.5 py-1 rounded text-[10px] uppercase font-heading tracking-wider transition-all whitespace-nowrap ${
                    activeSpecialization === spec
                      ? 'bg-saffron text-white font-semibold shadow'
                      : 'bg-navy-dark text-ivory/60 hover:text-white border border-ivory/5'
                  }`}
                >
                  {spec}
                </button>
              ))}
            </div>

            {/* Guide Cards */}
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
              {filteredGuides.map((guide) => {
                const isSelected = selectedGuide?.id === guide.id;
                return (
                  <div
                    key={guide.id}
                    onClick={() => setSelectedGuide(guide)}
                    className={`p-3.5 rounded-sm border cursor-pointer transition-all flex items-start gap-3.5 ${
                      isSelected
                        ? 'bg-navy-dark border-saffron shadow-lg'
                        : 'bg-navy-dark/60 border-ivory/10 hover:border-ivory/30'
                    }`}
                  >
                    <div className="relative w-14 h-14 rounded-full overflow-hidden shrink-0 border border-saffron/40">
                      <Image src={guide.avatar} alt={guide.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-heading text-sm text-white font-medium">
                          {guide.name}
                        </h4>
                        <span className="text-gold text-xs font-heading font-semibold">
                          ★ {guide.rating}
                        </span>
                      </div>
                      <span className="text-[10px] text-saffron uppercase font-heading tracking-wider block mb-1">
                        {guide.location}
                      </span>
                      <p className="text-[11px] text-ivory/60 font-body line-clamp-1">
                        {guide.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Guide Full Profile & Reviews */}
          {selectedGuide && (
            <div className="lg:col-span-7 bg-navy-dark p-6 rounded-sm border border-ivory/10 space-y-6">
              {/* Profile Bio Header */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-heading text-xl text-white font-medium">
                      {selectedGuide.name}
                    </h3>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-green/20 text-green font-heading uppercase font-semibold">
                      ✓ Verified Guide
                    </span>
                  </div>
                  <span className="text-xs text-saffron uppercase font-heading font-semibold block mb-2">
                    {selectedGuide.title} • {selectedGuide.location}
                  </span>
                  <p className="text-xs text-ivory/80 font-body leading-relaxed">
                    {selectedGuide.bio}
                  </p>
                </div>
              </div>

              {/* Languages & Specializations */}
              <div className="grid grid-cols-2 gap-3 text-xs font-body pt-2 border-t border-ivory/10">
                <div>
                  <span className="text-[9px] uppercase font-heading text-gold block mb-1 font-semibold">
                    Languages Spoken:
                  </span>
                  <span className="text-ivory/70">{selectedGuide.languages.join(', ')}</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-heading text-gold block mb-1 font-semibold">
                    Experience:
                  </span>
                  <span className="text-ivory/70">{selectedGuide.experienceYears} Years in Heritage Field</span>
                </div>
              </div>

              {/* Rating Score Breakdown */}
              <div className="p-4 rounded bg-navy-card/80 border border-ivory/5 space-y-2">
                <div className="flex items-center justify-between text-xs font-heading">
                  <span className="text-white font-semibold">
                    Guide Evaluation Score: ★ {selectedGuide.rating} / 5.0
                  </span>
                  <span className="text-ivory/40">Based on {selectedGuide.reviewsCount} reviews</span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-body text-ivory/70 pt-1">
                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Knowledge</span>
                      <span className="text-gold">{selectedGuide.scoreBreakdown.knowledge}%</span>
                    </div>
                    <div className="w-full h-1 rounded bg-navy-dark overflow-hidden">
                      <div className="h-full bg-gold" style={{ width: `${selectedGuide.scoreBreakdown.knowledge}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Storytelling & Dastangoi</span>
                      <span className="text-saffron">{selectedGuide.scoreBreakdown.storytelling}%</span>
                    </div>
                    <div className="w-full h-1 rounded bg-navy-dark overflow-hidden">
                      <div className="h-full bg-saffron" style={{ width: `${selectedGuide.scoreBreakdown.storytelling}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Communication</span>
                      <span className="text-green">{selectedGuide.scoreBreakdown.communication}%</span>
                    </div>
                    <div className="w-full h-1 rounded bg-navy-dark overflow-hidden">
                      <div className="h-full bg-green" style={{ width: `${selectedGuide.scoreBreakdown.communication}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-0.5">
                      <span>Professionalism</span>
                      <span className="text-ivory">{selectedGuide.scoreBreakdown.professionalism}%</span>
                    </div>
                    <div className="w-full h-1 rounded bg-navy-dark overflow-hidden">
                      <div className="h-full bg-ivory" style={{ width: `${selectedGuide.scoreBreakdown.professionalism}%` }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-heading text-ivory/80 font-semibold tracking-wider">
                    Recent Traveller Reviews ({selectedGuide.reviews.length})
                  </span>
                  <button
                    onClick={() => setReviewFormOpen(!reviewFormOpen)}
                    className="text-[10px] text-saffron uppercase font-heading underline font-semibold"
                  >
                    {reviewFormOpen ? 'Cancel' : '+ Write a Review'}
                  </button>
                </div>

                {/* Review Form Drawer */}
                {reviewFormOpen && (
                  <form onSubmit={handleReviewSubmit} className="p-4 rounded bg-navy-card border border-saffron/30 mb-4 space-y-3 text-xs">
                    {reviewSuccess ? (
                      <div className="text-green font-heading text-center py-2">
                        ✓ Review posted successfully!
                      </div>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            value={reviewerName}
                            onChange={(e) => setReviewerName(e.target.value)}
                            placeholder="Your Name..."
                            className="px-3 py-1.5 bg-navy-dark border border-ivory/15 rounded text-ivory focus:outline-none"
                          />
                          <select
                            value={reviewerRating}
                            onChange={(e) => setReviewerRating(Number(e.target.value))}
                            className="px-3 py-1.5 bg-navy-dark border border-ivory/15 rounded text-ivory focus:outline-none"
                          >
                            <option value={5}>★ 5 Stars (Exceptional)</option>
                            <option value={4}>★ 4 Stars (Great)</option>
                            <option value={3}>★ 3 Stars (Good)</option>
                          </select>
                        </div>
                        <textarea
                          required
                          rows={2}
                          value={reviewerComment}
                          onChange={(e) => setReviewerComment(e.target.value)}
                          placeholder="Share your experience with this cultural guide..."
                          className="w-full px-3 py-1.5 bg-navy-dark border border-ivory/15 rounded text-ivory focus:outline-none resize-none"
                        />
                        <button type="submit" className="btn-primary text-[10px] !py-1.5 !px-4">
                          Submit Guide Review
                        </button>
                      </>
                    )}
                  </form>
                )}

                {/* Reviews List */}
                <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                  {selectedGuide.reviews.map((rev) => (
                    <div key={rev.id} className="p-3 rounded bg-navy-card/60 border border-ivory/5 text-xs space-y-1">
                      <div className="flex items-center justify-between text-gold font-heading text-[11px]">
                        <span>{rev.userName} ({rev.userLocation})</span>
                        <span>{'★'.repeat(rev.rating)}</span>
                      </div>
                      <p className="text-[11px] text-ivory/70 font-body leading-relaxed">
                        {rev.comment}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-navy-dark border-t border-ivory/10 flex items-center justify-between text-xs text-ivory/50">
          <span>Connect with certified heritage storytellers across India</span>
          <button onClick={onClose} className="btn-primary text-[10px] !py-1.5 !px-4">
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
