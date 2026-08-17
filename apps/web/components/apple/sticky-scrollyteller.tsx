'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { Wallet, Sparkles, Link2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  {
    id: 'step1',
    number: '01',
    title: 'Discover PPV Campaigns',
    subtitle: 'Pick a brief from top verified Pakistani brands',
    description: 'Select a product to promote from fashion, beauty, food, or tech campaigns, then generate your unique trackable link.',
    icon: Sparkles,
    tag: 'Pick a Campaign',
    image: '/images/pakistani_creator_1.jpg',
    stats: { label: 'Active Briefs', value: '500+ Verified' }
  },
  {
    id: 'step2',
    number: '02',
    title: 'Direct Contact & Draft Feedback',
    subtitle: 'Watermarked drafts & tracked link previews',
    description: 'Negotiate budget, submit concepts, and upload watermarked drafts for instant brand approval before public release.',
    icon: Link2,
    tag: 'Add Link & Share',
    image: '/images/pakistani_creator_3.jpg',
    stats: { label: 'Tracking Tech', value: 'Sub-second Analytics' }
  },
  {
    id: 'step3',
    number: '03',
    title: 'Earn with Verified Views',
    subtitle: 'Transparent dashboard & instant local payouts',
    description: 'Track clicks and escrow commissions all in one place. Money releases automatically to your wallet via JazzCash, Easypaisa, or RAAST.',
    icon: Wallet,
    tag: 'Earn & Withdraw',
    image: '/images/pakistani_creator_2.jpg',
    stats: { label: 'Local Payouts', value: 'Instant RAAST / IBFT' }
  }
];

export function StickyScrollyteller() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const step = Math.min(Math.floor(latest * STEPS.length), STEPS.length - 1);
    if (step !== activeIndex && step >= 0) {
      setActiveIndex(step);
    }
  });

  const activeStep = STEPS[activeIndex] || STEPS[0]!;

  return (
    <section ref={containerRef} className="relative min-h-[140vh] bg-[#071913] text-white py-20 border-t border-emerald-950/80 font-sans overflow-x-clip">
      
      <div className="max-w-[1280px] mx-auto px-6 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Cards Stack */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-2 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] bg-[#0E6E52]/20 px-4 py-1.5 rounded-full border border-emerald-700/60 inline-block font-bold">
                Workflow Engine
              </span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                Turn your content into income — in 3 simple steps.
              </h2>
            </div>

            {/* Stack of 3 Sequential Step Cards */}
            <div className="space-y-4">
              {STEPS.map((step, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveIndex(idx)}
                    className={cn(
                      "w-full p-6 rounded-3xl border transition-all duration-300 text-left flex items-start justify-between cursor-pointer",
                      isActive
                        ? "bg-[#0E6E52] border-[#34D399] shadow-xl scale-[1.01]"
                        : "bg-[#0D261E] border-emerald-800/60 hover:bg-[#0E3529]"
                    )}
                  >
                    <div className="flex items-start gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center font-extrabold text-sm shrink-0 transition-colors",
                        isActive ? "bg-[#05140F] text-[#34D399]" : "bg-emerald-950 text-slate-300 border border-emerald-800"
                      )}>
                        {step.number}
                      </div>
                      <div>
                        <h4 className={cn("font-extrabold text-base lg:text-lg mb-1", isActive ? "text-white" : "text-slate-200")}>
                          {step.title}
                        </h4>
                        <p className="text-xs lg:text-sm text-slate-300 font-medium leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    <span className={cn(
                      "w-3 h-3 rounded-full transition-all mt-2 shrink-0",
                      isActive ? "bg-[#34D399] animate-pulse" : "bg-slate-700"
                    )} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Stage */}
          <div className="lg:col-span-6 flex justify-center sticky top-[120px] pb-12">
            <div className="w-[320px] h-[620px] rounded-[40px] border-4 border-emerald-900 bg-black p-3 shadow-2xl relative overflow-hidden flex flex-col justify-between text-left">
              
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-3.5 bg-slate-950 rounded-full z-40" />

              <div className="w-full h-full rounded-[32px] bg-[#0A1F18] text-white overflow-hidden p-4 pt-9 flex flex-col justify-between relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep.id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.04 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full relative rounded-2xl overflow-hidden border border-emerald-800/60 flex flex-col justify-between"
                  >
                    <img 
                      src={activeStep.image} 
                      alt={activeStep.title}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05140F]/95 via-[#05140F]/40 to-transparent" />

                    <div className="relative z-10 p-3 bg-[#05140F]/90 backdrop-blur-md border border-emerald-800 m-3 rounded-xl flex items-center justify-between text-white">
                      <div className="flex items-center gap-1.5">
                        <activeStep.icon className="w-3.5 h-3.5 text-[#34D399]" />
                        <span className="text-xs font-bold font-sans">{activeStep.tag}</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-slate-400">{activeStep.number} of 03</span>
                    </div>

                    <div className="relative z-10 p-4 text-white space-y-1.5">
                      <span className="text-[10px] uppercase font-mono font-bold text-[#34D399] tracking-wider block">{activeStep.stats.label}</span>
                      <h4 className="text-xs font-extrabold font-sans text-white">{activeStep.subtitle}</h4>
                      <p className="text-[10px] text-slate-300 font-sans leading-relaxed">{activeStep.description}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
