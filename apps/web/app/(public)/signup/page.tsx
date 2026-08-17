'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Building2, Sparkles, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function SignupPage() {
  return (
    <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 py-12 bg-[#FAF8F5] text-[#0F172A] font-urbanist">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl flex flex-col items-center text-center space-y-8"
      >
        <div className="space-y-3 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-widest text-[#EC4899] bg-[#EC4899]/10 px-4 py-1.5 rounded-full border border-[#EC4899]/20 inline-block font-bold">
            Metapic Portal Access
          </span>
          <h1 className="text-4xl md:text-6xl font-urbanist font-extrabold text-[#0F172A] tracking-tight">
            Join UGC Stars <span className="metapic-gradient-text">Metapic</span>
          </h1>
          <p className="text-slate-600 text-lg">
            Choose how you want to use the platform and boost your reach with performance-driven collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl pt-4">
          
          {/* Brand Card */}
          <Link href="/onboard?role=brand" className="block w-full text-left group">
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-slate-200 hover:border-[#635BFF] rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#635BFF]/10 text-[#635BFF] flex items-center justify-center mb-6 group-hover:bg-[#635BFF] group-hover:text-white transition-colors duration-300 shadow-md">
                  <Building2 size={28} />
                </div>
                <h2 className="text-2xl font-bold font-urbanist text-[#0F172A] mb-3 group-hover:text-[#635BFF] transition-colors">
                  I'm a Brand / Agency
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  Launch campaigns, connect with verified slab creators, review watermarked drafts, and scale with transparent ROI.
                </p>
              </div>

              <div className="w-full py-4 px-6 rounded-2xl bg-[#0F172A] text-white font-bold flex items-center justify-between text-sm shadow-md group-hover:bg-[#635BFF] transition-colors">
                <span>Start Brand Onboarding</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

          {/* Creator Card */}
          <Link href="/onboard?role=creator" className="block w-full text-left group">
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white border-2 border-slate-200 hover:border-[#EC4899] rounded-[2.5rem] p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#EC4899]/15 text-[#EC4899] flex items-center justify-center mb-6 group-hover:bg-[#EC4899] group-hover:text-white transition-colors duration-300 shadow-md">
                  <Sparkles size={28} />
                </div>
                <h2 className="text-2xl font-bold font-urbanist text-[#0F172A] mb-3 group-hover:text-[#EC4899] transition-colors">
                  I'm a Creator
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed mb-8">
                  Monetize your content with tracked links, pitch creative plans to top brands, and withdraw earnings instantly via RAAST.
                </p>
              </div>

              <div className="w-full py-4 px-6 rounded-2xl bg-[#EC4899] text-white font-bold flex items-center justify-between text-sm shadow-md group-hover:bg-[#d93888] transition-colors">
                <span>Start Creator Onboarding</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </Link>

        </div>
      </motion.div>
    </div>
  );
}
