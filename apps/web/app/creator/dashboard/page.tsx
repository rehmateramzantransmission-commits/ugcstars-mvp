'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Compass, Sparkles, Video, Wallet, ArrowRight, ShieldAlert } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export default function CreatorDashboard() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-14 w-full rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-[120px] rounded-2xl" />)}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <Skeleton className="h-80 rounded-2xl" />
          <Skeleton className="h-80 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-left font-urbanist">
      
      {/* Verification Alert Header */}
      <div className="bg-[#EC4899]/10 border border-[#EC4899]/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-[#EC4899] shrink-0" />
          <p className="text-xs sm:text-sm font-bold text-[#0F172A]">Complete your Nadra CNIC verification to unlock instant RAAST payouts.</p>
        </div>
        <Link href="/creator/kyc">
          <button className="px-4 py-2 rounded-xl bg-[#0F172A] text-white text-xs font-bold hover:bg-slate-800 transition-colors whitespace-nowrap">
            Verify CNIC Now
          </button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-urbanist font-extrabold text-[#0F172A] flex items-center gap-2">
            Welcome Back, Ayesha! <Sparkles className="w-5 h-5 text-[#EC4899]" />
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 font-medium">Emerging Slab • 2 New PPV Campaign Matches</p>
        </div>
        <Link href="/creator/marketplace">
          <button className="metapic-dot-btn !py-2.5 !px-5 !text-xs">
            <Compass className="w-4 h-4" />
            <span>Explore Marketplace</span>
          </button>
        </Link>
      </div>

      {/* Section 4B: Metric Summary Stat Cards (grid-cols-1 sm:grid-cols-2 lg:grid-cols-4, gap-5, height 120px, p-5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="h-[120px] p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase font-mono">Active Campaigns</span>
            <Video className="w-4 h-4 text-[#EC4899]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A]">2 Briefs</div>
        </div>

        <div className="h-[120px] p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase font-mono">Pending Drafts</span>
            <Sparkles className="w-4 h-4 text-[#635BFF]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A]">1 Revision</div>
        </div>

        <div className="h-[120px] p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase font-mono">Wallet Balance</span>
            <Wallet className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-mono">PKR 45,000</div>
        </div>

        <div className="h-[120px] p-5 bg-white border border-slate-200/80 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex justify-between items-center text-slate-500">
            <span className="text-xs font-bold uppercase font-mono">Lifetime Disbursed</span>
            <Wallet className="w-4 h-4 text-[#0F172A]" />
          </div>
          <div className="text-2xl font-extrabold text-[#0F172A] font-mono">PKR 145,000</div>
        </div>
      </div>

      {/* Section 4B: Campaign Lists / Table (rounded-2xl, border border-slate-200/80, header h-12, row h-16) */}
      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Active Campaigns Table/List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-urbanist font-extrabold text-[#0F172A]">Current Deliverables</h2>
            <Link href="/creator/campaigns" className="text-xs font-bold text-[#EC4899] hover:underline flex items-center gap-1">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          
          <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
            <div className="h-12 bg-slate-50 px-4 flex items-center justify-between border-b border-slate-200/80 text-xs font-bold text-slate-500 font-mono">
              <span>CAMPAIGN</span>
              <span>STATUS</span>
            </div>
            
            <div className="h-16 px-4 flex items-center justify-between border-b border-slate-100 text-xs">
              <div>
                <h4 className="font-extrabold text-[#0F172A]">L'Oréal Summer Glow</h4>
                <span className="text-[10px] text-slate-400 font-mono">Reel Draft • RS. 0.18 / View</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold text-[10px]">
                Revision Needed
              </span>
            </div>

            <div className="h-16 px-4 flex items-center justify-between text-xs">
              <div>
                <h4 className="font-extrabold text-[#0F172A]">Khaadi Festive Lawn</h4>
                <span className="text-[10px] text-slate-400 font-mono">Video Link • RS. 0.20 / View</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold text-[10px]">
                Live & Earning
              </span>
            </div>
          </div>
        </div>

        {/* Recommended Campaigns */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-urbanist font-extrabold text-[#0F172A]">Recommended PPV Briefs</h2>
          </div>
          
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-[#0F172A]">Samsung Tech Unboxing</h4>
                <p className="text-xs text-slate-500 font-mono">Samsung PK • RS. 0.25 / Verified View</p>
              </div>
              <Link href="/creator/marketplace">
                <button className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">
                  Pitch Brief
                </button>
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-sm text-[#0F172A]">Foodpanda Mukbang</h4>
                <p className="text-xs text-slate-500 font-mono">Foodpanda PK • RS. 0.15 / Verified View</p>
              </div>
              <Link href="/creator/marketplace">
                <button className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800">
                  Pitch Brief
                </button>
              </Link>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
