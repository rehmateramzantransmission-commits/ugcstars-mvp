'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Sparkles } from 'lucide-react';

const PARTNERS = [
  {
    city: 'Karachi Hub',
    name: 'Taha Siddiqui',
    role: 'Lead Talent Manager',
    prompt: 'Abhi connect karen Direct Message ke zariye',
    image: '/images/partner_karachi.jpg',
    color: 'bg-emerald-950 border-emerald-700 text-[#34D399]',
  },
  {
    city: 'Lahore Hub',
    name: 'Fatima Noor',
    role: 'Brand Growth Lead',
    prompt: 'Abhi connect karen Direct Message ke zariye',
    image: '/images/partner_lahore.jpg',
    color: 'bg-emerald-950 border-emerald-700 text-[#34D399]',
  },
  {
    city: 'Islamabad Hub',
    name: 'Usman Ali',
    role: 'Creator Operations Lead',
    prompt: 'Abhi connect karen Direct Message ke zariye',
    image: '/images/partner_islamabad.jpg',
    color: 'bg-emerald-950 border-emerald-700 text-[#34D399]',
  },
  {
    city: 'All-Pakistan Agency',
    name: 'Ayesha Malik',
    role: 'Head of Partnerships',
    prompt: 'Abhi connect karen Direct Message ke zariye',
    image: '/images/partner_allpk.jpg',
    color: 'bg-emerald-950 border-emerald-700 text-[#34D399]',
  },
];

export function PartnerSupportSection() {
  return (
    <section className="bg-[#071913] py-20 font-sans border-t border-emerald-950/80">
      <div className="max-w-[1280px] mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[#34D399] bg-[#0E6E52]/20 px-4 py-1.5 rounded-full border border-emerald-700/60 inline-block font-bold mb-3">
            Local Support Network
          </span>
          <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
            Meet Your Local Partner at UGCstars
          </h2>
          <p className="text-slate-300 text-sm font-medium">
            Our local talent managers in Karachi, Lahore, and Islamabad are ready to support your campaign strategy 24/7.
          </p>
        </div>

        {/* SECTION 6: 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PARTNERS.map((partner, idx) => (
            <motion.div
              key={partner.city}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="p-6 rounded-3xl bg-[#0D261E] border border-emerald-800/60 shadow-lg flex flex-col justify-between text-left hover:shadow-emerald-900/40 transition-shadow"
            >
              <div>
                <div className="w-full h-52 rounded-2xl overflow-hidden mb-4 border border-emerald-900/80 shadow-inner">
                  <img src={partner.image} alt={partner.name} className="w-full h-full object-cover" />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${partner.color} inline-block mb-2 font-mono`}>
                  {partner.city}
                </span>
                <h4 className="font-extrabold text-lg text-white mb-0.5">{partner.name}</h4>
                <p className="text-xs text-slate-300 font-medium mb-4">{partner.role}</p>
              </div>

              <button className="w-full py-2.5 px-4 rounded-xl bg-[#0E6E52] text-white font-bold text-xs flex items-center justify-center gap-2 hover:bg-[#108A67] transition-colors cursor-pointer shadow-md">
                <MessageCircle className="w-4 h-4 text-[#34D399]" />
                <span>{partner.prompt}</span>
              </button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
