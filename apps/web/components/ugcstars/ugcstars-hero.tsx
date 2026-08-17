'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, MessageSquare, CheckCircle2, TrendingUp } from 'lucide-react';

export function UgcstarsHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll distance listener over the 200vh sticky track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const translateY = useTransform(scrollYProgress, [0, 0.45, 0.9], ['0px', '-520px', '-1040px']);

  return (
    <section 
      ref={containerRef} 
      className="hero-scroll-track relative w-full min-h-[110vh] lg:min-h-[140vh] bg-[#071913] text-white font-sans"
    >
      
      {/* Sticky Viewport Stage */}
      <div className="hero-sticky-stage sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center pt-28 sm:pt-32 pb-4">
        
        {/* Header Title & CTA Block */}
        <div className="hero-text-block text-center max-w-[1360px] mx-auto px-6 z-30 shrink-0">
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-3xl sm:text-5xl lg:text-[56px] font-extrabold text-white tracking-[-0.025em] leading-[1.1] mb-3"
          >
            Where Verified Views Turn Content into{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#34D399] via-[#A7F3D0] to-[#6EE7B7]">
              Career
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-xs sm:text-sm lg:text-base text-slate-300 max-w-xl mx-auto mb-4 leading-relaxed font-medium"
          >
            Pakistan’s first PPV-driven collaboration platform. Connect directly with trusted brands and get paid for performance, not promises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex justify-center"
          >
            <Link href="/onboard?role=creator">
              <button className="bg-[#0E6E52] hover:bg-[#108A67] text-white font-extrabold text-xs sm:text-sm px-8 py-3 rounded-full shadow-md transition-all hover:scale-105 cursor-pointer">
                Sign up as a Creator
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Main Masonry Grid Stage */}
        <div className="masonry-stage max-w-[1400px] w-full mx-auto px-4 flex justify-center items-center gap-4 overflow-x-auto no-scrollbar my-auto z-20">
          
          {/* LEFT MASONRY BLOCK */}
          <div className="hidden lg:flex items-center gap-3.5 shrink-0">
            
            {/* Column 1 */}
            <div className="flex flex-col gap-3.5 w-[155px]">
              <div className="h-[250px] w-full rounded-3xl overflow-hidden shadow-sm border border-emerald-900/60 relative group">
                <img 
                  src="/images/pakistani_creator_1.jpg" 
                  alt="Pakistani Female Creator" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-[72px] w-full rounded-2xl overflow-hidden shadow-sm border border-emerald-900/60">
                <img src="/images/shan_foods_logo.jpg" alt="Shan Foods PK Logo" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-3.5 w-[155px]">
              <div className="h-[72px] w-full rounded-2xl overflow-hidden shadow-sm border border-emerald-900/60">
                <img src="/images/khaadi_brand_logo.jpg" alt="Khaadi Brand Logo" className="w-full h-full object-cover" />
              </div>
              <div className="h-[250px] w-full rounded-3xl overflow-hidden shadow-sm border border-emerald-900/60 relative group">
                <img 
                  src="/images/pakistani_creator_2.jpg" 
                  alt="Pakistani Male Creator" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-3.5 w-[155px]">
              <div className="h-[155px] w-full rounded-3xl overflow-hidden shadow-sm border border-emerald-900/60 relative group">
                <img 
                  src="/images/pakistani_creator_3.jpg" 
                  alt="Pakistani Fashion Influencer" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-[155px] w-full rounded-3xl overflow-hidden shadow-sm border border-emerald-900/60 relative group">
                <img 
                  src="/images/pakistani_creator_4.jpg" 
                  alt="Pakistani Tech Vlogger" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

          </div>

          {/* Scroll Bar Pill */}
          <div className="hidden sm:block w-1.5 h-28 bg-emerald-950 rounded-full relative overflow-hidden shrink-0 border border-emerald-900/50">
            <div className="w-full h-10 bg-[#0E6E52] rounded-full absolute top-4" />
          </div>

          {/* CENTER SMARTPHONE MOCKUP FRAME */}
          <div className="w-[280px] sm:w-[300px] h-[520px] sm:h-[550px] rounded-[44px] bg-black border-4 border-emerald-900 shadow-2xl p-2 shrink-0 relative overflow-hidden text-left flex flex-col justify-between my-auto">
            
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-26 h-3.5 bg-slate-950 rounded-full z-40" />

            <div className="w-full h-full rounded-[36px] overflow-hidden bg-[#0A1F18] relative">
              
              <motion.div 
                style={{ y: translateY }}
                className="phone-screen-slider flex flex-col w-full transition-transform duration-100 ease-out"
              >
                
                {/* Screen 1: Brand Discovery */}
                <div className="screen-item h-[520px] w-full p-4 pt-8 bg-gradient-to-b from-[#0E3025] to-[#0A1F18] flex flex-col justify-between text-left text-white">
                  <div className="space-y-2.5">
                    <div className="border-b border-emerald-800/60 pb-2">
                      <h4 className="font-extrabold text-xs text-white flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-[#34D399]" /> Discover Brands
                        </span>
                        <span className="text-[9px] font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700/60">Step 01</span>
                      </h4>
                    </div>

                    <div className="p-2.5 bg-[#0D261E] rounded-2xl border border-emerald-800/60 shadow-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl overflow-hidden bg-emerald-950 flex items-center justify-center shrink-0">
                            <img src="/images/khaadi_brand_logo.jpg" alt="Khaadi Logo" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-white">Khaadi Pret</h5>
                            <span className="text-[9px] text-slate-400 block font-mono">20,283 views</span>
                          </div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#0D261E] rounded-2xl border border-emerald-800/60 shadow-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl overflow-hidden bg-emerald-950 flex items-center justify-center shrink-0">
                            <img src="/images/foodpanda_brand_logo.jpg" alt="Foodpanda Logo" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-white">Foodpanda PK</h5>
                            <span className="text-[9px] text-slate-400 block font-mono">15,250 clicks</span>
                          </div>
                        </div>
                        <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700">Active</span>
                      </div>
                    </div>

                    <div className="p-2.5 bg-[#0D261E] rounded-2xl border border-emerald-800/60 shadow-sm space-y-1">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xl overflow-hidden bg-emerald-950 flex items-center justify-center shrink-0">
                            <img src="/images/bykea_brand_logo.jpg" alt="Bykea Logo" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h5 className="font-extrabold text-xs text-white">Bykea Pakistan</h5>
                            <span className="text-[9px] text-slate-400 block font-mono">35,724 views</span>
                          </div>
                        </div>
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      </div>
                    </div>
                  </div>

                  <div className="text-center pb-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400">Scroll down for Direct Chat ➔</span>
                  </div>
                </div>

                {/* Screen 2: Direct Chat */}
                <div className="screen-item h-[520px] w-full p-4 pt-8 bg-gradient-to-b from-[#0A261D] to-[#071913] flex flex-col justify-between text-left text-white">
                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2 mb-3">
                      <span className="text-xs font-extrabold text-white flex items-center gap-1">
                        <MessageSquare className="w-3.5 h-3.5 text-[#34D399]" /> Direct Negotiations
                      </span>
                      <span className="text-[9px] font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700/60">Step 02</span>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="p-2.5 rounded-2xl bg-[#0D261E] text-slate-200 font-medium border border-emerald-900/60">
                        Escrow deposit of PKR 150,000 locked in contract!
                      </div>
                      <div className="p-2.5 rounded-2xl bg-[#0E6E52] text-white font-medium shadow-md">
                        Watermarked draft uploaded for brand review.
                      </div>
                      <div className="p-2.5 rounded-2xl bg-emerald-950 text-emerald-300 font-bold flex items-center gap-1.5 border border-emerald-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>Draft Approved & Escrow Disbursed</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pb-1">
                    <span className="text-[9px] font-mono font-bold text-slate-400">Scroll down for PPV graph ➔</span>
                  </div>
                </div>

                {/* Screen 3: PPV Analytics */}
                <div className="screen-item h-[520px] w-full p-4 pt-8 bg-gradient-to-b from-[#0E3025] to-[#071913] flex flex-col justify-between text-left text-white">
                  <div>
                    <div className="flex items-center justify-between border-b border-emerald-800/60 pb-2 mb-3">
                      <span className="text-xs font-extrabold text-white flex items-center gap-1">
                        <TrendingUp className="w-3.5 h-3.5 text-[#34D399]" /> PPV Earnings Analytics
                      </span>
                      <span className="text-[9px] font-mono font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700/60">Step 03</span>
                    </div>

                    <div className="p-2.5 bg-[#0D261E] rounded-2xl shadow-sm border border-emerald-800/60 space-y-2">
                      <div className="flex justify-between items-center text-[9px] font-mono text-slate-300 font-bold">
                        <span>Verified Views</span>
                        <span className="text-[#34D399]">● Rate RS. 0.20</span>
                      </div>

                      <div className="h-16 w-full relative flex items-end justify-between px-1 border-b border-l border-emerald-800/80">
                        <div className="h-[30%] w-2.5 bg-emerald-800 rounded-t" />
                        <div className="h-[50%] w-2.5 bg-emerald-700 rounded-t" />
                        <div className="h-[80%] w-2.5 bg-emerald-600 rounded-t" />
                        <div className="h-[100%] w-2.5 bg-[#34D399] rounded-t relative">
                          <div className="absolute -top-3 -left-3 bg-[#05140F] text-white text-[7px] font-mono font-bold px-1 rounded border border-emerald-600 shadow">
                            49K Views
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between text-[8px] font-mono text-slate-400 font-bold">
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>May</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5 bg-[#05140F] text-white rounded-2xl flex items-center justify-between text-xs font-bold border border-emerald-900 shadow-md">
                    <span>Monthly Disbursed:</span>
                    <span className="font-mono text-[#34D399] text-xs">PKR 145,000</span>
                  </div>
                </div>

              </motion.div>

            </div>

          </div>

          {/* RIGHT MASONRY BLOCK */}
          <div className="hidden lg:flex items-center gap-3.5 shrink-0">
            
            {/* Column 4 */}
            <div className="flex flex-col gap-3.5 w-[155px]">
              <div className="h-[190px] w-full rounded-3xl overflow-hidden shadow-sm border border-emerald-900/60 relative group">
                <img 
                  src="/images/pakistani_creator_3.jpg" 
                  alt="Pakistani Creator" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-[72px] w-full rounded-2xl overflow-hidden shadow-sm border border-emerald-900/60">
                <img src="/images/jazzcash_logo.jpg" alt="JazzCash PK Logo" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Column 5 */}
            <div className="flex flex-col gap-3.5 w-[155px]">
              <div className="h-[72px] w-full rounded-2xl overflow-hidden shadow-sm border border-emerald-900/60">
                <img src="/images/foodpanda_brand_logo.jpg" alt="Foodpanda Brand Logo" className="w-full h-full object-cover" />
              </div>
              <div className="h-[230px] w-full rounded-3xl overflow-hidden shadow-sm border border-emerald-900/60 relative group">
                <img 
                  src="/images/pakistani_creator_1.jpg" 
                  alt="Pakistani Influencer" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Column 6 */}
            <div className="flex flex-col gap-3.5 w-[155px]">
              <div className="h-[250px] w-full rounded-3xl overflow-hidden shadow-sm border border-emerald-900/60 relative group">
                <img 
                  src="/images/pakistani_creator_2.jpg" 
                  alt="Pakistani Creator" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-[72px] w-full rounded-2xl overflow-hidden shadow-sm border border-emerald-900/60">
                <img src="/images/bykea_brand_logo.jpg" alt="Bykea Brand Logo" className="w-full h-full object-cover" />
              </div>
            </div>

          </div>

        </div>

        {/* Scroll Indicator Cue */}
        <div className="text-center pb-2 shrink-0">
          <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
            Scroll down to enter next section ⬇
          </span>
        </div>

      </div>

    </section>
  );
}
