'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Youtube, CheckCircle2, AlertCircle, Plus, Upload, X, ShieldAlert } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

type Platform = 'Instagram' | 'TikTok' | 'YouTube' | 'Facebook';

interface SocialAccount {
  id: string;
  platform: Platform;
  handle: string;
  url: string;
  status: 'pending' | 'verified' | 'rejected';
}

export default function VerificationPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<SocialAccount[]>([
    { id: '1', platform: 'Instagram', handle: '@zainab.creates', url: 'instagram.com/zainab.creates', status: 'verified' }
  ]);
  const [status, setStatus] = useState<'pending' | 'in-review' | 'verified' | 'rejected'>('pending');

  const addPlatform = () => {
    setAccounts([...accounts, { id: Math.random().toString(), platform: 'TikTok', handle: '', url: '', status: 'pending' }]);
  };

  const removePlatform = (id: string) => {
    setAccounts(accounts.filter(a => a.id !== id));
  };

  const handleSubmit = () => {
    setStatus('in-review');
    // Demo routing to slab reveal after short delay
    setTimeout(() => {
      router.push('/slab-reveal');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-12">
      <div>
        <h1 className="text-3xl font-clash font-semibold text-[#0B0F0E]">Creator Verification</h1>
        <p className="text-[#0B0F0E]/60 mt-1">Connect your social accounts to verify your reach and get assigned to a Slab.</p>
      </div>

      {/* Status Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-2xl flex items-start gap-3 border ${
          status === 'verified' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' :
          status === 'in-review' ? 'bg-[#F4A63C]/10 border-[#F4A63C]/30 text-[#0B0F0E]' :
          'bg-white border-black/10'
        }`}
      >
        {status === 'verified' ? <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" /> :
         status === 'in-review' ? <AlertCircle className="w-5 h-5 text-[#F4A63C] shrink-0 mt-0.5" /> :
         <ShieldAlert className="w-5 h-5 text-black/40 shrink-0 mt-0.5" />}
        <div>
          <h3 className="font-semibold">
            {status === 'verified' ? 'Verification Complete' : 
             status === 'in-review' ? 'Application In Review' : 
             'Verification Required'}
          </h3>
          <p className="text-sm mt-1 opacity-80">
            {status === 'verified' ? 'You are fully verified and placed in the Emerging slab.' : 
             status === 'in-review' ? 'Our team is reviewing your accounts. This usually takes 24-48 hours.' : 
             'Please add your primary social accounts below to calculate your reach and engagement.'}
          </p>
        </div>
      </motion.div>

      <div className="space-y-6">
        <h2 className="text-xl font-clash font-semibold">Social Accounts</h2>
        
        <AnimatePresence>
          {accounts.map((account, index) => (
            <motion.div
              key={account.id}
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <Card className="p-6 border-black/10 bg-white shadow-sm relative overflow-hidden">
                {account.status === 'verified' && (
                  <div className="absolute top-0 right-0 bg-[#0E6E52] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1 z-10">
                    <CheckCircle2 className="w-3 h-3" /> VERIFIED
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-4">
                  <select 
                    className="bg-black/5 border-none rounded-lg p-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-[#0E6E52]"
                    defaultValue={account.platform}
                  >
                    <option>Instagram</option>
                    <option>TikTok</option>
                    <option>YouTube</option>
                    <option>Facebook</option>
                  </select>
                  
                  {account.status !== 'verified' && (
                    <button onClick={() => removePlatform(account.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-black/60 uppercase">Handle</label>
                    <Input placeholder="@username" defaultValue={account.handle} disabled={account.status === 'verified'} />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-black/60 uppercase">Profile URL</label>
                    <Input placeholder="https://" defaultValue={account.url} disabled={account.status === 'verified'} />
                  </div>
                </div>

                {account.status !== 'verified' && (
                  <div className="mt-4 pt-4 border-t border-black/5">
                    <label className="text-xs font-semibold text-black/60 uppercase mb-2 block">Account Screenshot (Analytics / Profile)</label>
                    <div className="border border-dashed border-black/20 rounded-xl p-4 text-center hover:bg-black/5 transition-colors cursor-pointer flex flex-col items-center justify-center gap-2">
                      <Upload className="w-5 h-5 text-black/40" />
                      <span className="text-sm font-medium">Upload Screenshot</span>
                    </div>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>

        {status === 'pending' && (
          <Button variant="outline" onClick={addPlatform} className="w-full border-dashed border-2 text-[#0E6E52] border-[#0E6E52]/30 hover:bg-[#0E6E52]/5 py-6">
            <Plus className="w-5 h-5 mr-2" /> Add Another Platform
          </Button>
        )}
      </div>

      {status === 'pending' && (
        <div className="pt-6 border-t border-black/10">
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-[#F4A63C] text-black font-bold text-lg py-6 hover:bg-[#F4A63C]/90 shadow-lg"
          >
            Submit for Verification
          </Button>
        </div>
      )}
    </div>
  );
}
