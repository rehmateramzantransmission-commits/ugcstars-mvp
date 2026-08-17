'use client';
import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Input } from './input';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  error?: boolean;
  className?: string;
}

export function OtpInput({ length = 6, value, onChange, onComplete, error, className }: OtpInputProps) {
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 1);
    const newValue = value.split('');
    newValue[index] = val;
    const finalValue = newValue.join('');
    onChange(finalValue);

    if (val && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (finalValue.length === length && onComplete) {
      onComplete(finalValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '').slice(0, length);
    onChange(pastedData);
    if (pastedData.length === length && onComplete) {
      onComplete(pastedData);
    }
    const focusIndex = Math.min(pastedData.length, length - 1);
    inputRefs.current[focusIndex]?.focus();
  };

  return (
    <motion.div 
      className={cn("flex gap-2 justify-center", className)}
      animate={error ? { x: [-5, 5, -5, 5, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {Array.from({ length }).map((_, i) => (
        <Input
          key={i}
          ref={(el: any) => (inputRefs.current[i] = el)}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          maxLength={1}
          value={value[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          onPaste={handlePaste}
          className={cn(
            'w-12 h-14 text-center text-lg font-semibold',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
        />
      ))}
    </motion.div>
  );
}

export const OTPInput = OtpInput;
