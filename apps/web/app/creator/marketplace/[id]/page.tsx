'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, ShieldCheck, CheckCircle2, ChevronRight, Video, FileText, Calendar } from 'lucide-react';

export default function MarketplaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [accepted, setAccepted] = useState(false);

  const campaign = {
    brand: 'Loreal Pakistan',
    title: 'Summer Glow Essentials 2024',
    budget: 150000,
    deadline: '2024-06-30',
    category: 'Beauty',
    slabs: ['Emerging', 'Established', 'Elite'],
    deliverables: [
      { type: 'Reel/TikTok', count: 2, notes: '15-30s each, natural lighting' },
      { type: 'Story', count: 3, notes: 'With product tags' }
    ],
    rights: 'Limited Reuse (6 Months)',
    dos: ['Use natural sunlight', 'Show application on bare skin'],
    donts: ['No heavy filters', 'No competing brands']
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-xl border border-black/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
        <div className="flex gap-4 items-center">
          <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center font-clash font-bold text-2xl text-[#0E6E52]">
            {campaign.brand.charAt(0)}
          </div>
          <div>
            <p className="text-[#0B0F0E]/60 font-medium mb-1">{campaign.brand}</p>
            <h1 className="text-2xl md:text-3xl font-clash font-semibold text-[#0B0F0E]">{campaign.title}</h1>
          </div>
        </div>
        
        <div className="flex gap-6 items-center bg-white p-4 rounded-2xl shadow-sm border border-black/5 w-full md:w-auto justify-between md:justify-start">
          <div className="text-left md:text-right">
            <p className="text-xs text-[#0B0F0E]/60 font-medium uppercase tracking-wider mb-1">Budget</p>
            <p className="text-xl font-clash font-semibold text-[#0E6E52]">PKR {campaign.budget.toLocaleString()}</p>
          </div>
          <div className="h-10 w-px bg-black/10" />
          <div className="text-right">
            <p className="text-xs text-[#0B0F0E]/60 font-medium uppercase tracking-wider mb-1 flex items-center justify-end gap-1"><Clock className="w-3 h-3"/> Deadline</p>
            <p className="text-sm font-semibold text-[#0B0F0E]">{new Date(campaign.deadline).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          
          {/* Brief Preview */}
          <section className="space-y-4 relative">
            <h2 className="text-xl font-clash font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#0E6E52]" /> Creative Brief
            </h2>
            
            <Card className="p-6 border-black/10 bg-white/70 overflow-hidden relative">
              <div className="prose prose-sm text-[#0B0F0E]/80 mb-6">
                <p>We are looking for engaging, authentic content showcasing our new Summer Glow essentials kit. Focus on the lightweight texture and natural finish...</p>
              </div>
              
              {!accepted && (
                <div className="absolute inset-0 backdrop-blur-sm bg-white/30 flex flex-col items-center justify-center border-t border-white/20 mt-16 p-6 text-center">
                  <ShieldCheck className="w-8 h-8 text-[#0B0F0E]/40 mb-2" />
                  <h3 className="font-semibold text-lg">Brief Locked</h3>
                  <p className="text-sm text-[#0B0F0E]/60 max-w-sm mt-1 mb-4">Accept the campaign terms to view the full creative brief, dos and don'ts, and download brand assets.</p>
                </div>
              )}

              {accepted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 pt-4 border-t border-black/10">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-[#0E6E52] mb-2 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Do's</h4>
                      <ul className="text-sm text-[#0B0F0E]/70 space-y-1 list-disc pl-4">
                        {campaign.dos.map(d => <li key={d}>{d}</li>)}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-500 mb-2 flex items-center gap-1">Don'ts</h4>
                      <ul className="text-sm text-[#0B0F0E]/70 space-y-1 list-disc pl-4">
                        {campaign.donts.map(d => <li key={d}>{d}</li>)}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </Card>
          </section>
        </div>

        <div className="space-y-6">
          <Card className="p-5 border-black/10 bg-[#0E6E52]/5">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-[#0E6E52]">Target Slabs</h3>
            <div className="flex flex-wrap gap-2 mb-2">
              {campaign.slabs.map(slab => (
                <Badge key={slab} variant={slab === 'Emerging' ? 'default' : 'outline'} className={slab === 'Emerging' ? 'bg-[#0E6E52] text-white' : 'bg-white'}>
                  {slab} {slab === 'Emerging' && ' (You)'}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-[#0B0F0E]/50 mt-2">You match the slab requirement for this campaign.</p>
          </Card>

          <Card className="p-5 border-black/10 bg-white/70">
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider">Deliverables</h3>
            <ul className="space-y-3">
              {campaign.deliverables.map((del, i) => (
                <li key={i} className="flex gap-3 text-sm border-b border-black/5 pb-3 last:border-0 last:pb-0">
                  <Video className="w-5 h-5 text-[#0E6E52] shrink-0" />
                  <div>
                    <span className="font-semibold block">{del.count}x {del.type}</span>
                    <span className="text-[#0B0F0E]/60 text-xs">{del.notes}</span>
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5 border-black/10 bg-white/70">
            <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider text-[#0B0F0E]">Content Rights</h3>
            <p className="text-sm font-medium">{campaign.rights}</p>
          </Card>

          <AnimatePresence mode="wait">
            {!accepted ? (
              <motion.div key="accept" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Button 
                  onClick={() => setAccepted(true)}
                  className="w-full bg-[#F4A63C] text-black hover:bg-[#F4A63C]/90 font-bold py-6 text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Accept Terms & Apply
                </Button>
                <p className="text-center text-xs text-[#0B0F0E]/50 mt-3 px-4">By applying, you agree to the content rights and deliverables outlined above.</p>
              </motion.div>
            ) : (
              <motion.div key="form" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-4">
                <Card className="p-4 bg-white border-emerald-500 shadow-md">
                  <h4 className="font-semibold mb-3">Submit Content Plan</h4>
                  <textarea 
                    className="w-full text-sm border border-black/10 rounded-xl p-3 mb-3 focus:ring-2 focus:ring-[#0E6E52] outline-none min-h-[100px]"
                    placeholder="Briefly describe your concept for this campaign..."
                  />
                  <Button 
                    onClick={() => router.push('/campaigns/1')}
                    className="w-full bg-[#0E6E52] text-white hover:bg-[#0E6E52]/90"
                  >
                    Submit Plan <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
