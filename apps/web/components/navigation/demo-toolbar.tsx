'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building2, 
  Sparkles, 
  ShieldCheck, 
  Wallet, 
  Compass, 
  PlusCircle, 
  Layers, 
  ChevronUp, 
  ChevronDown,
  Rocket,
  Award
} from 'lucide-react';

export function DemoToolbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const quickLinks = [
    { label: 'Landing', href: '/', icon: Rocket },
    { label: 'Role Select', href: '/signup', icon: Layers },
    { label: 'Brand Hub', href: '/brand/dashboard', icon: Building2 },
    { label: 'New Campaign', href: '/brand/campaigns/new', icon: PlusCircle },
    { label: 'Marketplace', href: '/creator/marketplace', icon: Compass },
    { label: 'Slab Reveal', href: '/creator/slab-reveal', icon: Award },
    { label: 'Creator Wallet', href: '/creator/wallet', icon: Wallet },
    { label: 'Admin Command', href: '/admin/dashboard', icon: ShieldCheck },
  ];

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
            className="bg-black/85 backdrop-blur-2xl border border-white/15 text-white rounded-full p-2 pl-4 pr-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center gap-2 max-w-[95vw] overflow-x-auto scrollbar-none"
          >
            <div className="flex items-center gap-2 pr-3 border-r border-white/10 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">
                Investor Demo Mode
              </span>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              {quickLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-[#0E6E52] to-[#0B5A43] text-white shadow-lg shadow-[#0E6E52]/30'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors shrink-0 ml-1"
              title="Minimize Toolbar"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsOpen(true)}
            className="bg-black/90 backdrop-blur-xl border border-white/20 text-white rounded-full px-4 py-2 text-xs font-semibold shadow-2xl flex items-center gap-2 hover:bg-black transition-all hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5 text-saffron-400 animate-pulse" />
            <span>Investor Demo Bar</span>
            <ChevronUp className="w-3.5 h-3.5 text-white/50" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
