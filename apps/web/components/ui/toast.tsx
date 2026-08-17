'use client';
import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ToastProps {
  id: string;
  title?: string;
  description?: string;
  variant?: 'default' | 'success' | 'error' | 'warning';
  onClose: (id: string) => void;
}

export function Toast({ id, title, description, variant = 'default', onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className={cn(
        'pointer-events-auto flex w-full max-w-md rounded-lg shadow-lg ring-1 ring-black/5 p-4',
        variant === 'default' && 'bg-background text-foreground',
        variant === 'success' && 'bg-emerald-50 text-emerald-900 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-50',
        variant === 'error' && 'bg-red-50 text-red-900 border border-red-200 dark:bg-red-950 dark:text-red-50',
        variant === 'warning' && 'bg-amber-50 text-amber-900 border border-amber-200 dark:bg-amber-950 dark:text-amber-50'
      )}
    >
      <div className="flex-1 w-0">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            {title && <p className="text-sm font-medium">{title}</p>}
            {description && <p className="mt-1 text-sm opacity-90">{description}</p>}
          </div>
        </div>
      </div>
      <div className="ml-4 flex flex-shrink-0">
        <button
          type="button"
          className="inline-flex rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          onClick={() => onClose(id)}
        >
          <span className="sr-only">Close</span>
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </motion.div>
  );
}

// In a full implementation, you would have a ToastProvider and useToast hook
// For brevity, we provide the UI component here.
