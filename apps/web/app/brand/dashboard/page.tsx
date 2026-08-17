'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Plus, ArrowRight, Activity, Users, DollarSign, CheckCircle2, Megaphone, Sparkles } from 'lucide-react';
import { StatCard } from '@/components/ui/stat-card';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

// Mock data fetcher
const useDashboardData = () => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setData({
        companyName: 'L’Oréal Paris Pakistan',
        stats: {
          activeCampaigns: 4,
          creatorsEngaged: 28,
          totalSpent: 450000,
          campaignsCompleted: 12
        },
        recentCampaigns: [
          { id: '1', title: 'Summer Glow 2024 Reel Series', status: 'Active', creators: 12, budget: 150000, deadline: '2024-06-30' },
          { id: '2', title: 'Festive Pret Launch Try-Ons', status: 'Draft', creators: 0, budget: 80000, deadline: '2024-07-15' },
          { id: '3', title: 'Skincare Routine TikToks', status: 'Completed', creators: 5, budget: 100000, deadline: '2024-05-10' }
        ]
      });
      setIsLoading(false);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return { data, isLoading };
};

export default function BrandDashboard() {
  const { data, isLoading } = useDashboardData();

  if (isLoading) {
    return (
      <div className="space-y-8 p-6 md:p-10 max-w-7xl mx-auto">
        <div className="space-y-2">
          <Skeleton className="h-10 w-64 rounded-lg bg-black/5" />
          <Skeleton className="h-5 w-48 rounded-lg bg-black/5" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 rounded-2xl bg-black/5" />)}
        </div>
        <Skeleton className="h-96 rounded-2xl bg-black/5" />
      </div>
    );
  }

  return (
    <div className="space-y-8 p-6 md:p-10 max-w-7xl mx-auto text-[#0B0F0E] animate-in fade-in duration-500 bg-[#FAF8F4] min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0E6E52] bg-[#0E6E52]/10 px-3 py-1 rounded-full border border-[#0E6E52]/20 inline-block mb-2 font-bold">
            Brand Enterprise Hub
          </span>
          <h1 className="text-3xl md:text-5xl font-clash font-bold text-[#0B0F0E]">
            Welcome back, {data.companyName}
          </h1>
          <p className="text-[#0B0F0E]/70 mt-2 font-general text-sm">Here’s what’s happening with your active campaigns today.</p>
        </div>
        <Link href="/brand/campaigns/new">
          <Button size="lg" className="rounded-full bg-[#0E6E52] hover:bg-[#0B5A43] text-white font-bold gap-2 px-6 shadow-xl hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Create Campaign ➔
          </Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard title="Active Campaigns" value={data.stats.activeCampaigns} icon={<Activity className="w-5 h-5 text-[#0E6E52]" />} trend={2} />
        <StatCard title="Creators Engaged" value={data.stats.creatorsEngaged} icon={<Users className="w-5 h-5 text-[#D97706]" />} />
        <StatCard title="Total Escrow Spent (PKR)" value={data.stats.totalSpent} icon={<DollarSign className="w-5 h-5 text-[#0E6E52]" />} format="currency" />
        <StatCard title="Campaigns Completed" value={data.stats.campaignsCompleted} icon={<CheckCircle2 className="w-5 h-5 text-[#0E6E52]" />} />
      </div>

      {/* Recent Campaigns */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-clash font-bold text-[#0B0F0E]">Recent Campaigns</h2>
          <Link href="/brand/campaigns" className="text-sm font-semibold text-[#0E6E52] hover:underline flex items-center gap-1">
            View All Campaigns ➔
          </Link>
        </div>
        
        {data.recentCampaigns.length === 0 ? (
          <EmptyState
            icon={<Megaphone className="w-12 h-12 text-[#0E6E52]" />}
            title="No campaigns yet"
            description="Create your first campaign to start engaging with premium slab creators."
            action={<Link href="/brand/campaigns/new"><Button className="rounded-full bg-[#0E6E52] text-white font-bold">Create Campaign</Button></Link>}
          />
        ) : (
          <Card className="overflow-hidden p-0 border border-[#0E6E52]/20 shadow-xl bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase tracking-wider text-[#0B0F0E]/60 bg-[#FAF8F4] border-b border-black/10">
                  <tr>
                    <th className="px-6 py-4 font-bold">Campaign Name</th>
                    <th className="px-6 py-4 font-bold">Status</th>
                    <th className="px-6 py-4 font-bold">Slots Engaged</th>
                    <th className="px-6 py-4 font-bold">Escrow Budget</th>
                    <th className="px-6 py-4 font-bold">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {data.recentCampaigns.map((camp: any, index: number) => (
                    <tr 
                      key={camp.id} 
                      className="hover:bg-[#FAF8F4] transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-5 font-semibold text-[#0B0F0E] group-hover:text-[#0E6E52] transition-colors">
                        {camp.title}
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          camp.status === 'Active' ? 'bg-[#0E6E52]/10 text-[#0E6E52] border border-[#0E6E52]/20' :
                          camp.status === 'Completed' ? 'bg-black/10 text-black border border-black/20' :
                          'bg-[#F4A63C]/15 text-[#D97706] border border-[#F4A63C]/30'
                        }`}>
                          {camp.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-[#0B0F0E]/70 font-mono">{camp.creators} Slots</td>
                      <td className="px-6 py-5 font-bold font-clash text-[#0E6E52]">PKR {camp.budget.toLocaleString()}</td>
                      <td className="px-6 py-5 text-[#0B0F0E]/60 font-mono">{new Date(camp.deadline).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
