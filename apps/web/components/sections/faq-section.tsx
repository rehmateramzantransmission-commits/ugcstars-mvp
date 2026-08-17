'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const FAQS = [
  {
    category: 'general',
    question: 'How does the Pay-Per-View (PPV) verification engine work?',
    answer: 'Our PPV verification engine audits video view counts, audience retention, and click authenticity with sub-second accuracy. Brands only pay for verified human views, filtering out duplicate or bot traffic.'
  },
  {
    category: 'general',
    question: 'How are payments protected with Safepay Escrow?',
    answer: 'When a brand creates a campaign, the budget is deposited into a 100% Nadra/FBR compliant Safepay Escrow vault. Funds are only released to the creator once the content plan and watermarked draft are approved.'
  },
  {
    category: 'creators',
    question: 'What are the Creator Tier Slabs (Rising, Emerging, Established, Elite, Icon)?',
    answer: 'Creators are categorized into follower tiers: Rising (10K-50K), Emerging (50K-200K), Established (200K-500K), Elite (500K-1M), and Icon (1M+). Higher slabs earn increased PPV rate multipliers per verified view.'
  },
  {
    category: 'creators',
    question: 'Which local Pakistani payout channels are supported?',
    answer: 'Creators can withdraw their wallet balances instantly using RAAST (Instant IBFT), JazzCash, Easypaisa, or direct bank transfer across all major Pakistani banks.'
  },
  {
    category: 'brands',
    question: 'What is the difference between Self-Service and Managed Agency plans?',
    answer: 'Self-Service allows brands to post briefs and manage creator contracts directly. Managed Agency provides dedicated talent managers in Karachi, Lahore, and Islamabad to handle end-to-end execution.'
  },
  {
    category: 'brands',
    question: 'Is UGCstars compliant with FBR tax withholding rules in Pakistan?',
    answer: 'Yes. UGCstars automatically calculates and applies FBR withholding tax (WHT) for filers (10%) and non-filers, providing automated tax certificates for every disbursed campaign.'
  }
];

export function FaqSection() {
  const [activeCategory, setActiveCategory] = useState<'general' | 'brands' | 'creators'>('general');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = FAQS.filter(f => f.category === activeCategory);

  return (
    <section className="bg-[#071913] py-20 font-sans border-t border-emerald-950/80">
      <div className="max-w-[1040px] mx-auto px-6 text-left">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] bg-[#0E6E52]/20 px-4 py-1.5 rounded-full border border-emerald-700/60 inline-block font-bold mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-300 text-sm font-medium">
            Everything you need to know about UGCstars PPV engine, escrow, and local payouts.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-2 mb-10">
          {[
            { id: 'general', label: 'General' },
            { id: 'brands', label: 'For Brands' },
            { id: 'creators', label: 'For Creators' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id as any);
                setOpenIndex(0);
              }}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer",
                activeCategory === tab.id
                  ? "bg-[#0E6E52] text-white shadow-md border border-[#34D399]"
                  : "bg-[#0D261E] text-slate-300 border border-emerald-800/60 hover:bg-[#0E3529]"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Accordion Components */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-[#0D261E] border border-emerald-800/60 rounded-2xl overflow-hidden shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex justify-between items-center gap-4 cursor-pointer text-white"
                >
                  <span className="font-extrabold text-sm lg:text-base">
                    {faq.question}
                  </span>
                  <ChevronDown className={cn("w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300", isOpen && "rotate-180 text-[#34D399]")} />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-xs lg:text-sm text-slate-300 font-medium leading-relaxed border-t border-emerald-900/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
