'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  success?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, success, leftIcon, rightIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            {leftIcon}
          </div>
        )}
        <motion.input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-shadow',
            leftIcon && 'pl-10',
            (rightIcon || error || success) && 'pr-10',
            error && 'border-destructive focus-visible:ring-destructive',
            success && 'border-primary focus-visible:ring-primary',
            className
          )}
          ref={ref}
          animate={error ? { x: [-2, 2, -2, 2, 0] } : {}}
          transition={{ duration: 0.3 }}
          {...(props as any)}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
          {error && <AlertCircle className="h-4 w-4 text-destructive" />}
          {success && <CheckCircle2 className="h-4 w-4 text-primary" />}
          {rightIcon && <span className="text-muted-foreground">{rightIcon}</span>}
        </div>
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
