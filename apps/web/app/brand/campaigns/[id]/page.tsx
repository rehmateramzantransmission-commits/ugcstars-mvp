'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useParams } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Download, Play, CheckCircle2, AlertCircle } from 'lucide-react';
import { Stepper } from '@/components/ui/stepper';
import { cn } from '@/lib/utils';

export default function CampaignDetailPage() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data
  const campaign = {
    title: 'Summer Glow Essentials 2024',
    status: 'Active',
    budget: 150000,
    deadline: '2024-06-30',
    stats: { slots: 10, filled: 8, pendingPlans: 3, pendingDrafts: 2, completed: 3 }
  };

  const creators = [
    { id: 1, name: 'Ayesha Khan', slab: 'Elite', avatar: '/avatars/1.jpg', status: 'Plan Submitted', step: 1 },
    { id: 2, name: 'Zara Ali', slab: 'Emerging', avatar: '/avatars/2.jpg', status: 'In Production', step: 2 },
    { id: 3, name: 'Hira Mani', slab: 'Icon', avatar: '/avatars/3.jpg', status: 'Draft Submitted', step: 3 },
    { id: 4, name: 'Sana Javed', slab: 'Established', avatar: '/avatars/4.jpg', status: 'Completed', step: 6 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="bg-white/60 backdrop-blur-md border border-ink/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="success" className="animate-pulse">{campaign.status}</Badge>
            <span className="text-ink/40 text-sm font-medium">ID: {params.id}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-clash font-semibold text-ink">{campaign.title}</h1>
        </div>
        
        <div className="flex gap-6 items-center">
          <div className="text-right">
            <p className="text-sm text-ink/60 font-medium">Total Budget</p>
            <p className="text-2xl font-clash font-semibold text-emerald">PKR {campaign.budget.toLocaleString()}</p>
          </div>
          <div className="h-12 w-px bg-ink/10 hidden md:block" />
          <div className="text-right">
            <p className="text-sm text-ink/60 font-medium flex items-center justify-end gap-1"><Clock className="w-4 h-4"/> Deadline</p>
            <p className="text-lg font-semibold text-ink">{new Date(campaign.deadline).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-ink/5 border-none p-1 rounded-2xl w-full sm:w-auto inline-flex mb-6">
          <TabsTrigger value="overview" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-sm">Overview</TabsTrigger>
          <TabsTrigger value="creators" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-sm">
            Creators <Badge className="ml-2 bg-emerald text-white border-none py-0 px-1.5 h-5">{campaign.stats.filled}/{campaign.stats.slots}</Badge>
          </TabsTrigger>
          <TabsTrigger value="brief" className="rounded-xl px-6 py-2.5 data-[state=active]:bg-white data-[state=active]:text-ink data-[state=active]:shadow-sm">Brief</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 bg-white/50 border-ink/10 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-12 h-12 bg-saffron/20 text-saffron rounded-full flex items-center justify-center mb-2">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-clash font-semibold">{campaign.stats.pendingPlans}</h3>
              <p className="text-ink/60 text-sm font-medium">Plans Awaiting Approval</p>
            </Card>
            <Card className="p-6 bg-white/50 border-ink/10 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-12 h-12 bg-emerald/20 text-emerald rounded-full flex items-center justify-center mb-2">
                <Play className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-clash font-semibold">{campaign.stats.pendingDrafts}</h3>
              <p className="text-ink/60 text-sm font-medium">Drafts to Review</p>
            </Card>
            <Card className="p-6 bg-white/50 border-ink/10 flex flex-col items-center justify-center text-center space-y-2">
              <div className="w-12 h-12 bg-ink/10 text-ink rounded-full flex items-center justify-center mb-2">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-clash font-semibold">{campaign.stats.completed}</h3>
              <p className="text-ink/60 text-sm font-medium">Creators Completed</p>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="creators" className="mt-0 space-y-4">
          {creators.map((creator, i) => (
            <motion.div 
              key={creator.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-5 border-ink/10 hover:border-emerald/30 transition-colors bg-white/70 backdrop-blur-sm group cursor-pointer">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar src={creator.avatar} fallback={creator.name.charAt(0)} className="w-12 h-12 border-2 border-white shadow-sm" />
                    <div>
                      <h4 className="font-semibold text-lg flex items-center gap-2">
                        {creator.name}
                        <Badge variant="outline" className="text-xs bg-white">{creator.slab}</Badge>
                      </h4>
                      <p className="text-sm text-ink/60 font-medium">{creator.status}</p>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 px-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5, 6].map(step => (
                        <div key={step} className="flex-1 h-2 rounded-full bg-ink/10 relative overflow-hidden">
                          {step <= creator.step && (
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: '100%' }}
                              className={cn("absolute inset-0", step === creator.step ? "bg-emerald animate-pulse" : "bg-emerald")}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button variant={creator.step === 1 || creator.step === 3 ? "default" : "outline"} className={cn(
                    creator.step === 1 || creator.step === 3 ? "bg-saffron text-ink hover:bg-saffron/90 font-semibold" : ""
                  )}>
                    {creator.step === 1 ? 'Review Plan' : creator.step === 3 ? 'Review Draft' : 'View Details'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </TabsContent>

        <TabsContent value="brief" className="mt-0">
          <Card className="p-8 border-ink/10 bg-white/70">
            <h2 className="text-2xl font-clash font-semibold mb-6">Campaign Brief</h2>
            <div className="prose prose-emerald max-w-none mb-8 text-ink/80">
              <p>We are looking for engaging, authentic content showcasing our new Summer Glow essentials kit. Focus on the lightweight texture and natural finish.</p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-emerald/5 p-6 rounded-2xl border border-emerald/10">
                <h3 className="font-semibold text-emerald flex items-center gap-2 mb-4"><CheckCircle2 className="w-5 h-5"/> Do's</h3>
                <ul className="space-y-2 text-sm text-ink/80 list-disc pl-5">
                  <li>Use natural sunlight for shots</li>
                  <li>Show application on bare skin</li>
                  <li>Mention the SPF 50 protection</li>
                </ul>
              </div>
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <h3 className="font-semibold text-red-500 flex items-center gap-2 mb-4"><AlertCircle className="w-5 h-5"/> Don'ts</h3>
                <ul className="space-y-2 text-sm text-ink/80 list-disc pl-5">
                  <li>Don't use heavy filters</li>
                  <li>Don't mention competing brands</li>
                </ul>
              </div>
            </div>

            <div className="pt-6 border-t border-ink/10">
              <h3 className="font-semibold mb-4 text-ink">Attachments</h3>
              <div className="flex gap-4">
                <div className="flex items-center gap-3 p-3 border border-ink/10 rounded-xl hover:bg-ink/5 cursor-pointer transition-colors">
                  <div className="w-10 h-10 bg-ink/5 rounded-lg flex items-center justify-center">
                    <Download className="w-5 h-5 text-ink/60" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink">Brand_Guidelines.pdf</p>
                    <p className="text-xs text-ink/50">2.4 MB</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
