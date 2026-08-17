'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export function FooterBannerSection() {
  return (
    <footer className="bg-[#05140F] pt-16 pb-12 font-sans border-t border-emerald-950/80 text-white">
      
      {/* Pre-Footer Banner */}
      <div className="max-w-[1280px] mx-auto px-6 mb-16">
        <div className="bg-[#0D261E] text-white rounded-3xl p-10 lg:p-14 text-center relative overflow-hidden shadow-2xl border border-emerald-800/60">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] bg-[#05140F]/80 px-4 py-1.5 rounded-full border border-emerald-700/60 inline-block font-bold">
              Get Started Today
            </span>
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to scale your content & reach across Pakistan?
            </h2>
            <p className="text-sm lg:text-base text-slate-300 font-medium">
              Join 100,000+ creators and top Pakistani brands on the country's first verified PPV network.
            </p>

            {/* Triple Action Pills */}
            <div className="flex flex-wrap justify-center items-center gap-3 pt-2">
              <Link href="/onboard?role=creator">
                <button className="px-6 py-3 rounded-full bg-[#0E6E52] text-white font-bold text-sm hover:bg-[#108A67] transition-all shadow-md cursor-pointer">
                  Sign up as Creator
                </button>
              </Link>
              <Link href="/onboard?role=brand">
                <button className="px-6 py-3 rounded-full bg-white text-[#05140F] font-bold text-sm hover:bg-slate-100 transition-all shadow-md cursor-pointer">
                  Sign up as Brand
                </button>
              </Link>
              <Link href="#agency">
                <button className="px-6 py-3 rounded-full bg-[#05140F] text-white border border-emerald-800 font-bold text-sm hover:bg-slate-900 transition-all cursor-pointer">
                  Book a Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Grid Architecture */}
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left pb-12 border-b border-emerald-900/60">
          
          {/* Column 1 */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#0E6E52] flex items-center justify-center text-white font-extrabold">
                <Sparkles className="w-4 h-4 text-[#34D399]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                UGC<span className="text-[#34D399]">stars</span>
              </span>
            </Link>
            <p className="text-xs text-slate-400 font-medium leading-relaxed">
              Pakistan’s first PPV-driven creator collaboration platform. Connect directly with trusted brands and get paid for performance, not promises.
            </p>
          </div>

          {/* Column 2 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#34D399] uppercase tracking-wider font-mono">Pakistan Hubs</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>📍 Karachi: DHA Phase 6, Main Khayaban-e-Ittehad</li>
              <li>📍 Lahore: Gulberg III, MM Alam Road</li>
              <li>📍 Islamabad: Blue Area, Sector F-6</li>
              <li>📍 Faisalabad: Civil Lines Office Hub</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#34D399] uppercase tracking-wider font-mono">Navigation</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li><Link href="/onboard?role=creator" className="hover:text-white transition-colors">For Creators</Link></li>
              <li><Link href="/onboard?role=brand" className="hover:text-white transition-colors">For Brands</Link></li>
              <li><Link href="/creator/marketplace" className="hover:text-white transition-colors">PPV Marketplace</Link></li>
              <li><Link href="/creator/slab-reveal" className="hover:text-white transition-colors">Creator Slabs</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-sm text-[#34D399] uppercase tracking-wider font-mono">Legal & Compliance</h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li><Link href="#privacy" className="hover:text-white transition-colors">PK Privacy Policy</Link></li>
              <li><Link href="#terms" className="hover:text-white transition-colors">Advertiser Terms of Service</Link></li>
              <li><Link href="#escrow" className="hover:text-white transition-colors">Safepay Escrow Rules</Link></li>
              <li><Link href="#fbr" className="hover:text-white transition-colors">FBR Tax Compliance (WHT)</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 font-mono font-medium">
          <p>© 2026 UGCstars Pakistan. All rights reserved.</p>
          <p>Built for the Pakistani Creator Economy 🇵🇰</p>
        </div>

      </div>

    </footer>
  );
}
