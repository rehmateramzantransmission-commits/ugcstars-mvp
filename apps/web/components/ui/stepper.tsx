'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Step {
  label: string;
  status: 'complete' | 'current' | 'upcoming';
}

interface StepperProps {
  steps: Step[];
}

export function Stepper({ steps }: StepperProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.label}>
            <div className="relative flex flex-col items-center group">
              <motion.div
                className={cn(
                  'flex h-8 w-8 items-center justify-center rounded-full border-2 transition-colors z-10 bg-background',
                  step.status === 'complete' && 'border-primary bg-primary text-primary-foreground',
                  step.status === 'current' && 'border-primary text-primary',
                  step.status === 'upcoming' && 'border-muted-foreground text-muted-foreground'
                )}
                animate={step.status === 'current' ? { scale: [1, 1.1, 1] } : {}}
                transition={step.status === 'current' ? { repeat: Infinity, duration: 2 } : {}}
              >
                {step.status === 'complete' ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <span className="text-xs font-medium">{index + 1}</span>
                )}
              </motion.div>
              <div className="absolute top-10 text-center">
                <span
                  className={cn(
                    'text-xs font-medium',
                    step.status === 'upcoming' ? 'text-muted-foreground' : 'text-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-0.5 mx-2 bg-muted relative">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary"
                  initial={{ width: '0%' }}
                  animate={{ width: step.status === 'complete' ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
