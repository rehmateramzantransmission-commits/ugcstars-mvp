'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronRight, ChevronLeft, Upload, Plus, Trash2, ShieldCheck, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Chips } from '@/components/ui/chips';
import { cn } from '@/lib/utils';

const STEPS = [
  { id: 'basics', title: 'Basics' },
  { id: 'brief', title: 'Brief' },
  { id: 'deliverables', title: 'Deliverables' },
  { id: 'targeting', title: 'Targeting' },
  { id: 'budget', title: 'Budget' },
  { id: 'review', title: 'Review' },
];

export default function NewCampaignWizard() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isLoading, setIsLoading] = useState(false);

  // Form State Mock
  const [formData, setFormData] = useState({
    title: '',
    objective: '',
    category: 'Beauty',
    description: '',
    dos: '',
    donts: '',
    deliverables: [{ id: '1', type: 'Reel', count: 1, description: '' }],
    rights: 'None',
    slabs: [] as string[],
    hashtags: [] as string[],
    budget: '',
    deadline: '',
    slots: '1',
  });

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep(s => s + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(s => s - 1);
    }
  };

  const handleLaunch = async () => {
    setIsLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 200));
    router.push('/creator/campaigns/1');
  };

  const addDeliverable = () => {
    setFormData(prev => ({
      ...prev,
      deliverables: [...prev.deliverables, { id: Math.random().toString(), type: 'Reel', count: 1, description: '' }]
    }));
  };

  const removeDeliverable = (id: string) => {
    setFormData(prev => ({
      ...prev,
      deliverables: prev.deliverables.filter(d => d.id !== id)
    }));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      {/* Progress Header */}
      <div className="mb-12">
        <h1 className="text-3xl font-clash font-semibold text-ink mb-8 text-center">Create New Campaign</h1>
        
        <div className="flex items-center justify-between relative">
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-ink/10 rounded-full z-0" />
          <motion.div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-emerald rounded-full z-0"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          />
          
          {STEPS.map((step, idx) => {
            const isActive = idx === currentStep;
            const isPast = idx < currentStep;
            return (
              <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300",
                  isActive ? "bg-emerald text-white shadow-lg ring-4 ring-emerald/20" : 
                  isPast ? "bg-emerald text-white" : "bg-white text-ink/40 border-2 border-ink/10"
                )}>
                  {isPast ? <Check className="w-5 h-5" /> : idx + 1}
                </div>
                <span className={cn(
                  "text-xs font-medium absolute -bottom-6 whitespace-nowrap transition-colors duration-300",
                  isActive ? "text-emerald" : "text-ink/40"
                )}>{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Content Area */}
      <Card className="bg-white/80 backdrop-blur-xl border-ink/10 p-6 md:p-10 shadow-sm overflow-hidden relative min-h-[500px]">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={currentStep}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full"
          >
            {/* STEP 1: BASICS */}
            {currentStep === 0 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-clash font-semibold">Campaign Basics</h2>
                  <p className="text-ink/60">Let's start with the high-level details.</p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ink">Campaign Title</label>
                    <Input 
                      placeholder="e.g., Summer Glow Essentials 2024" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="bg-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ink">Category</label>
                    <select 
                      className="w-full flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                    >
                      <option>Beauty</option>
                      <option>Fashion</option>
                      <option>Tech</option>
                      <option>Lifestyle</option>
                      <option>Food</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-ink">Campaign Description</label>
                    <textarea 
                      className="w-full rounded-xl border border-ink/20 p-4 focus:ring-2 focus:ring-emerald outline-none min-h-[120px]"
                      placeholder="Describe the campaign vision and goals..."
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: BRIEF */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-clash font-semibold">Creative Brief</h2>
                  <p className="text-ink/60">Guide creators on what to do and avoid.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-emerald flex items-center gap-2"><Check className="w-4 h-4"/> Do's</label>
                    <textarea 
                      className="w-full rounded-xl border border-emerald/30 p-4 focus:ring-2 focus:ring-emerald outline-none min-h-[150px] bg-emerald/5"
                      placeholder="- Use natural lighting\n- Show product in use"
                      value={formData.dos}
                      onChange={e => setFormData({...formData, dos: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-red-500 flex items-center gap-2">Don'ts</label>
                    <textarea 
                      className="w-full rounded-xl border border-red-200 p-4 focus:ring-2 focus:ring-red-400 outline-none min-h-[150px] bg-red-50"
                      placeholder="- Don't mention competitors\n- No artificial filters"
                      value={formData.donts}
                      onChange={e => setFormData({...formData, donts: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2 pt-4 border-t border-ink/10">
                  <label className="text-sm font-semibold text-ink">Upload Brief Materials (Moodboard, Brand Guidelines)</label>
                  <div className="border-2 border-dashed border-ink/20 rounded-xl p-8 text-center hover:bg-ink/5 transition-colors cursor-pointer group">
                    <Upload className="w-8 h-8 text-ink/40 mx-auto mb-2 group-hover:text-emerald transition-colors" />
                    <p className="text-sm font-medium">Drag & drop files here, or click to browse</p>
                    <p className="text-xs text-ink/50 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: DELIVERABLES */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-clash font-semibold">Deliverables & Rights</h2>
                  <p className="text-ink/60">What content do you expect from each creator?</p>
                </div>
                
                <div className="space-y-4">
                  <AnimatePresence>
                    {formData.deliverables.map((del, index) => (
                      <motion.div 
                        key={del.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex gap-4 items-start bg-ink/5 p-4 rounded-xl relative"
                      >
                        <div className="flex-1 grid grid-cols-3 gap-4">
                          <select className="col-span-1 rounded-lg border border-ink/20 p-2 text-sm bg-white">
                            <option>Reel / TikTok</option>
                            <option>Static Post</option>
                            <option>Story</option>
                            <option>YouTube Short</option>
                          </select>
                          <Input type="number" placeholder="Count" className="col-span-1 bg-white" defaultValue={1} />
                          <Input placeholder="Notes (e.g. 15-30s)" className="col-span-1 bg-white" />
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => removeDeliverable(del.id)} className="text-red-500 hover:bg-red-50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  <Button variant="outline" onClick={addDeliverable} className="w-full border-dashed border-2 text-emerald border-emerald/30 hover:bg-emerald/5">
                    <Plus className="w-4 h-4 mr-2" /> Add Deliverable
                  </Button>
                </div>

                <div className="pt-6 border-t border-ink/10 space-y-4">
                  <h3 className="font-semibold flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald"/> Content Rights</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['None', 'Limited Reuse', 'Perpetual Reuse'].map(right => (
                      <div 
                        key={right}
                        onClick={() => setFormData({...formData, rights: right})}
                        className={cn(
                          "border rounded-xl p-4 cursor-pointer transition-all text-center",
                          formData.rights === right ? "border-emerald bg-emerald/10 text-emerald font-semibold" : "border-ink/20 hover:border-ink/40 text-ink/70"
                        )}
                      >
                        {right}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: TARGETING */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-clash font-semibold">Creator Targeting</h2>
                  <p className="text-ink/60">Who is the ideal creator for this campaign?</p>
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-semibold text-ink">Target Slabs (Creator Tiers)</label>
                  <div className="flex flex-wrap gap-3">
                    {['Rising', 'Emerging', 'Established', 'Elite', 'Icon'].map(slab => (
                      <div 
                        key={slab}
                        onClick={() => {
                          const slabs = formData.slabs.includes(slab) 
                            ? formData.slabs.filter(s => s !== slab)
                            : [...formData.slabs, slab];
                          setFormData({...formData, slabs});
                        }}
                        className={cn(
                          "px-4 py-2 rounded-full border cursor-pointer transition-all font-medium text-sm",
                          formData.slabs.includes(slab) ? "bg-ink text-paper border-ink" : "bg-white border-ink/20 text-ink/70 hover:border-ink/40"
                        )}
                      >
                        {slab}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  <label className="text-sm font-semibold text-ink">Mandatory Hashtags</label>
                  <Input placeholder="Type hashtag and press Enter (e.g. #SummerGlow)" className="bg-white" />
                  {/* Mock Chips */}
                  <div className="flex gap-2">
                    <span className="bg-ink/5 text-ink text-sm px-3 py-1 rounded-full border border-ink/10 flex items-center gap-1">
                      #BeautyPak <button className="hover:text-red-500">&times;</button>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: BUDGET & TIMELINE */}
            {currentStep === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-clash font-semibold">Budget & Timeline</h2>
                  <p className="text-ink/60">Define the financials and deadlines.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-sm font-semibold text-ink">Total Campaign Budget (PKR)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-emerald" />
                      <input 
                        type="number"
                        placeholder="0" 
                        className="w-full text-3xl font-clash font-semibold pl-12 pr-4 py-4 rounded-2xl border-2 border-emerald/30 focus:border-emerald focus:ring-4 focus:ring-emerald/10 outline-none bg-emerald/5 transition-all"
                        value={formData.budget}
                        onChange={e => setFormData({...formData, budget: e.target.value})}
                      />
                    </div>
                    <p className="text-xs text-ink/50">*Platform fee of 18% will be applied at checkout</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-ink">Submission Deadline</label>
                      <Input type="date" className="bg-white py-3" value={formData.deadline} onChange={e => setFormData({...formData, deadline: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-ink">Creator Slots (Max Headcount)</label>
                      <Input type="number" min="1" className="bg-white py-3" value={formData.slots} onChange={e => setFormData({...formData, slots: e.target.value})} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 6: REVIEW */}
            {currentStep === 5 && (
              <div className="space-y-8 text-center md:text-left">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-saffron/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MegaphoneIcon className="w-8 h-8 text-saffron" />
                  </div>
                  <h2 className="text-3xl font-clash font-semibold">Ready to Launch!</h2>
                  <p className="text-ink/60 mt-2 max-w-md mx-auto">Review your campaign details before finalizing and funding.</p>
                </div>

                <div className="bg-ink/5 rounded-2xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-ink/10 pb-4">
                    <span className="text-ink/60">Campaign Title</span>
                    <span className="font-semibold">{formData.title || 'Untitled Campaign'}</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-ink/10 pb-4">
                    <span className="text-ink/60">Deliverables</span>
                    <span className="font-semibold">{formData.deliverables.length} Items</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-ink/10 pb-4">
                    <span className="text-ink/60">Creator Slots</span>
                    <span className="font-semibold">{formData.slots} Creators</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="text-lg font-semibold">Total Budget</span>
                    <span className="text-2xl font-clash font-bold text-emerald">PKR {Number(formData.budget || 0).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Card>

      {/* Navigation Footer */}
      <div className="flex justify-between items-center mt-8">
        <Button 
          variant="outline" 
          onClick={prevStep} 
          disabled={currentStep === 0 || isLoading}
          className="border-ink/20"
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Back
        </Button>
        
        {currentStep < STEPS.length - 1 ? (
          <Button onClick={nextStep} className="bg-ink text-white hover:bg-ink/90">
            Next Step <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button 
            onClick={handleLaunch} 
            disabled={isLoading}
            className="bg-saffron text-ink hover:bg-saffron/90 font-bold px-8 relative overflow-hidden group"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">Processing...</span>
            ) : (
              <span className="flex items-center gap-2 relative z-10">Fund & Launch Campaign <ChevronRight className="w-4 h-4" /></span>
            )}
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </Button>
        )}
      </div>
    </div>
  );
}

function MegaphoneIcon(props: any) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>;
}
