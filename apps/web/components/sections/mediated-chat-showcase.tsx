'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, ShieldCheck, Send } from 'lucide-react';

export function MediatedChatShowcaseSection() {
  const steps = [
    { title: '1. Direct Proposal', desc: 'Brand sends campaign parameters & PPV rate' },
    { title: '2. Escrow Lock', desc: 'Safepay holds funds securely upfront' },
    { title: '3. Draft Feedback', desc: 'Watermarked draft uploaded with timestamp comments' },
    { title: '4. View Release', desc: 'Automated milestone payout to creator wallet' }
  ];

  return (
    <section className="py-20 bg-[#090A0F] text-white border-t border-white/10 font-urbanist relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#D88CA8] bg-[#D88CA8]/10 px-4 py-1.5 rounded-full border border-[#D88CA8]/20 inline-block font-bold">
            Mediated Negotiations
          </span>
          <h2 className="text-3xl md:text-5xl font-urbanist font-extrabold text-white">
            Direct Contract & Escrow Mediation
          </h2>
          <p className="text-slate-400 text-sm md:text-base font-urbanist">
            No middleman confusion. Negotiate terms, review watermarked drafts, and confirm escrow locks in one integrated workspace.
          </p>
        </div>

        {/* Chat UI Mockup Container */}
        <div className="bg-[#12141D] border border-white/15 rounded-[2.5rem] p-6 md:p-10 shadow-2xl text-left grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Chat Window Mockup */}
          <div className="lg:col-span-7 bg-[#090A0F] border border-white/15 rounded-3xl shadow-xl p-5 space-y-4">
            
            {/* Chat Room Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D88CA8] text-white flex items-center justify-center font-bold text-xs">
                  L’O
                </div>
                <div>
                  <h4 className="font-extrabold text-xs text-white font-urbanist">L’Oréal Brand Manager</h4>
                  <span className="text-[9px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                    Safepay Verified Buyer
                  </span>
                </div>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold">
                Escrow Locked: PKR 150,000
              </div>
            </div>

            {/* Messages Thread */}
            <div className="space-y-3 text-xs max-h-[280px] overflow-y-auto pr-1">
              
              <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-slate-200 space-y-1 border border-white/10">
                <span className="text-[9px] font-mono text-slate-400 font-bold block">10:42 AM</span>
                <p className="font-medium">Hi Zainab! We'd like to contract 2x Instagram Reels. PPV Rate: <strong>RS. 0.18 per verified view</strong>.</p>
              </div>

              <div className="p-3 rounded-2xl bg-purple-500/20 border border-purple-500/30 text-purple-200 font-urbanist space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Escrow Contract Term Confirmation</span>
                </div>
                <div className="text-[10px] text-purple-300">
                  Safepay Vault Hold: <strong>PKR 150,000</strong> • Status: Locked & Ready
                </div>
              </div>

              <div className="bg-[#D88CA8] text-white p-3 rounded-2xl rounded-tr-none ml-auto max-w-[85%] space-y-1">
                <span className="text-[9px] font-mono text-pink-100 font-bold block">10:45 AM</span>
                <p className="font-medium">Deal confirmed! Here is the watermarked Reel draft preview for your review:</p>
                <div className="p-2 rounded-xl bg-black/20 border border-white/20 text-[10px] font-bold flex items-center justify-between mt-1">
                  <span>reel_draft_v1_watermarked.mp4</span>
                  <span className="text-emerald-300">Preview Ready</span>
                </div>
              </div>

              <div className="bg-white/10 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-slate-200 border border-white/10">
                <p className="font-bold text-emerald-400 mb-0.5">✔ Draft Approved by L'Oréal Team!</p>
                <p>You are cleared to publish! Milestone payout will trigger automatically as views reach 10K benchmarks.</p>
              </div>

            </div>

            <div className="pt-2 flex items-center gap-2 border-t border-white/10">
              <input
                disabled
                value="Contract terms locked & active..."
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs font-mono text-slate-400"
              />
              <button disabled className="p-2 rounded-xl bg-white/10 text-slate-400">
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Steps */}
          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D88CA8] font-bold block mb-1.5">
                Guaranteed Transparency
              </span>
              <h3 className="text-2xl md:text-3xl font-urbanist font-extrabold text-white mb-2">
                How Negotiation Works
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed font-urbanist">
                Brands and creators chat directly inside UGCstars with 100% escrow protection.
              </p>
            </div>

            <div className="space-y-2.5">
              {steps.map((s, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#D88CA8]/20 text-[#D88CA8] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-xs sm:text-sm text-white font-urbanist">{s.title}</h4>
                    <p className="text-[11px] text-slate-400 font-urbanist">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
