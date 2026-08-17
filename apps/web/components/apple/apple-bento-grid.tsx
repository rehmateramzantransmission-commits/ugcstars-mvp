'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, FileCheck, Wallet, Lock, CheckCircle, ArrowRight, Zap, Globe, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function AppleBentoGrid() {
  const [taxFilerStatus, setTaxFilerStatus] = useState<'filer' | 'nonFiler'>('filer');

  const sampleGrossAmount = 100000;
  const whtRate = taxFilerStatus === 'filer' ? 0.04 : 0.08;
  const whtDeduction = sampleGrossAmount * whtRate;
  const platformFee = sampleGrossAmount * 0.18;
  const netPayout = sampleGrossAmount - whtDeduction - platformFee;

  return (
    <section className="py-24 bg-[#FAF8F5] text-[#0F172A] relative overflow-hidden border-t border-slate-200/60">
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-mono uppercase tracking-widest text-[#EC4899] bg-[#EC4899]/10 px-4 py-1.5 rounded-full border border-[#EC4899]/20 inline-block font-bold">
            Platform Engine
          </span>
          <h2 className="text-4xl md:text-5xl font-urbanist font-extrabold text-[#0F172A]">Metapic Architecture</h2>
          <p className="text-slate-600 text-lg font-urbanist">
            Every layer of UGC Stars is engineered for transparent ROI, financial escrow security, and instant local payouts.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          
          {/* 1. Gateway Escrow Vault (Large Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="col-span-1 md:col-span-2 lg:col-span-8 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-between group hover:border-[#635BFF]/30 transition-all text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#635BFF]/10 border border-[#635BFF]/20 flex items-center justify-center text-[#635BFF] shadow-md group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#635BFF]/20 bg-[#635BFF]/10 text-[#635BFF] font-bold">
                  Escrow Vault Protocol
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-urbanist font-extrabold text-[#0F172A] mb-2">
                100% Safepay Escrow Hold
              </h3>
              <p className="text-sm font-semibold text-[#635BFF] mb-3 font-urbanist">
                Double-Entry Ledger & Capital Protection
              </p>
              <p className="text-sm text-slate-600 font-urbanist leading-relaxed max-w-xl mb-8">
                Campaign capital is deposited upfront into a secure gateway escrow vault. Funds are strictly released to creators only upon brand watermarked draft approval.
              </p>
            </div>

            {/* Escrow Simulator Widget */}
            <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-2xl p-5 shadow-inner">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center shadow-sm">
                    <Lock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">Safepay Vault Ref</span>
                    <span className="text-xs font-mono font-bold text-[#0F172A]">ESCROW-PK-892401</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-xs font-bold text-emerald-700 font-urbanist">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  FUNDS SECURELY LOCKED
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-mono">Campaign Deposit</span>
                  <span className="text-base font-urbanist font-extrabold text-[#0F172A]">PKR 450,000</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-mono">Escrow Fee</span>
                  <span className="text-base font-urbanist font-bold text-slate-500">0% Brand Fee</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-mono">Vault Status</span>
                  <span className="text-base font-urbanist font-bold text-[#635BFF]">Held in Vault</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase text-slate-400 block font-mono">Release Condition</span>
                  <span className="text-base font-urbanist font-bold text-[#EC4899]">Brand Approval</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. CNIC Nadra KYC (Medium Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-1 md:col-span-1 lg:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-between group hover:border-[#635BFF]/30 transition-all text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#EC4899]/10 border border-[#EC4899]/20 flex items-center justify-center text-[#EC4899] shadow-md group-hover:scale-110 transition-transform">
                  <UserCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#EC4899]/20 bg-[#EC4899]/10 text-[#EC4899] font-bold">
                  Nadra Verified
                </span>
              </div>

              <h3 className="text-2xl font-urbanist font-extrabold text-[#0F172A] mb-2">
                CNIC Nadra KYC
              </h3>
              <p className="text-xs font-semibold text-[#EC4899] mb-3 font-urbanist">
                AES-256 Encrypted Identity Check
              </p>
              <p className="text-xs text-slate-600 font-urbanist leading-relaxed mb-6">
                Every creator on UGC Stars is verified against official Pakistani CNIC records. Zero fake profiles, zero bot accounts.
              </p>
            </div>

            {/* CNIC Widget */}
            <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-2xl p-4 shadow-inner space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">CNIC Number</span>
                <span className="font-mono font-bold text-[#0F172A]">42101-*****78-9</span>
              </div>
              <div className="flex items-center justify-between text-xs font-urbanist">
                <span className="text-slate-400">Identity Status</span>
                <span className="text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 fill-current text-emerald-600" />
                  Verified Citizen
                </span>
              </div>
            </div>
          </motion.div>

          {/* 3. FBR Tax Engine (Medium Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="col-span-1 md:col-span-1 lg:col-span-4 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-between group hover:border-[#635BFF]/30 transition-all text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] shadow-md group-hover:scale-110 transition-transform">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#8B5CF6]/20 bg-[#8B5CF6]/10 text-[#8B5CF6] font-bold">
                  Tax Engine
                </span>
              </div>

              <h3 className="text-2xl font-urbanist font-extrabold text-[#0F172A] mb-2">
                FBR WHT Tax Engine
              </h3>
              <p className="text-xs font-semibold text-[#8B5CF6] mb-3 font-urbanist">
                Automated Filer (4%) vs Non-Filer (8%) Rates
              </p>

              {/* Toggle */}
              <div className="bg-[#FAF8F5] p-1 rounded-xl flex items-center gap-1 mb-4 border border-slate-200">
                <button
                  onClick={() => setTaxFilerStatus('filer')}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-xs font-bold font-urbanist transition-all",
                    taxFilerStatus === 'filer' ? "bg-[#635BFF] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Filer (4% WHT)
                </button>
                <button
                  onClick={() => setTaxFilerStatus('nonFiler')}
                  className={cn(
                    "flex-1 py-1.5 rounded-lg text-xs font-bold font-urbanist transition-all",
                    taxFilerStatus === 'nonFiler' ? "bg-[#EC4899] text-white shadow-md" : "text-slate-600 hover:text-slate-900"
                  )}
                >
                  Non-Filer (8% WHT)
                </button>
              </div>
            </div>

            {/* Tax Box */}
            <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-2xl p-4 shadow-inner space-y-2 text-xs">
              <div className="flex justify-between text-slate-500 font-urbanist">
                <span>Gross Earning:</span>
                <span className="text-[#0F172A] font-mono font-bold">PKR 100,000</span>
              </div>
              <div className="flex justify-between text-slate-500 font-urbanist">
                <span>FBR Tax ({taxFilerStatus === 'filer' ? '4%' : '8%'}):</span>
                <span className="text-red-600 font-mono font-bold">- PKR {whtDeduction.toLocaleString()}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm font-urbanist">
                <span className="text-[#0F172A]">Net Payout:</span>
                <span className="text-[#635BFF] font-mono">PKR {netPayout.toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* 4. Instant Local Payouts (Large Card) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="col-span-1 md:col-span-2 lg:col-span-8 bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-between group hover:border-[#635BFF]/30 transition-all text-left"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-[#635BFF]/10 border border-[#635BFF]/20 flex items-center justify-center text-[#635BFF] shadow-md group-hover:scale-110 transition-transform">
                  <Wallet className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-widest px-3.5 py-1 rounded-full border border-[#635BFF]/20 bg-[#635BFF]/10 text-[#635BFF] font-bold">
                  Instant Settlement
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-urbanist font-extrabold text-[#0F172A] mb-2">
                Instant Pakistani Local Payouts
              </h3>
              <p className="text-sm font-semibold text-[#635BFF] mb-3 font-urbanist">
                JazzCash • Easypaisa • 1LINK IBFT • RAAST
              </p>
              <p className="text-sm text-slate-600 font-urbanist leading-relaxed max-w-xl mb-8">
                Creators withdraw earnings directly to any mobile wallet or bank account in Pakistan with sub-minute execution and instant SMS alerts.
              </p>
            </div>

            <div className="bg-[#FAF8F5] border border-slate-200/80 rounded-2xl p-5 shadow-inner flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#0F172A] text-white flex items-center justify-center shadow-sm">
                  <Zap className="w-4 h-4 fill-current text-[#EC4899]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0F172A] font-urbanist">Instant RAAST / IBFT Gateway</h4>
                  <p className="text-xs text-slate-500 font-urbanist">Direct payout to Meezan, HBL, JazzCash or Easypaisa</p>
                </div>
              </div>

              <span className="text-sm font-bold text-[#635BFF] font-mono">0.00s Settlement Delay</span>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
