'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Eye, MessageSquare, Wallet, PieChart, LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  description: string;
  mockup: {
    type: string;
    title: string;
    stats: Array<{ label: string; val: string }>;
  };
}

const FEATURES: FeatureItem[] = [
  {
    id: 'slabs',
    title: 'Multi-Slab Percentage Budget Allocation',
    subtitle: 'Dynamic rate scaling based on creator tier followers',
    icon: PieChart,
    description: 'Allocate campaign budgets automatically across Rising (10K-50K), Emerging (50K-200K), Established (200K-500K), Elite (500K-1M), and Icon (1M+) creator slabs.',
    mockup: {
      type: 'slabs',
      title: 'Multi-Slab Tier Allocator',
      stats: [
        { label: 'Rising Slab (10K-50K)', val: 'RS. 0.10 / View' },
        { label: 'Emerging Slab (50K-200K)', val: 'RS. 0.15 / View' },
        { label: 'Established Slab (200K-500K)', val: 'RS. 0.20 / View' },
      ]
    }
  },
  {
    id: 'escrow',
    title: 'Automated Escrow Security',
    subtitle: '100% Tax-Compliant Safepay escrow vault',
    icon: ShieldCheck,
    description: 'Funds remain securely locked in Safepay escrow until creators submit approved content and real views are verified by our audit engine.',
    mockup: {
      type: 'escrow',
      title: 'Safepay Escrow Contract Vault',
      stats: [
        { label: 'Escrow Locked', val: 'PKR 250,000' },
        { label: 'FBR WHT Status', val: 'Filer Verified (10%)' },
        { label: 'Disbursement Status', val: 'Locked Until Release' }
      ]
    }
  },
  {
    id: 'ppv',
    title: 'Pay-Per-View Engine',
    subtitle: 'Pay strictly for performance, not promises',
    icon: Eye,
    description: 'Track real-time engagement and view counts with sub-second accuracy. Never overpay for inactive bot accounts or fake impressions.',
    mockup: {
      type: 'ppv',
      title: 'Live PPV Verification Engine',
      stats: [
        { label: 'Audited Views', val: '49,283 Verified' },
        { label: 'Bot Filter Audit', val: '99.8% Clean Pass' },
        { label: 'Calculated Payout', val: 'PKR 7,392' }
      ]
    }
  },
  {
    id: 'chat',
    title: 'Mediated Direct Negotiations',
    subtitle: 'Watermarked drafts & in-app contract chat',
    icon: MessageSquare,
    description: 'Brands and creators negotiate deliverables, attach brief assets, and review watermarked video drafts directly within a secure mediated portal.',
    mockup: {
      type: 'chat',
      title: 'In-App Mediated Deal Room',
      stats: [
        { label: 'Watermarked Reel Draft', val: 'Uploaded & Ready' },
        { label: 'Brand Feedback', val: 'Approved for Release' },
        { label: 'Contract Status', val: 'Active Contract' }
      ]
    }
  },
  {
    id: 'withdraw',
    title: 'Instant Local PKR Withdrawals',
    subtitle: 'Direct payouts to JazzCash, Easypaisa, or RAAST',
    icon: Wallet,
    description: 'Creators request instant payouts directly to local Pakistani mobile wallets or bank accounts with 0 hidden conversion fees.',
    mockup: {
      type: 'withdraw',
      title: 'RAAST Instant Disbursal Panel',
      stats: [
        { label: 'Payout Method', val: 'RAAST / JazzCash' },
        { label: 'Requested Amount', val: 'PKR 145,000' },
        { label: 'Transfer Time', val: 'Instant (< 2 mins)' }
      ]
    }
  }
];

export function FeatureMatrixSection() {
  const [activeTab, setActiveTab] = useState(FEATURES[0]!.id);
  const activeFeature = FEATURES.find(f => f.id === activeTab) || FEATURES[0]!;
  const ActiveIcon = activeFeature.icon;

  return (
    <section className="bg-[#071913] py-20 font-sans border-t border-emerald-950/80">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] bg-[#0E6E52]/20 px-4 py-1.5 rounded-full border border-emerald-700/60 inline-block font-bold mb-3">
            Core Technology
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Interactive Feature Showcase
          </h2>
          <p className="text-slate-300 text-sm font-medium">
            Explore how UGCstars powers performance-driven creator collaborations across Pakistan.
          </p>
        </div>

        {/* SECTION 7 Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-center text-left">
          
          {/* 40% Left Navigation Menu */}
          <div className="lg:col-span-5 space-y-2">
            {FEATURES.map((feature) => {
              const isActive = feature.id === activeTab;
              const FeatureIcon = feature.icon;
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(feature.id)}
                  className={cn(
                    "w-full p-4 rounded-2xl border transition-all text-left flex items-start gap-3 cursor-pointer",
                    isActive
                      ? "bg-[#0E6E52] border-[#34D399] shadow-lg scale-[1.01]"
                      : "bg-[#0D261E] border-emerald-800/50 hover:bg-[#0E3529]"
                  )}
                >
                  <div className={cn(
                    "w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-bold transition-colors mt-0.5",
                    isActive ? "bg-[#05140F] text-[#34D399]" : "bg-emerald-950 text-slate-300 border border-emerald-800"
                  )}>
                    <FeatureIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className={cn("font-extrabold text-sm mb-0.5", isActive ? "text-white" : "text-slate-200")}>
                      {feature.title}
                    </h4>
                    <p className="text-xs text-slate-300 font-medium line-clamp-1">
                      {feature.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 60% Right Interactive Mockup Stage */}
          <div className="lg:col-span-7">
            <div className="bg-[#0D261E] border border-emerald-800/60 rounded-3xl p-8 shadow-xl min-h-[420px] flex flex-col justify-between relative overflow-hidden text-white">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFeature.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-emerald-800/60 pb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-emerald-950 text-[#34D399] flex items-center justify-center font-bold border border-emerald-800">
                        <ActiveIcon className="w-4 h-4" />
                      </div>
                      <h3 className="font-extrabold text-lg text-white">{activeFeature.mockup.title}</h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-[#34D399] bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700">
                      Live Preview
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 font-medium leading-relaxed">
                    {activeFeature.description}
                  </p>

                  <div className="space-y-3 bg-[#05140F] p-6 rounded-2xl border border-emerald-800/60">
                    {activeFeature.mockup.stats.map((stat, i) => (
                      <div key={i} className="flex justify-between items-center text-xs font-bold py-1 border-b border-emerald-900/60 last:border-none">
                        <span className="text-slate-300">{stat.label}</span>
                        <span className="text-[#34D399] font-mono">{stat.val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
