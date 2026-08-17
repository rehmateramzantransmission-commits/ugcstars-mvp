'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Users, CheckCircle2, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const SLABS = [
  {
    id: 'rising',
    name: 'Rising Slab',
    nameUr: 'ابھرتے ہوئے',
    reach: '10K - 50K Reach',
    color: '#EC4899',
    textColor: 'text-white',
    badge: 'Micro Creator',
    avgPayout: 'PKR 15,000 - 35,000',
    description: 'Fresh micro-creators with highly engaged niche audiences in fashion, food, lifestyle, and local tech.',
    sampleCreator: {
      name: 'Ayesha Malik',
      niche: 'Fashion & Everyday Wear',
      handle: '@ayesha.style_pk',
      followers: '32.4K',
      avgViews: '18.5K',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'emerging',
    name: 'Emerging Slab',
    nameUr: 'ابھرتے',
    reach: '50K - 200K Reach',
    color: '#8B5CF6',
    textColor: 'text-white',
    badge: 'Viral Choice',
    avgPayout: 'PKR 40,000 - 90,000',
    description: 'Established mid-tier storytellers producing viral Instagram Reels and high-converting TikTok try-ons.',
    sampleCreator: {
      name: 'Zainab Ahmed',
      niche: 'Beauty & Skincare',
      handle: '@zainab.glows',
      followers: '124K',
      avgViews: '85K',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'established',
    name: 'Established Slab',
    nameUr: 'مستحکم',
    reach: '200K - 500K Reach',
    color: '#635BFF',
    textColor: 'text-white',
    badge: 'Pro Tier',
    avgPayout: 'PKR 100,000 - 250,000',
    description: 'Pro-grade video producers delivering polished brand campaigns with national audience penetration.',
    sampleCreator: {
      name: 'Hamza Khan',
      niche: 'Tech & Unboxing',
      handle: '@hamzatech_pk',
      followers: '340K',
      avgViews: '210K',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'elite',
    name: 'Elite Slab',
    nameUr: 'ایلیٹ',
    reach: '500K - 1M Reach',
    color: '#0F172A',
    textColor: 'text-white',
    badge: 'Premier Star',
    avgPayout: 'PKR 300,000 - 600,000',
    description: 'Top-tier digital personalities with massive viral power across YouTube, TikTok, and Instagram.',
    sampleCreator: {
      name: 'Sarah Chaudhry',
      niche: 'Luxury Lifestyle',
      handle: '@sarah.ch_official',
      followers: '780K',
      avgViews: '490K',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&auto=format&fit=crop&q=80'
    }
  },
  {
    id: 'icon',
    name: 'Icon Slab',
    nameUr: 'آئیکن',
    reach: '1M+ Reach',
    color: '#D97706',
    textColor: 'text-white',
    badge: 'National Icon',
    avgPayout: 'PKR 750,000+',
    description: 'Celebrity-status creators defining nationwide trends with immense brand recall and sales velocity.',
    sampleCreator: {
      name: 'Ali Raza',
      niche: 'Entertainment & Comedy',
      handle: '@aliraza_vlogs',
      followers: '1.8M',
      avgViews: '1.2M',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
    }
  }
];

export function SlabSwitcher() {
  const [activeSlabId, setActiveSlabId] = useState('emerging');
  const activeSlab = SLABS.find(s => s.id === activeSlabId) || SLABS[1]!;

  return (
    <section className="py-24 bg-white text-[#0F172A] relative overflow-hidden border-t border-slate-200/60">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#635BFF] bg-[#635BFF]/10 px-4 py-1.5 rounded-full border border-[#635BFF]/20 inline-block font-bold">
            Creator Tiers & Network
          </span>
          <h2 className="text-4xl md:text-5xl font-urbanist font-extrabold text-[#0F172A]">Metapic Creator Slabs</h2>
          <p className="text-slate-600 text-lg font-urbanist">
            Every creator on UGC Stars is slab-rated based on real reach, audience authenticity, and conversion performance.
          </p>
        </div>

        {/* Switcher Bar */}
        <div className="flex justify-center mb-14">
          <div className="bg-[#FAF8F5] border border-slate-200 p-1.5 rounded-full flex items-center gap-1.5 max-w-full overflow-x-auto scrollbar-none shadow-sm">
            {SLABS.map(slab => {
              const isActive = slab.id === activeSlabId;
              return (
                <button
                  key={slab.id}
                  onClick={() => setActiveSlabId(slab.id)}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full text-xs font-bold font-urbanist whitespace-nowrap transition-all duration-300",
                    isActive ? "text-white" : "text-slate-600 hover:text-[#635BFF]"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="slab-pill-active"
                      className="absolute inset-0 rounded-full shadow-md"
                      style={{ backgroundColor: slab.color }}
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {slab.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Slab Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlab.id}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="bg-[#FAF8F5] border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-xl grid md:grid-cols-12 gap-8 items-center text-left"
            >
              {/* Left Details */}
              <div className="md:col-span-7 space-y-5">
                <div className="flex items-center gap-3">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider font-urbanist" style={{ backgroundColor: activeSlab.color }}>
                    {activeSlab.badge}
                  </span>
                  <span className="text-sm font-semibold text-slate-500 font-mono">{activeSlab.reach}</span>
                </div>

                <div>
                  <h3 className="text-3xl font-urbanist font-extrabold text-[#0F172A] mb-2 flex items-baseline gap-2">
                    <span>{activeSlab.name}</span>
                    <span className="text-lg text-slate-400 font-normal">({activeSlab.nameUr})</span>
                  </h3>
                  <p className="text-slate-600 font-urbanist text-sm leading-relaxed">
                    {activeSlab.description}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-4">
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Avg Campaign Payout</span>
                    <span className="text-base font-bold text-[#635BFF] font-urbanist">{activeSlab.avgPayout}</span>
                  </div>
                  <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-sm">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Audience Reach</span>
                    <span className="text-base font-bold text-[#0F172A] font-urbanist">{activeSlab.reach}</span>
                  </div>
                </div>
              </div>

              {/* Right Sample Creator */}
              <div className="md:col-span-5">
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md relative text-left">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src={activeSlab.sampleCreator.avatar} 
                      alt={activeSlab.sampleCreator.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 shadow-md"
                    />
                    <div>
                      <h4 className="font-bold text-base text-[#0F172A] font-urbanist">{activeSlab.sampleCreator.name}</h4>
                      <p className="text-xs text-[#EC4899] font-bold font-urbanist">{activeSlab.sampleCreator.niche}</p>
                      <p className="text-xs text-slate-400 font-mono">{activeSlab.sampleCreator.handle}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-center">
                    <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase block font-mono">Followers</span>
                      <span className="text-sm font-bold text-[#0F172A] font-urbanist">{activeSlab.sampleCreator.followers}</span>
                    </div>
                    <div className="bg-[#FAF8F5] p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 uppercase block font-mono">Avg Reel Views</span>
                      <span className="text-sm font-bold text-[#635BFF] font-urbanist">{activeSlab.sampleCreator.avgViews}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 text-center">
                    <Link href="/creator/marketplace" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#635BFF] hover:underline font-urbanist">
                      Pitch Campaign Briefs ➔
                    </Link>
                  </div>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
