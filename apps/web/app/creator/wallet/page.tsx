'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Wallet, ArrowUpRight, ArrowDownRight, Building2, Smartphone, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Mock Animated Number Component
const AnimatedNumber = ({ value }: { value: number }) => {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [value]);
  return <>{displayValue.toLocaleString()}</>;
};

const transactions = [
  { id: '1', date: '2024-06-15', desc: 'Campaign Payout: Summer Glow', amount: 150000, type: 'earning' },
  { id: '2', date: '2024-06-10', desc: 'Withdrawal to IBFT', amount: -50000, type: 'withdrawal' },
  { id: '3', date: '2024-05-28', desc: 'Platform Fee (Summer Glow)', amount: -27000, type: 'fee' },
  { id: '4', date: '2024-05-20', desc: 'Campaign Payout: Eid Collection', amount: 80000, type: 'earning' },
];

export default function WalletPage() {
  const [filter, setFilter] = useState('All');
  const [kycApproved] = useState(true); // Mock KYC status
  const [withdrawMethod, setWithdrawMethod] = useState('');
  
  const filtered = transactions.filter(t => filter === 'All' ? true : filter.toLowerCase().includes(t.type));

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-clash font-semibold text-[#0B0F0E]">Wallet & Earnings</h1>
        <p className="text-[#0B0F0E]/60 mt-1">Manage your funds, view history, and withdraw securely.</p>
      </div>

      {!kycApproved && (
        <div className="bg-[#F4A63C]/10 border border-[#F4A63C]/30 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h3 className="font-semibold text-[#0B0F0E]">Complete KYC to enable withdrawals</h3>
            <p className="text-sm text-[#0B0F0E]/70 mt-1">We need to verify your identity before you can withdraw funds to your bank account or mobile wallet.</p>
          </div>
          <Button className="bg-[#0B0F0E] text-white shrink-0">Start KYC Now</Button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 border-none bg-gradient-to-br from-[#0E6E52] to-[#0a4a37] text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20"><Wallet className="w-24 h-24" /></div>
          <p className="font-medium opacity-80 uppercase tracking-wider text-sm mb-2 relative z-10">Available Balance</p>
          <h2 className="text-4xl font-clash font-bold relative z-10">
            <span className="text-2xl opacity-80 mr-1">PKR</span>
            <AnimatedNumber value={100000} />
          </h2>
          
          <div className="mt-8 relative z-10">
            <Dialog>
              <DialogTrigger asChild>
                <Button disabled={!kycApproved} className="w-full bg-white text-[#0E6E52] hover:bg-white/90 font-bold">
                  Withdraw Funds
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Withdraw Funds</DialogTitle>
                </DialogHeader>
                <div className="space-y-6 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Amount (PKR)</label>
                    <Input type="number" placeholder="0" max={100000} className="text-2xl font-clash py-6" />
                    <p className="text-xs text-right text-black/50">Max available: 100,000</p>
                  </div>
                  
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">Transfer Method</label>
                    <div className="grid grid-cols-2 gap-3">
                      <div onClick={() => setWithdrawMethod('bank')} className={`border rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all ${withdrawMethod === 'bank' ? 'border-[#0E6E52] bg-[#0E6E52]/5 text-[#0E6E52]' : 'border-black/10 text-black/60 hover:bg-black/5'}`}>
                        <Building2 className="w-6 h-6" />
                        <span className="text-sm font-medium">Bank (IBFT)</span>
                      </div>
                      <div onClick={() => setWithdrawMethod('mobile')} className={`border rounded-xl p-4 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all ${withdrawMethod === 'mobile' ? 'border-[#0E6E52] bg-[#0E6E52]/5 text-[#0E6E52]' : 'border-black/10 text-black/60 hover:bg-black/5'}`}>
                        <Smartphone className="w-6 h-6" />
                        <span className="text-sm font-medium">JazzCash/Easypaisa</span>
                      </div>
                    </div>
                  </div>

                  {withdrawMethod && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                      <label className="text-sm font-semibold">{withdrawMethod === 'bank' ? 'IBAN Number' : 'Mobile Number'}</label>
                      <Input placeholder={withdrawMethod === 'bank' ? "PK00 BANK 0000 0000 0000 0000" : "03XX XXXXXXX"} />
                    </div>
                  )}

                  <Button className="w-full bg-[#0E6E52] text-white hover:bg-[#0E6E52]/90 h-12" disabled={!withdrawMethod}>
                    Confirm Withdrawal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </Card>

        <Card className="p-6 border-black/10 bg-white shadow-sm flex flex-col justify-center">
          <div className="flex items-center gap-2 text-[#0B0F0E]/60 mb-2">
            <p className="font-medium uppercase tracking-wider text-sm">In Escrow</p>
            <HelpCircle className="w-4 h-4 cursor-help" />
          </div>
          <h2 className="text-3xl font-clash font-bold text-[#0B0F0E]">
            <span className="text-xl text-[#0B0F0E]/50 mr-1">PKR</span>
            <AnimatedNumber value={150000} />
          </h2>
          <p className="text-sm text-[#0B0F0E]/50 mt-2 font-medium">Funds locked in active campaigns</p>
        </Card>

        <Card className="p-6 border-black/10 bg-[#F4A63C]/10 shadow-sm flex flex-col justify-center">
          <p className="font-medium text-[#0B0F0E]/70 uppercase tracking-wider text-sm mb-2">Lifetime Earnings</p>
          <h2 className="text-3xl font-clash font-bold text-[#0B0F0E]">
            <span className="text-xl text-[#0B0F0E]/50 mr-1">PKR</span>
            <AnimatedNumber value={230000} />
          </h2>
          <p className="text-sm text-[#0B0F0E]/60 mt-2 font-medium">+15% vs last month</p>
        </Card>
      </div>

      {/* Transaction History */}
      <div className="space-y-4">
        <div className="flex justify-between items-end border-b border-black/10 pb-4">
          <h2 className="text-xl font-clash font-semibold">Transaction History</h2>
          <div className="flex gap-2">
            {['All', 'Earnings', 'Withdrawals'].map(f => (
              <button 
                key={f} 
                onClick={() => setFilter(f)}
                className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${filter === f ? 'bg-black text-white' : 'bg-black/5 text-black/60 hover:bg-black/10'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 relative min-h-[200px]">
          <AnimatePresence>
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="p-4 flex items-center justify-between border-black/5 hover:bg-white/80 transition-colors bg-white/50 backdrop-blur-sm">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      t.amount > 0 ? 'bg-[#0E6E52]/10 text-[#0E6E52]' : 'bg-red-50 text-red-500'
                    }`}>
                      {t.amount > 0 ? <ArrowDownRight className="w-6 h-6" /> : <ArrowUpRight className="w-6 h-6" />}
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#0B0F0E]">{t.desc}</h4>
                      <p className="text-sm text-[#0B0F0E]/50">{new Date(t.date).toLocaleDateString()} • {t.type.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className={`font-clash font-bold text-lg whitespace-nowrap ${t.amount > 0 ? 'text-[#0E6E52]' : 'text-[#0B0F0E]'}`}>
                    {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} PKR
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
