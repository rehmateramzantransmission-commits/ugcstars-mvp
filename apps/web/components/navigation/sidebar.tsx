'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  Store, 
  Briefcase, 
  Wallet, 
  Megaphone,
  ShieldCheck,
  Users,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';

type Role = 'brand' | 'creator' | 'admin';

const SIDEBAR_LINKS = {
  creator: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Marketplace', href: '/marketplace', icon: Store },
    { label: 'My Campaigns', href: '/my-campaigns', icon: Briefcase },
    { label: 'Wallet', href: '/wallet', icon: Wallet },
  ],
  brand: [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Campaigns', href: '/campaigns', icon: Megaphone },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Verifications', href: '/admin/verifications', icon: ShieldCheck },
    { label: 'KYC', href: '/admin/kyc', icon: Users },
    { label: 'Withdrawals', href: '/admin/withdrawals', icon: CreditCard },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ]
};

export function Sidebar({ role = 'creator' }: { role?: Role }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const links = SIDEBAR_LINKS[role] || SIDEBAR_LINKS.creator;

  return (
    <motion.aside
      initial={{ width: 260 }}
      animate={{ width: collapsed ? 80 : 260 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="hidden lg:flex flex-col h-screen sticky top-0 left-0 bg-paper dark:bg-ink border-r border-ink/5 dark:border-paper/5 z-30"
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-6 border-b border-ink/5 dark:border-paper/5">
        <AnimatePresence mode="wait">
          {!collapsed ? (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2 overflow-hidden"
              key="full-logo"
            >
              <Sparkles className="w-6 h-6 text-emerald flex-shrink-0" />
              <span className="font-clash font-bold text-xl text-ink dark:text-paper whitespace-nowrap">
                UGC STARS
              </span>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full flex justify-center"
              key="icon-logo"
            >
              <Sparkles className="w-6 h-6 text-emerald" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto overflow-x-hidden">
        {links.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
          const Icon = link.icon;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className="relative group"
            >
              <div className={cn(
                "flex items-center rounded-xl transition-all duration-200",
                collapsed ? "justify-center p-3" : "px-4 py-3 gap-3",
                isActive 
                  ? "bg-emerald/10 text-emerald" 
                  : "text-ink/60 dark:text-paper/60 hover:bg-ink/5 dark:hover:bg-paper/5 hover:text-ink dark:hover:text-paper"
              )}>
                <Icon className={cn("w-5 h-5 flex-shrink-0", isActive && "text-emerald")} />
                
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium whitespace-nowrap text-sm"
                    >
                      {link.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-emerald rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer / User Profile */}
      <div className="p-4 border-t border-ink/5 dark:border-paper/5 flex flex-col gap-4">
        {/* Collapse Toggle */}
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper transition-colors",
            collapsed ? "justify-center" : "justify-end pr-2"
          )}
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div className={cn(
          "flex items-center gap-3",
          collapsed ? "justify-center" : "px-2"
        )}>
          <Avatar src="" alt="User" fallback="US" />
          
          <AnimatePresence>
            {!collapsed && (
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 overflow-hidden"
              >
                <p className="text-sm font-semibold text-ink dark:text-paper truncate">Sarah Khan</p>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-ink/50 dark:text-paper/50 capitalize truncate">{role}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald"></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!collapsed && (
            <button className="p-1.5 text-ink/40 dark:text-paper/40 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
