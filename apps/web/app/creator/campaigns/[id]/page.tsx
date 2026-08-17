'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Circle, Upload, MessageSquare, Play, Calendar, DollarSign, PartyPopper } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import confetti from 'canvas-confetti';

const JOURNEY_STEPS = [
  'Plan Submitted',
  'Plan Approved',
  'In Production',
  'Draft Submitted',
  'Draft Approved',
  'Completed',
  'Paid'
];

export default function CampaignSlotDetail() {
  const [currentStepIndex, setCurrentStepIndex] = useState(2); // In Production
  
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0E6E52', '#F4A63C', '#FAF8F4']
    });
    setCurrentStepIndex(6); // Skip to end for demo
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[#0B0F0E]/60 text-sm font-medium">Loreal Pakistan</span>
          <span className="text-[#0B0F0E]/30 text-sm">•</span>
          <span className="text-sm font-medium text-[#0E6E52]">PKR 150,000</span>
        </div>
        <h1 className="text-3xl font-clash font-semibold">Summer Glow Essentials 2024</h1>
      </div>

      {/* Signature UI #6 - Campaign Journey Stepper */}
      <Card className="p-6 bg-white/80 backdrop-blur-xl border-black/10 overflow-hidden relative">
        <div className="flex justify-between relative z-10 overflow-x-auto pb-4 hide-scrollbar">
          {/* Progress Line */}
          <div className="absolute top-5 left-8 right-8 h-1 bg-black/5 rounded-full z-0">
            <motion.div 
              className="h-full bg-[#0E6E52] rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: `${(currentStepIndex / (JOURNEY_STEPS.length - 1)) * 100}%` }}
              transition={{ type: 'spring', stiffness: 50, damping: 20 }}
            />
          </div>

          {JOURNEY_STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex;
            return (
              <div key={step} className="flex flex-col items-center gap-3 relative z-10 w-24 shrink-0">
                <motion.div
                  initial={false}
                  animate={{ 
                    scale: isActive ? 1.2 : 1,
                    backgroundColor: isCompleted ? '#0E6E52' : isActive ? '#fff' : '#FAF8F4',
                    borderColor: isCompleted || isActive ? '#0E6E52' : 'rgba(11, 15, 14, 0.1)'
                  }}
                  className={cn(
                    "w-10 h-10 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
                    isActive && "shadow-[0_0_15px_rgba(14,110,82,0.3)] ring-4 ring-[#0E6E52]/10"
                  )}
                >
                  {isCompleted ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </motion.div>
                  ) : isActive ? (
                    <div className="w-3 h-3 bg-[#0E6E52] rounded-full animate-pulse" />
                  ) : (
                    <Circle className="w-4 h-4 text-black/20" />
                  )}
                </motion.div>
                <span className={cn(
                  "text-xs font-medium text-center transition-colors duration-300",
                  isActive ? "text-[#0E6E52] font-bold" : isCompleted ? "text-[#0B0F0E]" : "text-[#0B0F0E]/40"
                )}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Dynamic Content Section based on step */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStepIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {currentStepIndex === 2 && (
            <Card className="p-8 border-black/10 bg-white/70 shadow-sm text-center">
              <div className="w-16 h-16 bg-[#F4A63C]/20 rounded-full flex items-center justify-center mx-auto mb-4 text-[#F4A63C]">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <h2 className="text-2xl font-clash font-semibold mb-2">Time to Create!</h2>
              <p className="text-[#0B0F0E]/60 max-w-md mx-auto mb-8">Your content plan has been approved by the brand. Please produce the content and upload your drafts here for review.</p>
              
              <div className="max-w-sm mx-auto border-2 border-dashed border-black/20 rounded-2xl p-8 hover:border-[#0E6E52]/50 hover:bg-[#0E6E52]/5 transition-colors cursor-pointer group">
                <Upload className="w-10 h-10 text-black/30 mx-auto mb-4 group-hover:text-[#0E6E52] transition-colors" />
                <p className="font-semibold text-sm mb-1">Upload Draft Videos</p>
                <p className="text-xs text-black/50">MP4, MOV up to 500MB</p>
              </div>

              <div className="mt-8 flex justify-center">
                <Button onClick={() => setCurrentStepIndex(3)} className="bg-[#0E6E52] text-white hover:bg-[#0E6E52]/90">
                  Submit Drafts
                </Button>
              </div>
            </Card>
          )}

          {currentStepIndex === 6 && (
            <Card className="p-10 border-emerald-500 bg-emerald-50 text-center shadow-lg overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
              <div className="relative z-10">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                  <PartyPopper className="w-10 h-10 text-emerald-600" />
                </div>
                <h2 className="text-3xl font-clash font-bold text-emerald-900 mb-2">Campaign Completed!</h2>
                <p className="text-emerald-700/80 mb-8 max-w-sm mx-auto">Amazing work! The brand loved your content and the payment has been released to your wallet.</p>
                
                <div className="bg-white/80 rounded-2xl p-6 max-w-sm mx-auto shadow-sm backdrop-blur-sm flex justify-between items-center border border-emerald-100">
                  <span className="font-semibold text-emerald-900">Earnings Added</span>
                  <span className="text-2xl font-clash font-bold text-emerald-600">+ PKR 150,000</span>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Threaded Comments / Communication */}
      <Card className="p-6 border-black/10 bg-white/50">
        <h3 className="font-semibold flex items-center gap-2 mb-6"><MessageSquare className="w-5 h-5"/> Campaign Messages</h3>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-[#0E6E52]/10 flex items-center justify-center shrink-0 font-bold text-[#0E6E52]">L</div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-black/5 shadow-sm">
              <p className="text-sm font-medium mb-1">Brand Manager</p>
              <p className="text-sm text-[#0B0F0E]/80">Love the plan! Just make sure to emphasize the SPF feature in the first 3 seconds.</p>
              <span className="text-xs text-black/40 mt-2 block">Yesterday, 2:30 PM</span>
            </div>
          </div>
          <div className="flex gap-4 flex-row-reverse">
            <div className="w-10 h-10 rounded-full bg-[#F4A63C]/20 flex items-center justify-center shrink-0 font-bold text-[#0B0F0E]">Z</div>
            <div className="bg-[#0E6E52] text-white p-4 rounded-2xl rounded-tr-none shadow-sm">
              <p className="text-sm">Noted! Will definitely highlight that prominently. Starting production tomorrow.</p>
              <span className="text-xs text-white/60 mt-2 block text-right">Yesterday, 3:15 PM</span>
            </div>
          </div>
        </div>
        <div className="mt-6 flex gap-3">
          <input type="text" placeholder="Type a message..." className="flex-1 bg-white border border-black/10 rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-[#0E6E52]" />
          <Button className="bg-[#0B0F0E] text-white">Send</Button>
          {currentStepIndex === 2 && (
             <Button variant="outline" onClick={triggerConfetti} className="hidden md:flex">Demo Finish</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
