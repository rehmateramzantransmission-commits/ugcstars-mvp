'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, ArrowRight, Video, CheckCircle2 } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';

const TABS = ['Active', 'Completed', 'Declined'];

const myCampaigns = [
  { id: 'slot-1', title: 'Summer Glow Essentials 2024', brand: 'Loreal Pakistan', budget: 150000, status: 'Active', step: 'Draft Submitted', deadline: '2024-06-30' },
  { id: 'slot-2', title: 'Eid Collection Launch', brand: 'Khaadi', budget: 80000, status: 'Active', step: 'Plan Approved', deadline: '2024-07-15' },
  { id: 'slot-3', title: 'Skincare Routine Reels', brand: 'Garnier', budget: 100000, status: 'Completed', step: 'Paid', deadline: '2024-05-10' },
];

export default function CreatorCampaignsPage() {
  const [activeTab, setActiveTab] = useState('Active');
  const [search, setSearch] = useState('');

  const filtered = myCampaigns.filter(c => {
    const matchesTab = activeTab === 'Active' ? c.status === 'Active' : c.status === activeTab;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.brand.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 min-h-full">
      <div>
        <h1 className="text-3xl font-clash font-semibold text-[#0B0F0E]">My Campaigns</h1>
        <p className="text-[#0B0F0E]/60 mt-1">Track your active collaborations and past work.</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 p-2 rounded-2xl border border-black/5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent border-none">
            {TABS.map(tab => (
              <TabsTrigger key={tab} value={tab} className="data-[state=active]:bg-white data-[state=active]:text-[#0E6E52] data-[state=active]:shadow-sm rounded-xl px-4 py-2">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B0F0E]/40" />
          <Input 
            placeholder="Search campaigns..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-white/50 border-black/10 rounded-xl"
          />
        </div>
      </div>

      <div className="relative min-h-[400px]">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute inset-0"
            >
              <EmptyState
                icon={<Video className="w-12 h-12 text-[#0B0F0E]/20" />}
                title={`No ${activeTab.toLowerCase()} campaigns found`}
                description="Explore the marketplace to find new opportunities."
                action={<Link href="/marketplace"><Button className="bg-[#F4A63C] text-black hover:bg-[#F4A63C]/90 font-semibold">Browse Marketplace</Button></Link>}
              />
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((camp, i) => (
                <motion.div
                  key={camp.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
                >
                  <Link href={`/campaigns/${camp.id}`}>
                    <Card className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border-black/10 bg-white/70 backdrop-blur-sm p-5 flex flex-col cursor-pointer group relative overflow-hidden">
                      
                      {camp.status === 'Completed' && (
                        <div className="absolute -right-6 -top-6 w-24 h-24 bg-[#0E6E52]/5 rounded-full flex items-center justify-center">
                          <CheckCircle2 className="w-8 h-8 text-[#0E6E52]/20 mt-4 mr-4" />
                        </div>
                      )}

                      <div className="flex justify-between items-start mb-2 relative z-10">
                        <Badge variant="outline" className="bg-white/80 font-medium">{camp.brand}</Badge>
                        <Badge variant={camp.status === 'Active' ? 'default' : 'secondary'} className={camp.status === 'Active' ? 'bg-[#0E6E52] hover:bg-[#0E6E52]' : ''}>
                          {camp.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-xl font-clash font-semibold text-[#0B0F0E] group-hover:text-[#0E6E52] transition-colors line-clamp-2 mb-4 relative z-10">
                        {camp.title}
                      </h3>
                      
                      <div className="mt-auto space-y-4 relative z-10">
                        <div className="bg-[#0B0F0E]/5 rounded-xl p-3 flex justify-between items-center">
                          <span className="text-xs font-medium text-[#0B0F0E]/60 uppercase tracking-wider">Current Step</span>
                          <span className="text-sm font-semibold text-[#0E6E52]">{camp.step}</span>
                        </div>
                        
                        <div className="pt-2 border-t border-black/5 flex justify-between items-center">
                          <div className="text-lg font-bold text-[#0B0F0E]">
                            PKR {camp.budget.toLocaleString()}
                          </div>
                          <Button variant="ghost" size="sm" className="text-[#0E6E52] hover:bg-[#0E6E52]/10 p-0 h-auto gap-1">
                            Details <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
