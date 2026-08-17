'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { LayoutDashboard, Megaphone, Settings, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PageTransition } from '@/components/ui/page-transition';

const navItems = [
  { href: '/brand/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/brand/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/brand/settings', label: 'Settings', icon: Settings },
];

export default function BrandLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-paper flex flex-col md:flex-row text-ink">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-ink/10 bg-white/50 backdrop-blur-md sticky top-0 h-screen">
        <div className="p-6">
          <Link href="/brand/dashboard" className="text-2xl font-bold font-clash tracking-tight text-emerald">
            UGC Stars
          </Link>
          <div className="text-xs text-ink/60 mt-1 uppercase tracking-wider font-semibold">Brand Portal</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className="block relative">
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 bg-emerald/10 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={cn(
                  "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium",
                  isActive ? "text-emerald" : "text-ink/60 hover:text-ink hover:bg-black/5"
                )}>
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-ink/10">
          <Link href="/brand/campaigns/new" className="flex items-center justify-center gap-2 w-full bg-saffron text-ink font-semibold py-3 px-4 rounded-xl hover:bg-saffron/90 transition-all active:scale-95 shadow-sm">
            <Plus className="w-5 h-5" />
            New Campaign
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen w-full relative">
        <PageTransition className="flex-1 p-4 md:p-8 pb-24 md:pb-8">
          {children}
        </PageTransition>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-ink/10 flex justify-around items-center p-4 pb-safe z-50">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} className="relative p-2 flex flex-col items-center gap-1">
              <item.icon className={cn("w-6 h-6", isActive ? "text-emerald" : "text-ink/40")} />
              <span className={cn("text-[10px] font-medium", isActive ? "text-emerald" : "text-ink/40")}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="mobile-active"
                  className="absolute -top-1 w-1 h-1 bg-emerald rounded-full"
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
