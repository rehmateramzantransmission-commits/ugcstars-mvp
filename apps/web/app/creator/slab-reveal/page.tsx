'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import { Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SlabRevealPage() {
  const router = useRouter();
  const [stage, setStage] = useState(0);
  const [count, setCount] = useState(0);

  const targetFollowers = 45000;
  const slabName = 'Emerging';
  
  useEffect(() => {
    // Stage 1: Text fades in
    const t1 = setTimeout(() => setStage(1), 1000);
    
    // Stage 2: Badge pops in & confetti
    const t2 = setTimeout(() => {
      setStage(2);
      confetti({
        particleCount: 150,
        spread: 160,
        origin: { y: 0.6 },
        colors: ['#0E6E52', '#F4A63C', '#FFD700', '#ffffff']
      });
      
      // Animate numbers
      let start = 0;
      const duration = 2000;
      const increment = targetFollowers / (duration / 16);
      const counter = setInterval(() => {
        start += increment;
        if (start >= targetFollowers) {
          setCount(targetFollowers);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
    }, 2500);

    // Stage 3: Next goal
    const t3 = setTimeout(() => setStage(3), 5500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0B0F0E] flex flex-col items-center justify-center overflow-hidden p-6 text-white font-sans">
      {/* Background glow */}
      <motion.div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#0E6E52]/20 rounded-full blur-[120px] pointer-events-none"
        animate={{ 
          scale: stage >= 2 ? [1, 1.2, 1] : 0,
          opacity: stage >= 2 ? 1 : 0
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 flex flex-col items-center text-center w-full max-w-lg">
        
        {/* Stage 1 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 1 ? 1 : 0, y: stage >= 1 ? 0 : 20 }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#0E6E52]/20 mb-6">
            <ShieldCheck className="w-8 h-8 text-[#0E6E52]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-clash font-semibold text-[#FAF8F4]">You're Verified!</h1>
        </motion.div>

        {/* Stage 2 */}
        <div className="h-64 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ 
              scale: stage >= 2 ? 1 : 0,
              rotate: stage >= 2 ? 0 : -15
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="relative"
          >
            {stage >= 2 && (
              <>
                <div className="absolute inset-0 bg-gradient-to-tr from-[#0E6E52] to-[#F4A63C] blur-xl opacity-50 rounded-full animate-pulse" />
                <div className="relative w-40 h-40 bg-gradient-to-tr from-[#0B0F0E] to-[#1A2321] border-4 border-[#0E6E52] rounded-3xl rotate-45 flex items-center justify-center shadow-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
                  <div className="-rotate-45 text-center flex flex-col items-center z-10">
                    <Sparkles className="w-10 h-10 text-[#F4A63C] mb-2" />
                    <span className="font-clash font-bold text-2xl text-white tracking-widest uppercase">{slabName}</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 2 ? 1 : 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 space-y-2"
        >
          <p className="text-[#FAF8F4]/60 uppercase tracking-widest text-sm font-semibold">Verified Total Reach</p>
          <p className="text-5xl font-clash font-bold text-[#F4A63C]">
            {count.toLocaleString()}
          </p>
        </motion.div>

        {/* Stage 3 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: stage >= 3 ? 1 : 0, y: stage >= 3 ? 0 : 20 }}
          className="w-full mt-12 bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-[#FAF8F4]/80 font-medium">Next Goal: Established Slab</span>
            <span className="text-white font-bold">45k / 100k</span>
          </div>
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-[#0E6E52] to-[#F4A63C]"
              initial={{ width: 0 }}
              animate={{ width: stage >= 3 ? '45%' : 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage >= 3 ? 1 : 0 }}
          className="mt-12"
        >
          <Button 
            onClick={() => router.push('/dashboard')}
            className="bg-[#FAF8F4] text-[#0B0F0E] hover:bg-white font-bold px-8 py-6 rounded-xl group text-lg"
          >
            Go to Dashboard <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>

      </div>
    </div>
  );
}
