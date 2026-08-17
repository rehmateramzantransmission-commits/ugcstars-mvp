"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatCardAdminProps {
  title: string;
  value: number;
  prefix?: string;
  suffix?: string;
  href?: string;
  isAlert?: boolean;
}

export function StatCardAdmin({ title, value, prefix = "", suffix = "", href, isAlert }: StatCardAdminProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number;
    const duration = 1000;
    
    const animateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      
      if (progress < duration) {
        const nextValue = Math.min(Math.floor((progress / duration) * value), value);
        setDisplayValue(nextValue);
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(value);
      }
    };
    
    requestAnimationFrame(animateCount);
  }, [value]);

  const content = (
    <Card className={`relative overflow-hidden p-6 h-full flex flex-col justify-between transition-all duration-300 ${
      isAlert ? "border-saffron/50 shadow-[0_0_15px_rgba(244,166,60,0.2)] dark:shadow-[0_0_15px_rgba(244,166,60,0.1)]" : "border-gray-200 dark:border-gray-800 hover:border-emerald/30"
    }`}>
      {isAlert && (
        <motion.div 
          className="absolute top-0 left-0 w-full h-1 bg-saffron"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
      
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-general text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        {href && <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-emerald transition-colors" />}
      </div>
      
      <div className="font-clash text-3xl font-bold text-ink dark:text-paper tracking-tight">
        {prefix}{displayValue.toLocaleString()}{suffix}
      </div>
    </Card>
  );

  if (href) {
    return (
      <Link href={href} className="group block h-full">
        <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="h-full">
          {content}
        </motion.div>
      </Link>
    );
  }

  return content;
}
