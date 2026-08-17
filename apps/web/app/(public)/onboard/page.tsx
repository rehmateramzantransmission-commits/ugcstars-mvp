'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Check, ChevronRight, ChevronLeft, Building2, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/ui/file-upload';
import { Chips } from '@/components/ui/chips';

const CITIES = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Multan', 'Peshawar', 'Quetta', 'Sialkot', 'Hyderabad'];
const NICHES = ['Fashion', 'Beauty', 'Food', 'Tech', 'Fitness', 'Lifestyle', 'Gaming', 'Education', 'Travel', 'Comedy'];
const FORMATS = ['Reels', 'TikTok', 'Stories', 'YouTube', 'Static', 'Blog'];
const SOCIALS = ['Instagram', 'TikTok', 'YouTube', 'Facebook'];

function OnboardWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') as 'brand' | 'creator' | null;
  const role = initialRole || 'creator'; // default fallback
  
  const totalSteps = role === 'creator' ? 4 : 3;
  
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for backward
  const [isCompleted, setIsCompleted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Shared
    phone: '',
    otp: '',
    
    // Creator
    displayName: '',
    bio: '',
    city: '',
    languages: ['EN', 'UR'],
    niches: [] as string[],
    formats: [] as string[],
    socialHandles: [{ platform: 'Instagram', handle: '', url: '' }],
    
    // Brand
    companyName: '',
    website: '',
    industry: '',
  });

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    } else {
      completeOnboarding();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const completeOnboarding = () => {
    setIsCompleted(true);
    // Simulate API save
    setTimeout(() => {
      router.push(role === 'brand' ? '/brand/dashboard' : '/creator/slab-reveal');
    }, 200);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  const renderCreatorStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-clash text-ink dark:text-paper">Verify your number</h2>
              <p className="text-ink/60 dark:text-paper/60 font-general mt-2">We need this to securely manage your account and payouts.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2 relative group">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 transition-all group-focus-within:text-emerald group-focus-within:-translate-y-1 block">
                  Phone Number <span className="text-saffron">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center px-4 bg-ink/5 dark:bg-paper/5 rounded-xl border border-ink/10 dark:border-paper/10 text-ink dark:text-paper font-medium">
                    +92
                  </div>
                  <Input
                    type="tel"
                    placeholder="300 1234567"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="flex-1 rounded-xl bg-ink/5 dark:bg-paper/5 border-ink/10 dark:border-paper/10 focus:border-emerald focus:ring-emerald/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-clash text-ink dark:text-paper">Set up your profile</h2>
              <p className="text-ink/60 dark:text-paper/60 font-general mt-2">Let brands know who you are and where you're based.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <FileUpload label="Profile Photo" onUpload={() => {}} />
              </div>
              
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 transition-all group-focus-within:text-emerald group-focus-within:-translate-y-1 block">
                  Display Name <span className="text-saffron">*</span>
                </label>
                <Input
                  placeholder="e.g. Ayesha Khan"
                  value={formData.displayName}
                  onChange={(e) => updateFormData('displayName', e.target.value)}
                  className="rounded-xl focus:border-emerald transition-all"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 transition-all group-focus-within:text-emerald group-focus-within:-translate-y-1 block">
                  Bio <span className="text-saffron">*</span>
                </label>
                <textarea
                  placeholder="Tell brands a bit about yourself..."
                  value={formData.bio}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                  className="w-full min-h-[100px] p-3 rounded-xl bg-transparent border border-ink/10 dark:border-paper/10 focus:border-emerald focus:ring-1 focus:ring-emerald/20 transition-all outline-none resize-none text-ink dark:text-paper"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 transition-all group-focus-within:text-emerald group-focus-within:-translate-y-1 block">
                  City <span className="text-saffron">*</span>
                </label>
                <select 
                  className="w-full p-3 rounded-xl bg-transparent border border-ink/10 dark:border-paper/10 focus:border-emerald focus:ring-1 focus:ring-emerald/20 transition-all outline-none text-ink dark:text-paper appearance-none"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                >
                  <option value="" disabled>Select a city</option>
                  {CITIES.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-clash text-ink dark:text-paper">Your Niche & Style</h2>
              <p className="text-ink/60 dark:text-paper/60 font-general mt-2">What kind of content do you create?</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 block">
                  Primary Niches (select up to 3) <span className="text-saffron">*</span>
                </label>
                <Chips 
                  options={NICHES} 
                  selected={formData.niches} 
                  onChange={(selected) => updateFormData('niches', selected)}
                  multiple
                  max={3}
                  className="flex-wrap"
                />
              </div>

              <div className="space-y-3 pt-4">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 block">
                  Content Formats <span className="text-saffron">*</span>
                </label>
                <Chips 
                  options={FORMATS} 
                  selected={formData.formats} 
                  onChange={(selected) => updateFormData('formats', selected)}
                  multiple
                  className="flex-wrap"
                />
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-clash text-ink dark:text-paper">Social Accounts</h2>
              <p className="text-ink/60 dark:text-paper/60 font-general mt-2">Connect your profiles to showcase your reach.</p>
            </div>
            
            <div className="space-y-6">
              <AnimatePresence>
                {formData.socialHandles.map((social, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-4 rounded-xl border border-ink/10 dark:border-paper/10 space-y-4 relative bg-ink/5 dark:bg-paper/5"
                  >
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-ink/60 dark:text-paper/60">Platform</label>
                      <select 
                        className="w-full p-2 rounded-lg bg-white dark:bg-ink border border-ink/10 dark:border-paper/10 outline-none text-sm text-ink dark:text-paper"
                        value={social.platform}
                        onChange={(e) => {
                          const newHandles = [...formData.socialHandles];
                          if (newHandles[index]) {
                            newHandles[index].platform = e.target.value;
                            updateFormData('socialHandles', newHandles);
                          }
                        }}
                      >
                        {SOCIALS.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-medium text-ink/60 dark:text-paper/60">Handle / URL</label>
                      <Input
                        placeholder="@username"
                        value={social.handle}
                        onChange={(e) => {
                          const newHandles = [...formData.socialHandles];
                          if (newHandles[index]) {
                            newHandles[index].handle = e.target.value;
                            updateFormData('socialHandles', newHandles);
                          }
                        }}
                        className="bg-white dark:bg-ink border-ink/10 dark:border-paper/10 h-10 text-sm"
                      />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => updateFormData('socialHandles', [...formData.socialHandles, { platform: 'Instagram', handle: '', url: '' }])}
                className="w-full border-dashed border-ink/20 dark:border-paper/20 hover:bg-ink/5 dark:hover:bg-paper/5"
              >
                + Add another account
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBrandStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-clash text-ink dark:text-paper">Verify your number</h2>
              <p className="text-ink/60 dark:text-paper/60 font-general mt-2">Secure your brand account.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2 relative group">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 transition-all group-focus-within:text-emerald group-focus-within:-translate-y-1 block">
                  Phone Number <span className="text-saffron">*</span>
                </label>
                <div className="flex gap-2">
                  <div className="flex items-center justify-center px-4 bg-ink/5 dark:bg-paper/5 rounded-xl border border-ink/10 dark:border-paper/10 text-ink dark:text-paper font-medium">
                    +92
                  </div>
                  <Input
                    type="tel"
                    placeholder="300 1234567"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className="flex-1 rounded-xl bg-ink/5 dark:bg-paper/5 border-ink/10 dark:border-paper/10 focus:border-emerald focus:ring-emerald/20 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-clash text-ink dark:text-paper">Company Profile</h2>
              <p className="text-ink/60 dark:text-paper/60 font-general mt-2">Tell creators about your brand.</p>
            </div>
            
            <div className="space-y-6">
              <div className="flex justify-center mb-6">
                <FileUpload label="Brand Logo" onUpload={() => {}} />
              </div>
              
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 transition-all group-focus-within:text-emerald group-focus-within:-translate-y-1 block">
                  Company Name <span className="text-saffron">*</span>
                </label>
                <Input
                  placeholder="e.g. Acme Corp"
                  value={formData.companyName}
                  onChange={(e) => updateFormData('companyName', e.target.value)}
                  className="rounded-xl focus:border-emerald transition-all"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 transition-all group-focus-within:text-emerald group-focus-within:-translate-y-1 block">
                  Website URL
                </label>
                <Input
                  placeholder="https://example.com"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  className="rounded-xl focus:border-emerald transition-all"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-2xl md:text-3xl font-bold font-clash text-ink dark:text-paper">About the Brand</h2>
              <p className="text-ink/60 dark:text-paper/60 font-general mt-2">What are you looking for in creators?</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2 group">
                <label className="text-sm font-medium text-ink/80 dark:text-paper/80 transition-all group-focus-within:text-emerald group-focus-within:-translate-y-1 block">
                  Brand Description <span className="text-saffron">*</span>
                </label>
                <textarea
                  placeholder="Describe your brand's mission and what kind of UGC you typically need..."
                  value={formData.bio}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                  className="w-full min-h-[150px] p-3 rounded-xl bg-transparent border border-ink/10 dark:border-paper/10 focus:border-emerald focus:ring-1 focus:ring-emerald/20 transition-all outline-none resize-none text-ink dark:text-paper"
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-paper dark:bg-ink p-6 relative overflow-hidden">
        {/* Confetti simulation (simplified CSS representation) */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
           <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.2, 1] }}
            transition={{ type: "spring", duration: 0.8 }}
            className="w-64 h-64 bg-emerald/20 rounded-full blur-3xl absolute"
           />
           <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            transition={{ type: "spring", duration: 0.8, delay: 0.2 }}
            className="w-64 h-64 bg-saffron/20 rounded-full blur-3xl absolute translate-x-20 -translate-y-20"
           />
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
          className="z-10 text-center flex flex-col items-center"
        >
          <div className="w-20 h-20 rounded-full bg-emerald text-white flex items-center justify-center mb-6 shadow-xl shadow-emerald/20">
            <Check size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-clash text-ink dark:text-paper mb-4">
            Welcome to UGC Stars!
          </h1>
          <p className="text-lg text-ink/70 dark:text-paper/70 font-general max-w-md">
            Your profile is ready. Redirecting to your dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex bg-paper dark:bg-ink">
      {/* Left panel - Decorative (hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/3 bg-ink relative flex-col justify-between p-12 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-saffron blur-[100px] -translate-x-1/2 translate-y-1/2" />
        </div>
        
        <div className="z-10 flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-paper" />
          <span className="font-clash font-bold text-2xl tracking-wide text-paper">
            UGC STARS
          </span>
        </div>

        <div className="z-10">
          <h2 className="text-4xl font-bold font-clash text-paper mb-4 leading-tight">
            {role === 'creator' ? 'Start earning from your creativity.' : 'Find the perfect face for your brand.'}
          </h2>
          <p className="text-paper/70 font-general text-lg">
            {role === 'creator' ? 'Join hundreds of brands looking for authentic content.' : 'Access thousands of vetted local creators.'}
          </p>
        </div>
        
        <div className="z-10 flex items-center gap-3">
          {role === 'brand' ? (
            <div className="flex items-center gap-2 text-paper/60 text-sm font-medium">
              <Building2 size={16} /> Brand Onboarding
            </div>
          ) : (
            <div className="flex items-center gap-2 text-paper/60 text-sm font-medium">
              <Sparkles size={16} /> Creator Onboarding
            </div>
          )}
        </div>
      </div>

      {/* Right panel - Form area */}
      <div className="flex-1 flex flex-col relative w-full lg:w-2/3">
        {/* Progress header */}
        <div className="pt-8 px-6 md:px-12 w-full max-w-2xl mx-auto flex flex-col gap-4">
          <div className="flex justify-between items-end">
            <span className="text-sm font-medium text-ink/50 dark:text-paper/50">
              Step {currentStep} of {totalSteps}
            </span>
            {currentStep > 1 && (
              <button 
                onClick={prevStep}
                className="text-sm font-medium text-ink/70 dark:text-paper/70 hover:text-ink dark:hover:text-paper flex items-center transition-colors"
              >
                <ChevronLeft size={16} className="mr-1" /> Back
              </button>
            )}
          </div>
          
          <div className="h-2 w-full bg-ink/10 dark:bg-paper/10 rounded-full overflow-hidden">
            <motion.div 
              className={cn("h-full rounded-full", role === 'creator' ? "bg-saffron" : "bg-emerald")}
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>
        </div>

        {/* Form content */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 py-10 w-full max-w-2xl mx-auto relative overflow-hidden">
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="w-full"
            >
              {role === 'creator' ? renderCreatorStep(currentStep) : renderBrandStep(currentStep)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer controls */}
        <div className="p-6 md:p-12 w-full max-w-2xl mx-auto flex items-center justify-between border-t border-ink/5 dark:border-paper/5 bg-paper dark:bg-ink">
          {currentStep === totalSteps && role === 'creator' ? (
             <button className="text-sm font-medium text-ink/50 hover:text-ink dark:text-paper/50 dark:hover:text-paper transition-colors">
               I'll do this later
             </button>
          ) : <div></div>}
          
          <Button 
            onClick={nextStep}
            className={cn(
              "px-8 py-6 rounded-xl font-medium text-lg transition-all group",
              role === 'creator' 
                ? "bg-saffron hover:bg-saffron/90 text-white" 
                : "bg-emerald hover:bg-emerald/90 text-white"
            )}
          >
            {currentStep === totalSteps ? 'Complete Profile' : 'Continue'}
            {currentStep !== totalSteps && (
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function OnboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Sparkles className="animate-pulse w-8 h-8 text-emerald" /></div>}>
      <OnboardWizard />
    </Suspense>
  );
}
