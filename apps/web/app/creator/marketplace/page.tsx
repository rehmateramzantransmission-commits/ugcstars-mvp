'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Clock, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const mockMarketplace = [
  { id: '1', brand: 'Nike Pakistan', title: 'Urban Running Series', category: 'Sports', budget: 45000, slabs: ['Emerging', 'Established'], deadline: '2024-06-25', match: true },
  { id: '2', brand: 'L’Oréal Paris PK', title: 'Skincare Routine TikToks', category: 'Beauty', budget: 60000, slabs: ['Established', 'Elite'], deadline: '2024-06-28', match: false },
  { id: '3', brand: 'Foodpanda PK', title: 'Late Night Cravings Mukbang', category: 'Food', budget: 25000, slabs: ['Rising', 'Emerging'], deadline: '2024-06-20', match: true },
  { id: '4', brand: 'Samsung PK', title: 'Galaxy S24 Ultra Unboxing', category: 'Tech', budget: 150000, slabs: ['Elite', 'Icon'], deadline: '2024-07-05', match: false },
  { id: '5', brand: 'Khaadi Official', title: 'Summer Collection Styling', category: 'Fashion', budget: 50000, slabs: ['Emerging', 'Established'], deadline: '2024-07-01', match: true },
  { id: '6', brand: 'Daraz PK', title: '11.11 Teaser Campaign', category: 'Lifestyle', budget: 35000, slabs: ['Rising', 'Emerging', 'Established'], deadline: '2024-06-30', match: true },
];

export default function CreatorMarketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 50);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Beauty', 'Fashion', 'Tech', 'Food', 'Sports', 'Lifestyle'];

  const filteredCampaigns = mockMarketplace.filter(camp => {
    const matchesSearch = camp.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          camp.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || camp.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto space-y-8 text-[#0B0F0E] animate-in fade-in duration-500 bg-[#FAF8F4] min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-black/10 pb-8">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#0E6E52] bg-[#0E6E52]/10 px-3 py-1 rounded-full border border-[#0E6E52]/20 inline-block mb-2 font-bold">
            Creator Opportunities
          </span>
          <h1 className="text-3xl md:text-5xl font-clash font-bold text-[#0B0F0E]">
            Marketplace Briefs
          </h1>
          <p className="text-[#0B0F0E]/70 mt-2 font-general text-sm">
            Pitch concept plans for active brand briefs locked in escrow.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white p-4 rounded-2xl border border-[#0E6E52]/20 shadow-md">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0B0F0E]/40" />
          <Input 
            placeholder="Search brand or campaign..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 rounded-full bg-[#FAF8F4] border-black/10 text-[#0B0F0E] placeholder:text-[#0B0F0E]/40 focus-visible:ring-[#0E6E52]"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat 
                  ? 'bg-[#0E6E52] text-white shadow-md scale-105' 
                  : 'bg-[#FAF8F4] text-[#0B0F0E]/70 hover:text-[#0E6E52] border border-black/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <Skeleton key={i} className="h-64 rounded-2xl bg-black/5" />
          ))}
        </div>
      ) : filteredCampaigns.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-black/10">
          <h3 className="text-xl font-clash font-bold text-[#0B0F0E] mb-2">No campaigns found</h3>
          <p className="text-[#0B0F0E]/60 text-sm">Try tweaking your search term or category filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCampaigns.map((camp, index) => (
            <Link key={camp.id} href={`/creator/marketplace/1`}>
              <Card className="bg-white border border-[#0E6E52]/20 hover:border-[#0E6E52] p-6 h-full flex flex-col justify-between group relative overflow-hidden shadow-lg hover:shadow-xl transition-all">
                
                {camp.match && (
                  <div className="absolute top-0 right-0 bg-[#0E6E52] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-sm uppercase tracking-wider">
                    Slab Match
                  </div>
                )}

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#0E6E52]/10 border border-[#0E6E52]/20 flex items-center justify-center font-bold text-[#0E6E52] shadow-sm">
                      {camp.brand.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-[#0E6E52]">{camp.brand}</p>
                      <span className="text-[10px] text-[#0B0F0E]/50">{camp.category}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-clash font-bold text-[#0B0F0E] group-hover:text-[#0E6E52] transition-colors line-clamp-2 mb-4 leading-snug">
                    {camp.title}
                  </h3>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {camp.slabs.map(slab => (
                      <span key={slab} className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#0E6E52]/10 text-[#0E6E52] border border-[#0E6E52]/20">
                        {slab} Slab
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-black/5 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase text-[#0B0F0E]/50 block font-mono">Escrow Budget</span>
                    <span className="text-xl font-clash font-bold text-[#0E6E52]">PKR {camp.budget.toLocaleString()}</span>
                  </div>
                  <Button size="sm" className="rounded-full bg-[#0E6E52] hover:bg-[#0B5A43] text-white font-bold text-xs px-4">
                    Pitch ➔
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
