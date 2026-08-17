'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { Sparkles, ChevronDown } from 'lucide-react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const [openBrandsDropdown, setOpenBrandsDropdown] = React.useState(false);
  const [openCreatorsDropdown, setOpenCreatorsDropdown] = React.useState(false);
  const [openLoginDropdown, setOpenLoginDropdown] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState<'en' | 'ur'>('en');

  return (
    <div className="min-h-screen flex flex-col bg-[#071913] text-slate-100 font-sans">
      
      {/* GLASSMORPHIC TOP NAVBAR: Dark Green & Dark Slate Theme */}
      <header className="fixed top-0 left-0 w-full h-[72px] z-[100] backdrop-blur-md bg-[#05140F]/90 border-b border-emerald-900/40">
        <div className="max-w-[1280px] h-full mx-auto px-6 flex items-center justify-between">
          
          {/* Left: UGCstars Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#0E6E52] flex items-center justify-center text-white font-extrabold shadow-sm group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 fill-current text-[#34D399]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              UGC<span className="text-[#34D399]">stars</span>
            </span>
          </Link>

          {/* Center Menu Capsule */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-300">
            <div 
              className="relative py-2"
              onMouseEnter={() => setOpenCreatorsDropdown(true)}
              onMouseLeave={() => setOpenCreatorsDropdown(false)}
            >
              <button className="hover:text-white transition-colors flex items-center gap-1">
                <span className="text-[#34D399]">•</span>
                <span>For Creators</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {openCreatorsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-56 p-2 bg-[#0A261D] rounded-2xl border border-emerald-800/60 shadow-xl space-y-1 z-50 text-left"
                  >
                    <Link href="/onboard?role=creator" className="block p-2.5 rounded-xl hover:bg-[#0E3529] transition-colors">
                      <div className="font-bold text-xs text-white">Creator PPV Network</div>
                      <div className="text-[10px] text-slate-400">Earn per verified view</div>
                    </Link>
                    <Link href="/creator/slab-reveal" className="block p-2.5 rounded-xl hover:bg-[#0E3529] transition-colors">
                      <div className="font-bold text-xs text-white">Slab Calculator</div>
                      <div className="text-[10px] text-slate-400">Check follower tier rates</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative py-2"
              onMouseEnter={() => setOpenBrandsDropdown(true)}
              onMouseLeave={() => setOpenBrandsDropdown(false)}
            >
              <button className="hover:text-white transition-colors flex items-center gap-1">
                <span>For Brands</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <AnimatePresence>
                {openBrandsDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 w-60 p-2 bg-[#0A261D] rounded-2xl border border-emerald-800/60 shadow-xl space-y-1 z-50 text-left"
                  >
                    <Link href="/brand/dashboard" className="block p-2.5 rounded-xl hover:bg-[#0E3529] transition-colors">
                      <div className="font-bold text-xs text-white">Managed In-House Agency</div>
                      <div className="text-[10px] text-slate-400">End-to-end execution</div>
                    </Link>
                    <Link href="/brand/campaigns/new" className="block p-2.5 rounded-xl hover:bg-[#0E3529] transition-colors">
                      <div className="font-bold text-xs text-white">Self-Service Platform</div>
                      <div className="text-[10px] text-slate-400">Direct creator contracts</div>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="#about" className="hover:text-white transition-colors">
              About
            </Link>
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4 text-sm font-semibold">
            <button
              onClick={() => setSelectedLang(selectedLang === 'en' ? 'ur' : 'en')}
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors px-2 py-1"
            >
              <span className="text-base">🇵🇰</span>
              <span>{selectedLang === 'en' ? 'PK-EN' : 'PK-UR'}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            <div 
              className="relative hidden sm:block py-2"
              onMouseEnter={() => setOpenLoginDropdown(true)}
              onMouseLeave={() => setOpenLoginDropdown(false)}
            >
              <button className="text-slate-300 hover:text-white transition-colors px-2 py-1 flex items-center gap-1">
                <span>Log In</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {openLoginDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full right-0 w-44 p-2 bg-[#0A261D] rounded-2xl border border-emerald-800/60 shadow-xl space-y-1 z-50 text-left"
                  >
                    <Link href="/login?role=creator" className="block px-3 py-2 rounded-xl hover:bg-[#0E3529] text-xs font-bold text-white">
                      Log in as Creator
                    </Link>
                    <Link href="/login?role=brand" className="block px-3 py-2 rounded-xl hover:bg-[#0E3529] text-xs font-bold text-white">
                      Log in as Brand
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/signup">
              <button className="px-6 py-2.5 rounded-full bg-[#0E6E52] text-white font-semibold text-sm hover:bg-[#108A67] transition-all shadow-md hover:shadow-emerald-900/50">
                Sign Up
              </button>
            </Link>

          </div>

        </div>
      </header>

      {/* Main Page Area */}
      <main className="flex-1 w-full pt-[72px]">{children}</main>
    </div>
  );
}
