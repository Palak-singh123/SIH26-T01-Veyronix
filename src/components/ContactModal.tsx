'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !email.trim()) return;

    try {
      const contactRecord = {
        id: `contact-${Date.now()}`,
        name,
        email,
        phone,
        subject,
        message,
        createdAt: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('bharat_contact_inquiries') || '[]');
      existing.unshift(contactRecord);
      localStorage.setItem('bharat_contact_inquiries', JSON.stringify(existing));
    } catch (err) {
      console.error('Failed to save contact message', err);
    }

    setIsSubmitted(true);
  };

  const subjects = [
    'General Inquiry',
    'Tourism Information',
    'Guide Partnership (Become a Guide)',
    'Travel Cooperative Partnership',
    'Content & Documentary Partnership',
    'Feedback & Suggestions',
    'Technical Issue',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-navy-dark/90 backdrop-blur-2xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-navy-card border border-ivory/15 rounded-sm shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-navy-dark border-b border-ivory/10 flex items-center justify-between">
          <div>
            <h3 className="font-heading text-base sm:text-lg text-white font-semibold uppercase tracking-wider">
              CONTACT BHARAT BHARMAN
            </h3>
            <span className="text-[10px] text-ivory/50 font-body">
              Reach the national cultural tourism team & partnerships desk
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
        <div className="p-6 overflow-y-auto max-h-[80vh]">
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
                Thank you for contacting Bharat Bharman.
              </h4>
              <p className="font-body text-xs text-ivory/70 max-w-md mx-auto leading-relaxed">
                Your inquiry has been logged in our system. A team coordinator or heritage desk officer will respond to your registered email shortly.
              </p>
              <button onClick={onClose} className="btn-primary text-xs !py-2.5 !px-6 mt-4">
                Done
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-body text-xs">
              {/* Contact Information Placeholders */}
              <div className="p-3.5 rounded bg-navy-dark/90 border border-ivory/5 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px]">
                <div>
                  <span className="text-[9px] uppercase font-heading text-saffron block font-semibold">
                    Email Desk
                  </span>
                  <span className="text-ivory/70">contact@bharatbharman.gov.in</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-heading text-gold block font-semibold">
                    Tourist Helpline
                  </span>
                  <span className="text-ivory/70">1363 (24x7 Toll-Free)</span>
                </div>
                <div>
                  <span className="text-[9px] uppercase font-heading text-green block font-semibold">
                    Location
                  </span>
                  <span className="text-ivory/70">New Delhi, India</span>
                </div>
              </div>

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                    Your Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name..."
                    className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-saffron"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                    Your Email *
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com..."
                    className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-saffron"
                  />
                </div>
              </div>

              {/* Phone & Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-saffron"
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                    Subject / Purpose *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory focus:outline-none focus:border-saffron"
                  >
                    {subjects.map((s) => (
                      <option key={s} value={s} className="bg-navy-dark">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[10px] uppercase font-heading text-ivory/60 tracking-wider mb-1">
                  Your Message / Proposal *
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your inquiry, guide application details, or partnership proposal..."
                  className="w-full px-3 py-2 bg-navy-dark border border-ivory/15 rounded text-xs text-ivory placeholder:text-ivory/30 focus:outline-none focus:border-saffron resize-none"
                />
              </div>

              {/* Submit */}
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
                  disabled={!message.trim() || !email.trim()}
                  className="btn-primary text-xs !py-2.5 !px-6 disabled:opacity-40"
                >
                  Send Message →
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
