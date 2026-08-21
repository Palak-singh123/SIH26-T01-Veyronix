'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FloatingAIChatButton from '@/components/FloatingAIChatButton';
import BharatAIModal from '@/components/BharatAIModal';

export default function ContactPage() {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      const record = {
        id: `contact-${Date.now()}`,
        name,
        email,
        subject,
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };

      const existing = JSON.parse(localStorage.getItem('bharat_contact_submissions') || '[]');
      existing.unshift(record);
      localStorage.setItem('bharat_contact_submissions', JSON.stringify(existing));
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
              <span className="text-white">Contact Us</span>
            </div>

            <div>
              <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold mb-1">
                National Tourism Support & Collaborations
              </span>
              <h1 className="font-heading text-3xl sm:text-5xl font-light uppercase text-white tracking-wide">
                Contact <span className="font-semibold text-gold">Bharat Bharman</span>
              </h1>
              <p className="font-body text-sm sm:text-base text-ivory/70 max-w-2xl mt-2">
                Have questions regarding cultural circuits, artisan guilds, documentary partnerships, or 24x7 tourist helplines? Connect with our national team.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & 24x7 Helplines */}
        <section className="max-w-[1440px] mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left 2 Cols: Contact Form */}
            <div className="lg:col-span-2 bg-navy-card border border-ivory/15 p-8 rounded-lg shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-green/20 border border-green text-green flex items-center justify-center text-3xl mx-auto shadow">
                    ✓
                  </div>
                  <h3 className="font-heading text-2xl text-white uppercase font-medium">
                    Message Dispatched Successfully
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-ivory/80 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Our cultural support team has recorded your message and will get back to you shortly.
                  </p>
                  <div className="pt-4 flex justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setMessage('');
                      }}
                      className="px-5 py-2.5 rounded bg-navy-dark border border-ivory/20 text-xs font-heading uppercase text-ivory hover:text-white"
                    >
                      Send Another Message
                    </button>
                    <Link href="/" className="btn-primary text-xs uppercase !py-2.5 !px-5">
                      Return Home →
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="font-heading text-xl text-white uppercase font-medium">
                      Send a Direct Message
                    </h2>
                    <p className="font-body text-xs text-ivory/60 mt-1">
                      Fill in the details below and our team will get back to you.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Radhika Sen"
                        className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white placeholder-ivory/30 focus:outline-none focus:border-gold font-body"
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. radhika@example.com"
                        className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white placeholder-ivory/30 focus:outline-none focus:border-gold font-body"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                      Subject / Inquiry Type
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white focus:outline-none focus:border-gold font-body"
                    >
                      <option value="General Inquiry">General Tourism Inquiry</option>
                      <option value="Artisan Guild Onboarding">Artisan Guild / Memento Onboarding</option>
                      <option value="Documentary Story Submission">Documentary / Oral Story Submission</option>
                      <option value="Guide Certification">Guide Verification & Registration</option>
                      <option value="Media & Press">Media & Press Partnerships</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs uppercase font-heading text-gold block mb-1 font-semibold">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your inquiry or partnership request in detail..."
                      className="w-full bg-navy-dark border border-ivory/20 rounded p-3 text-xs text-white placeholder-ivory/30 focus:outline-none focus:border-gold font-body"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary text-xs uppercase !py-3.5 tracking-wider font-heading font-semibold shadow-xl"
                  >
                    Send Message →
                  </button>
                </form>
              )}
            </div>

            {/* Right Col: 24x7 Helplines & Emergency Contacts */}
            <div className="space-y-6">
              <div className="bg-[#020e1a] border border-gold/30 p-6 rounded-lg space-y-4">
                <span className="text-xs uppercase font-heading text-gold tracking-widest block font-semibold">
                  National Tourist Helplines
                </span>
                
                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded bg-navy-dark border border-ivory/10 space-y-1">
                    <span className="font-heading text-saffron uppercase font-semibold block">
                      📞 24x7 Multi-Lingual Tourist Helpline
                    </span>
                    <p className="text-sm font-bold text-white">1363 (Toll Free) / 1800-11-1363</p>
                    <p className="text-[10px] text-ivory/50">Available in 12 languages including Hindi, English, German, French, Spanish</p>
                  </div>

                  <div className="p-3 rounded bg-navy-dark border border-ivory/10 space-y-1">
                    <span className="font-heading text-green-light uppercase font-semibold block">
                      🚨 National Emergency Response Support
                    </span>
                    <p className="text-sm font-bold text-white">112 (All Emergencies)</p>
                  </div>

                  <div className="p-3 rounded bg-navy-dark border border-ivory/10 space-y-1">
                    <span className="font-heading text-gold uppercase font-semibold block">
                      🚆 Railway Passenger Security Helpline
                    </span>
                    <p className="text-sm font-bold text-white">139 (Indian Railways)</p>
                  </div>
                </div>
              </div>

              <div className="bg-navy-card border border-ivory/10 p-6 rounded-lg space-y-3">
                <span className="text-xs uppercase font-heading text-white tracking-widest block font-semibold">
                  Instant AI Support
                </span>
                <p className="text-xs text-ivory/60 leading-relaxed">
                  Need real-time itinerary advice, festival timings, or nearby guide recommendations?
                </p>
                <button
                  onClick={() => setIsAIOpen(true)}
                  className="w-full btn-primary text-xs uppercase !py-2.5 flex items-center justify-center gap-2"
                >
                  <span>🤖</span>
                  <span>Ask Bharat AI Companion</span>
                </button>
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
