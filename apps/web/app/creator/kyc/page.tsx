'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Upload, Lock, FileText, Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function KYCPage() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#0E6E52]/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="w-12 h-12 text-[#0E6E52]" />
        </div>
        <h1 className="text-3xl font-clash font-semibold mb-4">KYC Submitted Successfully</h1>
        <p className="text-[#0B0F0E]/60 max-w-md mx-auto mb-8">
          Your documents have been securely transmitted and are under review. This process usually takes 24-48 hours.
        </p>
        <Card className="p-6 bg-white border-black/10 max-w-sm mx-auto text-left">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-3 h-3 rounded-full bg-[#0E6E52] animate-pulse" />
            <span className="font-semibold text-sm">Review in Progress</span>
          </div>
          <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
            <div className="h-full bg-[#0E6E52] w-1/3 rounded-full" />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-clash font-semibold text-[#0B0F0E]">Identity Verification (KYC)</h1>
        <p className="text-[#0B0F0E]/60 mt-1">Verify your identity to enable wallet withdrawals and larger brand deals.</p>
      </div>

      <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-emerald-900 text-sm">Secure & Encrypted</h4>
          <p className="text-sm text-emerald-700/80 mt-1">Your sensitive personal data and documents are encrypted with banking-grade security and are never shared with brands.</p>
        </div>
      </div>

      <Card className="bg-white/80 backdrop-blur-xl border-black/10 overflow-hidden relative">
        <div className="flex items-center border-b border-black/10">
          <div className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${step === 1 ? 'text-[#0E6E52] border-b-2 border-[#0E6E52]' : 'text-black/40'}`}>
            1. Personal Info
          </div>
          <div className={`flex-1 py-4 text-center font-semibold text-sm transition-colors ${step === 2 ? 'text-[#0E6E52] border-b-2 border-[#0E6E52]' : 'text-black/40'}`}>
            2. Documents
          </div>
        </div>

        <div className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-black/60">Legal Full Name (As per CNIC)</label>
                  <Input placeholder="Muhammad Ali" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold uppercase tracking-wider text-black/60">CNIC Number</label>
                  <Input placeholder="XXXXX-XXXXXXX-X" className="bg-white font-mono" maxLength={15} />
                </div>
                <div className="pt-4">
                  <Button onClick={() => setStep(2)} className="w-full bg-[#0B0F0E] text-white py-6 text-lg">Next Step</Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="space-y-8">
                
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2"><FileText className="w-5 h-5"/> CNIC Pictures</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border-2 border-dashed border-black/20 rounded-xl p-6 text-center hover:bg-black/5 cursor-pointer flex flex-col items-center justify-center gap-2 h-32">
                      <Upload className="w-6 h-6 text-black/30" />
                      <span className="text-sm font-medium">Front Side</span>
                    </div>
                    <div className="border-2 border-dashed border-black/20 rounded-xl p-6 text-center hover:bg-black/5 cursor-pointer flex flex-col items-center justify-center gap-2 h-32">
                      <Upload className="w-6 h-6 text-black/30" />
                      <span className="text-sm font-medium">Back Side</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-black/10">
                  <h3 className="font-semibold flex items-center gap-2"><Camera className="w-5 h-5"/> Selfie Verification</h3>
                  <div className="bg-black/5 rounded-xl p-4 mb-4 text-sm text-black/70">
                    Please upload a clear selfie. Ensure your face is fully visible, well-lit, and without sunglasses or hats.
                  </div>
                  <div className="border-2 border-dashed border-black/20 rounded-xl p-8 text-center hover:bg-black/5 cursor-pointer flex flex-col items-center justify-center gap-3">
                    <Camera className="w-8 h-8 text-black/30" />
                    <span className="text-sm font-medium">Take or Upload Selfie</span>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button variant="outline" onClick={() => setStep(1)} className="py-6 px-8">Back</Button>
                  <Button onClick={() => setSubmitted(true)} className="flex-1 bg-[#0E6E52] text-white hover:bg-[#0E6E52]/90 py-6 text-lg font-bold shadow-lg">Submit KYC</Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
