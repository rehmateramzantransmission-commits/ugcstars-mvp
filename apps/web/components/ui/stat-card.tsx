'use client';
import * as React from 'react';
import { motion, useInView, useSpring, useTransform } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { cn } from '@/lib/utils';
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  trend?: number;
  icon?: React.ReactNode;
  format?: string;
  className?: string;
}

export function StatCard({ title, value, prefix = '', suffix = '', trend, icon, format, className }: StatCardProps) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const numericValue = typeof value === 'number' ? value : parseFloat(value.toString().replace(/[^0-9.-]+/g, '')) || 0;
  const springValue = useSpring(0, { bounce: 0, duration: 2000 });
  const displayValue = useTransform(springValue, (current) => Math.round(current).toLocaleString());

  React.useEffect(() => {
    if (isInView) {
      springValue.set(numericValue);
    }
  }, [isInView, numericValue, springValue]);

  return (
    <Card className={className} ref={ref}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {prefix}
          <motion.span>{displayValue}</motion.span>
          {suffix}
        </div>
        {trend !== undefined && (
          <p className={cn('flex items-center text-xs mt-1', trend > 0 ? 'text-emerald-600' : 'text-red-600')}>
            {trend > 0 ? <ArrowUpIcon className="mr-1 h-3 w-3" /> : <ArrowDownIcon className="mr-1 h-3 w-3" />}
            {Math.abs(trend)}% from last month
          </p>
        )}
      </CardContent>
    </Card>
  );
}
