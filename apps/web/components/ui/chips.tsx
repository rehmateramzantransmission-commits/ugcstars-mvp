'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

export interface ChipOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ChipsProps {
  options: (ChipOption | string)[];
  selected: string[];
  onChange: (selected: string[]) => void;
  multiple?: boolean;
  max?: number;
  className?: string;
}

export function Chips({ options, selected, onChange, multiple = true, max, className }: ChipsProps) {
  const normalizedOptions: ChipOption[] = options.map((opt) =>
    typeof opt === 'string' ? { value: opt, label: opt } : opt
  );

  const toggleSelection = (value: string) => {
    if (multiple) {
      if (selected.includes(value)) {
        onChange(selected.filter((v) => v !== value));
      } else {
        if (max && selected.length >= max) return;
        onChange([...selected, value]);
      }
    } else {
      onChange([value]);
    }
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {normalizedOptions.map((option) => {
        const isSelected = selected.includes(option.value);
        return (
          <motion.button
            key={option.value}
            onClick={() => toggleSelection(option.value)}
            className={cn(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
              isSelected
                ? 'bg-primary text-primary-foreground border-transparent'
                : 'bg-background text-foreground border-border hover:bg-muted'
            )}
            whileTap={{ scale: 0.95 }}
          >
            {option.icon && <span>{option.icon}</span>}
            {option.label}
            <AnimatePresence>
              {isSelected && (
                <motion.span
                  initial={{ width: 0, opacity: 0, scale: 0 }}
                  animate={{ width: 'auto', opacity: 1, scale: 1 }}
                  exit={{ width: 0, opacity: 0, scale: 0 }}
                  className="flex items-center justify-center"
                >
                  <Check className="w-3.5 h-3.5" />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
