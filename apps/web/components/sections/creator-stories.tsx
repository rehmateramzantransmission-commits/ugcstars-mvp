'use client';

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Play, Sparkles } from 'lucide-react';

const CREATOR_STORIES = [
  {
    id: 1,
    creator: 'Zainab Fatima',
    handle: '@zainab_style',
    city: 'Karachi',
    brand: 'Khaadi Pret',
    payout: 'PKR 180,000',
    views: '120K Views',
    thumbnail: '/images/pakistani_creator_1.jpg',
  },
  {
    id: 2,
    creator: 'Hamza Ahmed',
    handle: '@hamza_tech',
    city: 'Lahore',
    brand: 'Bykea Pakistan',
    payout: 'PKR 250,000',
    views: '240K Views',
    thumbnail: '/images/pakistani_creator_2.jpg',
  },
  {
    id: 3,
    creator: 'Ayesha Khan',
    handle: '@ayesha_glam',
    city: 'Islamabad',
    brand: 'L’Oréal Paris PK',
    payout: 'PKR 210,000',
    views: '190K Views',
    thumbnail: '/images/pakistani_creator_3.jpg',
  },
  {
    id: 4,
    creator: 'Bilal Hassan',
    handle: '@bilal_eats',
    city: 'Karachi',
    brand: 'Foodpanda PK',
    payout: 'PKR 140,000',
    views: '150K Views',
    thumbnail: '/images/pakistani_creator_4.jpg',
  },
  {
    id: 5,
    creator: 'Sania Mirza',
    handle: '@sania_fit',
    city: 'Rawalpindi',
    brand: 'Organic Bloom PK',
    payout: 'PKR 95,000',
    views: '85K Views',
    thumbnail: '/images/pakistani_creator_1.jpg',
  },
];

export function CreatorStoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const progress = scrollLeft / (scrollWidth - clientWidth);
      setScrollProgress(progress);
    }
  };

  useEffect(() => {
    const ref = scrollRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <section className="bg-[#0B1E17] py-20 font-sans border-t border-emerald-950/80 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-left">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] bg-[#0E6E52]/20 px-4 py-1.5 rounded-full border border-emerald-700/60 inline-block font-bold mb-3">
              Creator Stories
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-white">
              Hear from Pakistan’s top UGC creators.
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-md font-medium">
            Real Pakistani creators generating real impact with performance-based PPV payouts.
          </p>
        </div>

        {/* SECTION 5 Carousel */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-snap-type-x-mandatory py-4 no-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none' }}
        >
          {CREATOR_STORIES.map((story) => (
            <motion.div
              key={story.id}
              whileHover={{ y: -6 }}
              className="flex-none w-[280px] h-[440px] rounded-3xl relative overflow-hidden scroll-snap-align-start shadow-xl border border-emerald-900/60 group cursor-pointer"
            >
              <img 
                src={story.thumbnail} 
                alt={story.creator}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05140F]/95 via-[#05140F]/40 to-transparent" />

              {/* Play SVG Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-[#0E6E52]/40 backdrop-blur-md border border-[#34D399]/40 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 fill-current ml-1 text-[#34D399]" />
                </div>
              </div>

              {/* Local Brand Tag Overlay */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1.5 rounded-full bg-[#05140F]/90 border border-emerald-800 backdrop-blur-md text-[#34D399] font-extrabold text-xs shadow-sm">
                {story.brand}
              </div>

              {/* Creator Handle & Details */}
              <div className="absolute bottom-4 left-4 right-4 z-10 text-white text-left space-y-1">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-[#34D399]">
                  <span>{story.views}</span>
                  <span className="text-white bg-[#0E6E52] px-2 py-0.5 rounded-full border border-emerald-600">{story.payout}</span>
                </div>
                <h4 className="font-extrabold text-base leading-snug">{story.creator}</h4>
                <p className="text-xs text-slate-300 font-mono">{story.handle} • {story.city}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Drag Progress Bar */}
        <div className="w-64 h-1.5 bg-emerald-950 rounded-full mx-auto mt-8 overflow-hidden border border-emerald-900/40">
          <div 
            className="h-full bg-[#34D399] rounded-full transition-transform duration-150 origin-left"
            style={{ transform: `scaleX(${Math.max(0.15, scrollProgress)})` }}
          />
        </div>

      </div>
    </section>
  );
}
