'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, Sparkles, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { OTPInput } from '@/components/ui/otp-input';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!phone || phone.length < 10) {
      setError('Please enter a valid phone number');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    }, 800);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-paper dark:bg-ink p-4">
      <Card className="w-full max-w-md p-8 bg-white dark:bg-ink/80 border-ink/5 dark:border-paper/5 shadow-2xl shadow-ink/5 dark:shadow-none rounded-3xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald to-saffron" />
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-emerald" />
            <span className="font-clash font-bold text-2xl tracking-wide text-ink dark:text-paper">
              UGC STARS
            </span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 'phone' ? (
            <motion.div
              key="phone-step"
              variants={containerVariants as any}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold font-clash text-ink dark:text-paper mb-2">Welcome back</h1>
                <p className="text-ink/60 dark:text-paper/60 font-general text-sm">
                  Enter your phone number to sign in or create an account
                </p>
              </div>

              <form onSubmit={handleSendOTP} className="flex flex-col gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-ink/80 dark:text-paper/80">Phone Number</label>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center px-4 bg-ink/5 dark:bg-paper/5 rounded-xl border border-ink/10 dark:border-paper/10 text-ink dark:text-paper font-medium">
                      +92
                    </div>
                    <Input
                      type="tel"
                      placeholder="300 1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="flex-1 rounded-xl bg-ink/5 dark:bg-paper/5 border-ink/10 dark:border-paper/10 focus:border-emerald focus:ring-emerald/20"
                    />
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto', x: [-10, 10, -10, 10, 0] }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button 
                  type="submit" 
                  disabled={isLoading}
                  className="w-full py-6 bg-emerald hover:bg-emerald/90 text-white rounded-xl text-lg font-medium transition-all group mt-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-ink/10 dark:border-paper/10"></div>
                <span className="flex-shrink-0 mx-4 text-ink/40 dark:text-paper/40 text-sm font-medium">or continue with</span>
                <div className="flex-grow border-t border-ink/10 dark:border-paper/10"></div>
              </div>

              <Button variant="outline" className="w-full py-6 rounded-xl border-ink/20 dark:border-paper/20 hover:bg-ink/5 dark:hover:bg-paper/5 text-ink dark:text-paper font-medium">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </Button>

              <div className="text-center mt-2">
                <p className="text-sm text-ink/60 dark:text-paper/60">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-emerald hover:text-emerald/80 font-semibold transition-colors">
                    Sign up
                  </Link>
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="otp-step"
              variants={containerVariants as any}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="flex flex-col gap-6"
            >
              <div className="text-center">
                <h1 className="text-2xl font-bold font-clash text-ink dark:text-paper mb-2">Verify Phone</h1>
                <p className="text-ink/60 dark:text-paper/60 font-general text-sm">
                  We've sent a 6-digit code to <span className="font-semibold text-ink dark:text-paper">+92 {phone}</span>
                </p>
              </div>

              <form onSubmit={handleVerifyOTP} className="flex flex-col gap-6 mt-4">
                <div className="flex justify-center">
                  <OTPInput 
                    value={otp} 
                    onChange={setOtp} 
                    length={6} 
                    className="gap-2 sm:gap-3"
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto', x: [-10, 10, -10, 10, 0] }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg"
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center justify-center gap-2 text-emerald text-sm bg-emerald/10 p-3 rounded-lg font-medium"
                    >
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Verification successful!</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button 
                  type="submit" 
                  disabled={isLoading || success || otp.length !== 6}
                  className={cn(
                    "w-full py-6 rounded-xl text-lg font-medium transition-all mt-4",
                    success ? "bg-emerald text-white" : "bg-ink dark:bg-paper text-paper dark:text-ink hover:opacity-90"
                  )}
                >
                  {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : success ? (
                    "Verified!"
                  ) : (
                    "Verify Code"
                  )}
                </Button>
              </form>

              <div className="text-center mt-2">
                <p className="text-sm text-ink/60 dark:text-paper/60 flex items-center justify-center gap-1">
                  Didn't receive the code?{' '}
                  <button 
                    type="button" 
                    className="text-saffron hover:text-saffron/80 font-semibold transition-colors disabled:opacity-50"
                  >
                    Resend
                  </button>
                  <span className="ml-1 opacity-70">(0:59)</span>
                </p>
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="mt-6 text-sm text-ink/50 dark:text-paper/50 hover:text-ink dark:hover:text-paper transition-colors"
                >
                  Change phone number
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}
