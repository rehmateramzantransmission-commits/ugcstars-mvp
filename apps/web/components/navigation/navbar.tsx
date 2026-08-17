'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Menu, 
  X, 
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui/avatar';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { LocaleToggle } from '@/components/ui/locale-toggle';

type Role = 'brand' | 'creator' | 'admin';

const NAV_LINKS = {
  brand: [
    { label: 'Dashboard', href: '/brand/dashboard' },
    { label: 'Campaigns', href: '/brand/campaigns' },
  ],
  creator: [
    { label: 'Dashboard', href: '/creator/dashboard' },
    { label: 'Marketplace', href: '/creator/marketplace' },
    { label: 'My Campaigns', href: '/creator/campaigns' },
    { label: 'Wallet', href: '/creator/wallet' },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Verifications', href: '/admin/verifications' },
    { label: 'KYC', href: '/admin/kyc' },
    { label: 'Withdrawals', href: '/admin/withdrawals' },
    { label: 'Settings', href: '/admin/settings' },
  ]
};

export function Navbar({ role = 'creator' }: { role?: Role }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const links = NAV_LINKS[role] || NAV_LINKS.creator;

  const getActiveTitle = () => {
    const active = links.find(l => pathname.startsWith(l.href));
    return active ? active.label : 'Dashboard';
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full h-16 md:h-20 bg-paper/80 dark:bg-ink/80 backdrop-blur-md border-b border-ink/5 dark:border-paper/5 flex items-center px-4 md:px-8 justify-between">
        
        {/* Left: Logo & Section Title */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-emerald" />
            <span className="font-clash font-bold text-lg md:text-xl hidden md:block text-ink dark:text-paper">
              UGC STARS
            </span>
          </div>
          
          <div className="hidden md:block h-6 w-[1px] bg-ink/10 dark:bg-paper/10" />
          
          <h1 className="font-clash font-semibold text-lg text-ink dark:text-paper">
            {getActiveTitle()}
          </h1>
        </div>

        {/* Center: Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "text-ink dark:text-paper" : "text-ink/60 dark:text-paper/60 hover:text-ink hover:bg-ink/5 dark:hover:text-paper dark:hover:bg-paper/5"
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald mx-4 rounded-t-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <ThemeToggle />
          <LocaleToggle />
          
          <button 
            className="relative p-2 rounded-full hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors text-ink/70 dark:text-paper/70"
            onClick={() => setHasUnread(false)}
          >
            <Bell className="w-5 h-5" />
            <AnimatePresence>
              {hasUnread && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-saffron"
                />
              )}
            </AnimatePresence>
          </button>

          <div className="relative">
            <button 
              className="hidden md:flex items-center gap-2 p-1 pr-2 rounded-full border border-ink/10 dark:border-paper/10 hover:bg-ink/5 dark:hover:bg-paper/5 transition-colors"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <Avatar src="" alt="User" fallback="US" size="sm" />
              <ChevronDown className="w-4 h-4 text-ink/50 dark:text-paper/50" />
            </button>

            {/* Profile Dropdown Simulation */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-ink border border-ink/5 dark:border-paper/10 rounded-xl shadow-xl shadow-ink/5 py-2 z-50"
                >
                  <div className="px-4 py-2 border-b border-ink/5 dark:border-paper/5 mb-1">
                    <p className="text-sm font-semibold text-ink dark:text-paper">Sarah Khan</p>
                    <p className="text-xs text-ink/50 dark:text-paper/50 capitalize">{role}</p>
                  </div>
                  <Link href="/profile" className="block px-4 py-2 text-sm text-ink/70 dark:text-paper/70 hover:bg-ink/5 dark:hover:bg-paper/5">Profile Settings</Link>
                  <Link href="/logout" className="block px-4 py-2 text-sm text-red-500 hover:bg-red-500/10">Log Out</Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            className="lg:hidden p-2 text-ink/70 dark:text-paper/70"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-3/4 max-w-sm bg-paper dark:bg-ink z-50 flex flex-col border-r border-ink/10 dark:border-paper/10 lg:hidden"
            >
              <div className="p-4 flex items-center justify-between border-b border-ink/10 dark:border-paper/10">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-emerald" />
                  <span className="font-clash font-bold text-lg text-ink dark:text-paper">
                    UGC STARS
                  </span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <X className="w-6 h-6 text-ink/50 dark:text-paper/50" />
                </button>
              </div>

              <div className="p-4 flex items-center gap-3 border-b border-ink/10 dark:border-paper/10">
                <Avatar src="" alt="User" fallback="US" />
                <div>
                  <p className="font-medium text-ink dark:text-paper">Sarah Khan</p>
                  <p className="text-sm text-ink/60 dark:text-paper/60 capitalize">{role}</p>
                </div>
              </div>

              <div className="flex-1 py-4 flex flex-col gap-1 px-2">
                {links.map(link => {
                  const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-base font-medium transition-colors flex items-center",
                        isActive 
                          ? "bg-emerald/10 text-emerald" 
                          : "text-ink/70 dark:text-paper/70 hover:bg-ink/5 dark:hover:bg-paper/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
