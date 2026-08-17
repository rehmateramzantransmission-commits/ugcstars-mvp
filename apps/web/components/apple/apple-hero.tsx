'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { TrendingUp, Star, ShieldCheck, Zap } from 'lucide-react';

const floatingItems = [
  {
    id: 'fashion',
    label: 'Fashion & Style',
    image: '/images/pakistani_creator_1.jpg',
    position: 'top-[8%] left-[8%]',
    delay: 0.1,
    size: 'w-28 h-28 sm:w-32 sm:h-32',
  },
  {
    id: 'food',
    label: 'Food & Lifestyle',
    image: '/images/pakistani_creator_2.jpg',
    position: 'top-[32%] left-[3%]',
    delay: 0.2,
    size: 'w-24 h-24 sm:w-28 sm:h-28',
  },
  {
    id: 'beauty',
    label: 'Beauty & Skincare',
    image: '/images/pakistani_creator_3.jpg',
    position: 'bottom-[18%] left-[10%]',
    delay: 0.15,
    size: 'w-28 h-28 sm:w-32 sm:h-32',
  },
  {
    id: 'tech',
    label: 'Tech & Reviews',
    image: '/images/pakistani_creator_4.jpg',
    position: 'top-[8%] right-[8%]',
    delay: 0.25,
    size: 'w-28 h-28 sm:w-32 sm:h-32',
  },
  {
    id: 'travel',
    label: 'Travel & Vlogs',
    image: '/images/partner_karachi.jpg',
    position: 'top-[32%] right-[3%]',
    delay: 0.3,
    size: 'w-24 h-24 sm:w-28 sm:h-28',
  },
  {
    id: 'brands',
    label: 'Brand Deals',
    image: '/images/partner_lahore.jpg',
    position: 'bottom-[18%] right-[10%]',
    delay: 0.2,
    size: 'w-28 h-28 sm:w-32 sm:h-32',
  },
];

const stats = [
  { icon: <ShieldCheck className="w-4 h-4 text-[#0E6E52]" />, text: '100% Verified PPV Payouts' },
  { icon: <TrendingUp className="w-4 h-4 text-[#0E6E52]" />, text: 'PKR 2M+ Disbursed Monthly' },
  { icon: <Star className="w-4 h-4 text-[#0E6E52]" />, text: 'New Brand Campaigns Daily' },
  { icon: <Zap className="w-4 h-4 text-[#0E6E52]" />, text: 'Instant JazzCash / Easypaisa Payouts' },
];

export function AppleHero() {
  return (
    <section className="relative w-full bg-[#E8F5EE] overflow-hidden" style={{ minHeight: '92vh' }}>

      {/* Subtle radial gradient glow in center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 45%, rgba(14,110,82,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Main content area */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 flex flex-col items-center justify-center"
        style={{ minHeight: '82vh', paddingTop: '96px', paddingBottom: '0' }}
      >

        {/* Floating circles — desktop only */}
        {floatingItems.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: item.delay, ease: 'easeOut' }}
            className={`absolute hidden lg:flex flex-col items-center gap-2 ${item.position}`}
            style={{ zIndex: 5 }}
          >
            <div
              className={`${item.size} rounded-full overflow-hidden border-4 border-white shadow-xl`}
              style={{ boxShadow: '0 8px 32px rgba(14,110,82,0.18)' }}
            >
              <img
                src={item.image}
                alt={item.label}
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="text-[11px] font-semibold text-[#2D6A4F] bg-white/80 px-2.5 py-0.5 rounded-full shadow-sm"
              style={{ backdropFilter: 'blur(4px)' }}
            >
              {item.label}
            </span>
          </motion.div>
        ))}

        {/* Center Text Block */}
        <div className="text-center max-w-[700px] mx-auto relative z-20 flex flex-col items-center">

          {/* Eyebrow pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.0 }}
            className="mb-5"
          >
            <span className="inline-flex items-center gap-2 bg-white border border-[#0E6E52]/30 text-[#0E6E52] text-xs font-bold px-4 py-1.5 rounded-full shadow-sm tracking-wide uppercase"
              style={{ letterSpacing: '0.08em' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0E6E52] inline-block" />
              Pakistan&apos;s #1 PPV Creator Platform
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-extrabold leading-tight tracking-tight text-[#0A1F14] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', lineHeight: 1.12 }}
          >
            Turn Your Content Into a{' '}
            <span
              style={{
                backgroundImage: 'linear-gradient(90deg, #0E6E52, #34D399)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Verified Income.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-[#2D6A4F] text-base sm:text-lg font-medium mb-8 max-w-[520px] mx-auto leading-relaxed"
          >
            Pakistan&apos;s first Pay-Per-View collaboration marketplace. Get paid for real views, not flat fees. Join 2,000+ creators earning with top brands.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <Link href="/onboard?role=creator">
              <button
                className="bg-[#0E6E52] hover:bg-[#0A5940] text-white font-bold px-8 py-3.5 rounded-full text-sm sm:text-base shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
                style={{ boxShadow: '0 6px 24px rgba(14,110,82,0.35)' }}
              >
                Start Earning as a Creator
              </button>
            </Link>
            <Link href="/onboard?role=brand">
              <button className="border-2 border-[#0E6E52] text-[#0E6E52] font-bold px-8 py-3.5 rounded-full text-sm sm:text-base bg-white hover:bg-[#E8F5EE] transition-all cursor-pointer">
                Explore for Brands
              </button>
            </Link>
          </motion.div>

        </div>

        {/* Mobile: grid of circular images below CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:hidden grid grid-cols-3 gap-4 mt-12 px-4"
        >
          {floatingItems.map((item) => (
            <div key={item.id} className="flex flex-col items-center gap-1.5">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-[10px] font-semibold text-[#2D6A4F] text-center leading-tight">{item.label}</span>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Stats Ticker Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative z-10 w-full bg-[#D4EDE3] border-t border-[#B7DFD0] mt-0"
        style={{ borderTopWidth: '1px' }}
      >
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-around gap-4 sm:gap-0 py-4 sm:py-5">
            {stats.map((stat, i) => (
              <React.Fragment key={i}>
                <div className="flex items-center gap-2.5">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-sm">
                    {stat.icon}
                  </span>
                  <span className="text-[#1B4D3E] font-semibold text-sm">{stat.text}</span>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden sm:block w-px h-6 bg-[#B7DFD0]" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>

    </section>
  );
}
