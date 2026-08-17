'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calculator, Sparkles, Wallet } from 'lucide-react';

export function EarningsCalculatorSection() {
  const [views, setViews] = useState<number>(10000);
  const [ppvRate, setPpvRate] = useState<number>(0.15);
  const [posts, setPosts] = useState<number>(8);

  const monthlyEarnings = Math.round(views * ppvRate * posts);

  return (
    <section className="bg-[#071913] py-20 font-sans border-t border-emerald-950/80">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="max-w-4xl mx-auto bg-[#0D261E] border border-emerald-800/60 rounded-3xl p-8 lg:p-10 shadow-xl text-left text-white">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/60 pb-6 mb-8">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] bg-[#0E6E52]/20 px-3.5 py-1 rounded-full border border-emerald-700/60 inline-block font-bold mb-2">
                Calculator
              </span>
              <h3 className="text-2xl font-extrabold text-white">Estimate Your Monthly PPV Earnings</h3>
            </div>

            <div className="px-4 py-2 rounded-full bg-[#05140F] text-white font-mono text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto shadow-sm border border-emerald-800">
              <span>🇵🇰 Currency:</span>
              <span className="text-[#34D399] font-extrabold">PKR (RS.)</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Controls */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Slider 1 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-200">Average Verified Views / Post</span>
                  <span className="text-[#34D399] font-mono text-sm">{views.toLocaleString()} Views</span>
                </div>
                <input 
                  type="range" 
                  min={500} 
                  max={50000} 
                  step={500}
                  value={views} 
                  onChange={(e) => setViews(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#34D399]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>500 Views</span>
                  <span>50,000 Views</span>
                </div>
              </div>

              {/* Slider 2 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-200">PPV Rate per View</span>
                  <span className="text-[#34D399] font-mono text-sm">RS. {ppvRate.toFixed(2)} / View</span>
                </div>
                <input 
                  type="range" 
                  min={0.05} 
                  max={0.50} 
                  step={0.01}
                  value={ppvRate} 
                  onChange={(e) => setPpvRate(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#34D399]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>RS. 0.05</span>
                  <span>RS. 0.50</span>
                </div>
              </div>

              {/* Slider 3 */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-slate-200">Posts per Month</span>
                  <span className="text-[#34D399] font-mono text-sm">{posts} Posts</span>
                </div>
                <input 
                  type="range" 
                  min={1} 
                  max={30} 
                  step={1}
                  value={posts} 
                  onChange={(e) => setPosts(Number(e.target.value))}
                  className="w-full h-2 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#34D399]"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1 Post</span>
                  <span>30 Posts</span>
                </div>
              </div>

            </div>

            {/* Dynamic Output Card */}
            <div className="lg:col-span-5">
              <div className="bg-[#05140F] text-white rounded-2xl p-6 flex flex-col justify-between min-h-[260px] shadow-xl border border-emerald-800">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 font-bold block">
                    Estimated Monthly Payout
                  </span>
                  <div className="text-3xl lg:text-4xl font-extrabold text-[#34D399] font-mono">
                    PKR {monthlyEarnings.toLocaleString()}
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Formula: {views.toLocaleString()} views × RS. {ppvRate.toFixed(2)} × {posts} posts
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-emerald-900 text-xs font-medium text-slate-300">
                  <div className="flex justify-between">
                    <span>JazzCash / Easypaisa:</span>
                    <span className="text-[#34D399] font-bold">Supported</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAAST Instant Transfer:</span>
                    <span className="text-[#34D399] font-bold">Supported</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
