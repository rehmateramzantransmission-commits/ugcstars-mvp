'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Search, Calendar, Users, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const TABS = ['All', 'Active', 'Draft', 'Completed'];

const mockCampaigns = [
  { id: '1', title: 'Summer Glow 2024', status: 'Active', category: 'Beauty', budget: 150000, deadline: '2024-06-30', creators: 12, progress: 40 },
  { id: '2', title: 'Eid Collection Launch', status: 'Draft', category: 'Fashion', budget: 80000, deadline: '2024-07-15', creators: 0, progress: 0 },
  { id: '3', title: 'Skincare Routine Reels', status: 'Completed', category: 'Beauty', budget: 100000, deadline: '2024-05-10', creators: 5, progress: 100 },
  { id: '4', title: 'Tech Gadget Unboxing', status: 'Active', category: 'Tech', budget: 250000, deadline: '2024-08-01', creators: 8, progress: 20 },
];

export default function CampaignsPage() {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const filteredCampaigns = mockCampaigns.filter(c => {
    const matchesTab = activeTab === 'All' || c.status === activeTab;
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-8 relative min-h-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-clash font-semibold text-ink">Campaigns</h1>
          <p className="text-ink/60 mt-1">Manage and track your creator campaigns.</p>
        </div>
        <Link href="/campaigns/new">
          <Button className="bg-saffron hover:bg-saffron/90 text-ink font-semibold gap-2 shadow-md">
            <Plus className="w-5 h-5" />
            Create Campaign
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/40 p-2 rounded-2xl border border-ink/5">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent border-none">
            {TABS.map(tab => (
              <TabsTrigger key={tab} value={tab} className="data-[state=active]:bg-white data-[state=active]:text-emerald data-[state=active]:shadow-sm rounded-xl px-4 py-2">
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink/40" />
            <Input 
              placeholder="Search campaigns..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white/50 border-ink/10 rounded-xl"
            />
          </div>
          <Button variant="outline" size="icon" className="rounded-xl border-ink/10 bg-white/50 shrink-0">
            <Filter className="w-4 h-4 text-ink/60" />
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => <Skeleton key={i} className="h-64 rounded-2xl" />)}
        </div>
      ) : (
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredCampaigns.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0"
              >
                <EmptyState
                  title={`No ${activeTab !== 'All' ? activeTab.toLowerCase() : ''} campaigns found`}
                  description="Try adjusting your filters or create a new campaign."
                />
              </motion.div>
            ) : (
              <motion.div 
                key="grid"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredCampaigns.map((camp, i) => (
                  <motion.div
                    key={camp.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.05, type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <Link href={`/campaigns/${camp.id}`}>
                      <Card className="h-full hover:-translate-y-1 hover:shadow-lg transition-all duration-300 border-ink/10 bg-white/60 backdrop-blur-sm p-5 flex flex-col cursor-pointer group">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="outline" className="bg-white/80">{camp.category}</Badge>
                          <Badge variant={camp.status === 'Active' ? 'success' : camp.status === 'Completed' ? 'default' : 'secondary'}>
                            {camp.status}
                          </Badge>
                        </div>
                        
                        <h3 className="text-xl font-clash font-semibold text-ink group-hover:text-emerald transition-colors line-clamp-2 mb-4">
                          {camp.title}
                        </h3>
                        
                        <div className="mt-auto space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                              <p className="text-ink/50 flex items-center gap-1"><Calendar className="w-3.5 h-3.5"/> Deadline</p>
                              <p className="font-medium text-ink">{new Date(camp.deadline).toLocaleDateString()}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-ink/50 flex items-center gap-1"><Users className="w-3.5 h-3.5"/> Creators</p>
                              <p className="font-medium text-ink">{camp.creators} Slots</p>
                            </div>
                          </div>
                          
                          <div className="pt-4 border-t border-ink/5 flex justify-between items-center">
                            <div className="text-lg font-semibold text-ink">
                              PKR {camp.budget.toLocaleString()}
                            </div>
                            {camp.status === 'Active' && (
                              <div className="flex items-center gap-2">
                                <div className="w-16 h-1.5 bg-ink/10 rounded-full overflow-hidden">
                                  <div className="h-full bg-emerald rounded-full" style={{ width: `${camp.progress}%` }} />
                                </div>
                                <span className="text-xs font-medium text-ink/60">{camp.progress}%</span>
                              </div>
                            )}
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
      )}
    </div>
  );
}
