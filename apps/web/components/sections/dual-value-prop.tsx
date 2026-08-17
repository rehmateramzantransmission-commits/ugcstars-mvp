'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ShieldCheck, Wallet, ArrowRight, Sparkles } from 'lucide-react';

export function DualValuePropSection() {
  return (
    <section className="bg-[#071913] py-20 font-sans border-t border-emerald-950/80">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Card (For Brands) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="bg-[#0A261D] border border-emerald-800/60 rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[460px] text-left shadow-lg hover:shadow-emerald-900/30 transition-shadow"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#0E6E52] text-white text-xs font-extrabold uppercase tracking-wider">
                  For Brands
                </span>
                <span className="text-xs text-[#34D399] font-bold font-mono">Verified PPV Engine</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                Optimize ROI with Escrow & PPV
              </h3>

              <p className="text-sm lg:text-base text-slate-300 font-medium leading-relaxed mb-6">
                Stop paying flat upfront fees for unverified posts. Lock campaign budgets in Nadra-verified escrow and pay only when real Pakistani views are delivered.
              </p>

              {/* Multi-Slab Budget Preview Graphic */}
              <div className="bg-[#05140F] p-4 rounded-2xl border border-emerald-800/60 shadow-sm space-y-2 mb-6">
                <div className="flex justify-between items-center text-xs font-bold text-slate-200">
                  <span>Rising Slab (10K-50K Followers)</span>
                  <span className="text-[#34D399] font-mono">RS. 0.12 / View</span>
                </div>
                <div className="w-full h-2 bg-emerald-950 rounded-full overflow-hidden">
                  <div className="h-full bg-[#34D399] w-[65%]" />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Safepay Escrow Locked</span>
                  <span>100% Tax Compliant (FBR)</span>
                </div>
              </div>
            </div>

            <Link href="/onboard?role=brand">
              <button className="px-6 py-3 rounded-full bg-[#0E6E52] hover:bg-[#108A67] text-white font-bold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer">
                <span>Start Brand Campaign</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </motion.div>

          {/* Right Card (For Creators) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-[#0D3327] border border-emerald-700/60 rounded-3xl p-8 lg:p-10 flex flex-col justify-between min-h-[460px] text-left shadow-lg hover:shadow-emerald-900/30 transition-shadow"
          >
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-[#108A67] text-white text-xs font-extrabold uppercase tracking-wider">
                  For Creators
                </span>
                <span className="text-xs text-emerald-200 font-bold font-mono">Instant Payouts</span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-4 leading-tight">
                Earn for the Impact You Make
              </h3>

              <p className="text-sm lg:text-base text-slate-200 font-medium leading-relaxed mb-6">
                Turn your passion into predictable earnings. Submit content plans, upload watermarked drafts, and cash out instantly to JazzCash, Easypaisa, or RAAST.
              </p>

              {/* PKR Payout Wallet Graphic */}
              <div className="bg-[#05140F] p-4 rounded-2xl border border-emerald-800/60 shadow-sm flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 text-[#34D399] flex items-center justify-center font-bold border border-emerald-800">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-extrabold text-xs text-white">Wallet Available Balance</h5>
                    <span className="text-[10px] text-slate-400 font-mono">Instant RAAST / IBFT Ready</span>
                  </div>
                </div>
                <span className="text-lg font-extrabold text-[#34D399] font-mono">PKR 145,000</span>
              </div>
            </div>

            <Link href="/onboard?role=creator">
              <button className="px-6 py-3 rounded-full bg-[#05140F] hover:bg-slate-900 text-white font-bold text-sm inline-flex items-center gap-2 transition-colors border border-emerald-800/60 cursor-pointer">
                <span>Join as a Creator</span>
                <ArrowRight className="w-4 h-4 text-[#34D399]" />
              </button>
            </Link>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
