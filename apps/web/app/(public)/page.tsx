'use client';

import React from 'react';
import { AppleHero } from '@/components/apple/apple-hero';
import { DualValuePropSection } from '@/components/sections/dual-value-prop';
import { StickyScrollyteller } from '@/components/apple/sticky-scrollyteller';
import { CreatorStoriesSection } from '@/components/sections/creator-stories';
import { PartnerSupportSection } from '@/components/sections/partner-support';
import { FeatureMatrixSection } from '@/components/sections/feature-matrix';
import { EarningsCalculatorSection } from '@/components/sections/earnings-calculator';
import { FaqSection } from '@/components/sections/faq-section';
import { FooterBannerSection } from '@/components/sections/footer-banner';

export default function LandingPage() {
  return (
    <div className="bg-[#FAFAFA] text-[#0F172A] selection:bg-[#EC4899]/20 selection:text-[#EC4899] overflow-x-hidden font-sans">
      
      {/* SECTION 2: HERO SECTION WITH STICKY SCROLL TRACK */}
      <div id="hero">
        <AppleHero />
      </div>

      {/* Product Anchor Target for Scroll Button */}
      <div id="product">
        {/* Dual Audience Value Proposition */}
        <DualValuePropSection />
      </div>

      {/* 3-Step Workflow Engine */}
      <StickyScrollyteller />

      {/* Creator Community Video Carousel */}
      <CreatorStoriesSection />

      {/* Localized Pakistan Partner Grid */}
      <PartnerSupportSection />

      {/* Interactive Tabbed Feature Showcase */}
      <FeatureMatrixSection />

      {/* Interactive PKR Earnings Calculator */}
      <EarningsCalculatorSection />

      {/* Accordion FAQ System */}
      <FaqSection />

      {/* Pre-Footer Banner & Footer Architecture */}
      <FooterBannerSection />

    </div>
  );
}
