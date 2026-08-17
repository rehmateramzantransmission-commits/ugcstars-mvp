'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Globe, Menu, X, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

export function UgcstarsHeader() {
  const [isMobileOpen, setIsMobileOpen] = React.useState(false);
  const [openLangDropdown, setOpenLangDropdown] = React.useState(false);
  const [openLoginDropdown, setOpenLoginDropdown] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState('En');

  const languages = ['En', 'De', 'Es', 'Pl', 'Sv', 'It', 'Fr', 'Nl'];

  return (
    <header className="fixed top-0 left-0 w-full h-[80px] z-[999] bg-[#0A0A0E] text-white flex items-center justify-center px-6 sm:px-12 border-b border-white/10 shadow-lg backdrop-blur-md">
      <div className="w-full max-w-[1360px] mx-auto flex items-center justify-between">
        
        {/* Left: UGCstars Clean Premium Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#1A1A24] border border-white/10 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform">
            <Star className="w-4 h-4 text-[#EC4899] fill-[#EC4899]" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-white font-sans">
            UGC<span className="text-[#EC4899]">stars</span>
          </span>
        </Link>

        {/* Center: Dark Capsule Navigation Bar */}
        <nav className="hidden lg:flex items-center gap-1.5 bg-[#16161F] border border-white/10 px-3 py-1.5 rounded-full shadow-inner text-xs font-semibold">
          
          {/* Active Item: For Creators */}
          <Link
            href="/onboard?role=creator"
            className="bg-[#292938] text-white px-4 py-1.5 rounded-full flex items-center gap-2 font-bold transition-all shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#EC4899] animate-pulse" />
            <span>For Creators</span>
          </Link>

          {/* Inactive Item: For Brands */}
          <Link
            href="/brand/dashboard"
            className="text-white/70 hover:text-white px-4 py-1.5 rounded-full font-medium transition-colors"
          >
            For Brands
          </Link>

          {/* Inactive Item: About */}
          <Link
            href="#about"
            className="text-white/70 hover:text-white px-4 py-1.5 rounded-full font-medium transition-colors"
          >
            About
          </Link>

        </nav>

        {/* Right Controls: Language, Log In, Sign Up */}
        <div className="hidden lg:flex items-center gap-5">
          
          {/* Locale Switcher */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenLangDropdown(true)}
            onMouseLeave={() => setOpenLangDropdown(false)}
          >
            <button className="flex items-center gap-1 text-white/80 hover:text-white font-medium text-xs py-1">
              <Globe className="w-3.5 h-3.5 text-white/60" />
              <span>{selectedLang}</span>
              <ChevronDown className="w-3 h-3 text-white/40" />
            </button>

            <AnimatePresence>
              {openLangDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full right-0 w-24 p-1.5 bg-[#16161F] rounded-xl border border-white/10 shadow-2xl z-[1000] text-left"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang);
                        setOpenLangDropdown(false);
                      }}
                      className={cn(
                        "w-full px-3 py-1 rounded-lg text-xs font-medium text-left hover:bg-white/10 transition-colors",
                        selectedLang === lang ? "text-[#EC4899] font-bold" : "text-white/80"
                      )}
                    >
                      {lang}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Log In */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenLoginDropdown(true)}
            onMouseLeave={() => setOpenLoginDropdown(false)}
          >
            <button className="text-white/90 hover:text-white font-semibold text-xs transition-colors py-1">
              Log in
            </button>

            <AnimatePresence>
              {openLoginDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  className="absolute top-full right-0 w-40 p-2 bg-[#16161F] rounded-xl border border-white/10 shadow-2xl space-y-1 z-[1000] text-left"
                >
                  <Link href="/login?role=creator" className="block px-3 py-1.5 rounded-lg hover:bg-white/10 text-xs font-semibold text-white">
                    Log in as Creator
                  </Link>
                  <Link href="/login?role=brand" className="block px-3 py-1.5 rounded-lg hover:bg-white/10 text-xs font-semibold text-white">
                    Log in as Brand
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sign Up Pill Button */}
          <Link href="/signup">
            <button className="bg-white hover:bg-slate-100 text-[#0A0A0E] font-extrabold text-xs px-6 py-2.5 rounded-full transition-all shadow-sm hover:scale-105 cursor-pointer">
              Sign up
            </button>
          </Link>

        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {isMobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed inset-0 top-[80px] bg-[#0A0A0E] z-[998] p-6 flex flex-col justify-between overflow-y-auto lg:hidden"
          >
            <div className="space-y-4 pt-2 text-left">
              <Link
                href="/onboard?role=creator"
                onClick={() => setIsMobileOpen(false)}
                className="w-full bg-[#16161F] text-white px-5 py-3 rounded-full flex items-center gap-3 text-sm font-bold border border-white/10"
              >
                <span className="w-2 h-2 rounded-full bg-[#EC4899] animate-pulse" />
                <span>For Creators</span>
              </Link>

              <Link
                href="/brand/dashboard"
                onClick={() => setIsMobileOpen(false)}
                className="block text-white text-base font-semibold py-2.5 border-b border-white/10"
              >
                For Brands
              </Link>

              <Link
                href="#about"
                onClick={() => setIsMobileOpen(false)}
                className="block text-white text-base font-semibold py-2.5 border-b border-white/10"
              >
                About
              </Link>
            </div>

            <div className="space-y-3 pt-6 border-t border-white/10">
              <Link href="/login?role=creator" onClick={() => setIsMobileOpen(false)} className="block w-full">
                <button className="w-full py-3 rounded-full bg-white/10 text-white font-bold text-sm">
                  Log in
                </button>
              </Link>

              <Link href="/signup" onClick={() => setIsMobileOpen(false)} className="block w-full">
                <button className="w-full py-3 rounded-full bg-[#EC4899] text-white font-bold text-sm">
                  Sign up
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
