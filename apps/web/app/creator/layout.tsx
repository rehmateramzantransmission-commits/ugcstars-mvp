'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { LayoutDashboard, Compass, Video, Wallet, ShieldCheck, Settings, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageTransition } from '@/components/ui/page-transition';

const navItems = [
  { href: '/creator/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/creator/marketplace', label: 'Marketplace', icon: Compass },
  { href: '/creator/campaigns', label: 'My Campaigns', icon: Video },
  { href: '/creator/wallet', label: 'Wallet', icon: Wallet },
  { href: '/creator/verification', label: 'Verification', icon: ShieldCheck },
  { href: '/creator/kyc', label: 'CNIC Verification', icon: ShieldCheck },
];

export default function CreatorLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col md:flex-row text-[#0F172A] font-urbanist">
      
      {/* Section 4B: Left Sidebar Drawer (width: 260px fixed desktop) */}
      <aside className="hidden md:flex w-[260px] flex-col border-r border-slate-200 bg-white sticky top-0 h-screen shrink-0 z-40">
        <div className="h-[64px] px-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/creator/dashboard" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#0F172A] flex items-center justify-center text-white font-extrabold">
              <Sparkles className="w-3.5 h-3.5 text-[#EC4899]" />
            </div>
            <span className="text-lg font-extrabold tracking-tight text-[#0F172A]">UGCstars</span>
          </Link>
          <span className="text-[10px] font-bold text-[#EC4899] bg-[#EC4899]/10 px-2 py-0.5 rounded-full font-mono">
            CREATOR
          </span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1.5 mt-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className="block relative">
                {isActive && (
                  <motion.div
                    layoutId="creator-sidebar-active"
                    className="absolute inset-0 bg-[#0F172A] rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-bold text-xs",
                  isActive ? "text-white" : "text-slate-600 hover:text-[#0F172A] hover:bg-slate-100"
                )}>
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Profile" className="w-9 h-9 rounded-full object-cover border border-white shadow-sm" />
            <div className="flex-1 min-w-0 text-left">
              <p className="text-xs font-bold text-[#0F172A] truncate">Ayesha Malik</p>
              <p className="text-[10px] text-[#EC4899] font-mono font-bold">Emerging Slab</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area (Top App Bar: 64px, Max inner width: 1400px, p-6 lg:p-8) */}
      <main className="flex-1 flex flex-col min-h-screen w-full relative">
        <header className="h-[64px] border-b border-slate-100 bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
          <h2 className="text-sm font-extrabold text-[#0F172A] uppercase tracking-wider font-mono">
            Creator Workspace
          </h2>
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold font-mono text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              RAAST Payout Active
            </span>
          </div>
        </header>

        <PageTransition className="flex-1 p-6 lg:p-8 pb-24 md:pb-8 max-w-[1400px] w-full mx-auto">
          {children}
        </PageTransition>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200 flex justify-around items-center p-2 z-50">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="relative p-2 flex flex-col items-center gap-1 w-full">
              <item.icon className={cn("w-5 h-5", isActive ? "text-[#EC4899]" : "text-slate-400")} />
              <span className={cn("text-[9px] font-bold text-center", isActive ? "text-[#EC4899]" : "text-slate-400")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
