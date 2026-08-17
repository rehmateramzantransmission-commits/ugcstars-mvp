'use client';

import { ReactNode } from "react";
import Link from "next/link";
import { usePathname, redirect } from "next/navigation";
import { LayoutDashboard, Shield, UserCheck, Banknote, Megaphone, Settings, ScrollText } from "lucide-react";
import { PageTransition } from "@/components/ui/page-transition";
import { Badge } from "@/components/ui/badge";

const checkAdminRole = () => {
  // In a real app, verify admin role from session/token
  return true;
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  if (!checkAdminRole()) {
    redirect("/");
  }

  const navItems = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Verifications", href: "/admin/verifications", icon: Shield },
    { name: "KYC Approvals", href: "/admin/kyc", icon: UserCheck },
    { name: "Withdrawals", href: "/admin/withdrawals", icon: Banknote },
    { name: "Campaigns", href: "/admin/campaigns", icon: Megaphone },
    { name: "Settings", href: "/admin/settings", icon: Settings },
    { name: "Audit Log", href: "/admin/audit-log", icon: ScrollText },
  ];

  return (
    <div className="flex h-screen bg-paper dark:bg-ink overflow-hidden">
      <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-ink/50 backdrop-blur-sm flex flex-col flex-shrink-0">
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span className="font-clash text-xl font-bold text-ink dark:text-paper tracking-wide">UGC Stars</span>
          <Badge className="bg-emerald text-white hover:bg-emerald/90">Admin</Badge>
        </div>
        <nav className="flex-1 overflow-y-auto py-6">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-emerald/10 hover:text-emerald dark:hover:text-emerald transition-all duration-200 ease-out group"
                >
                  <item.icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium font-general">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto p-8 relative">
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
