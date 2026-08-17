import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const skeletonVariants = cva('animate-pulse bg-muted', {
  variants: {
    shape: {
      line: 'h-4 w-full rounded',
      circle: 'rounded-full',
      card: 'rounded-xl',
      text: 'h-4 w-3/4 rounded',
    },
  },
  defaultVariants: {
    shape: 'line',
  },
});

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, shape, ...props }: SkeletonProps) {
  return <div className={cn(skeletonVariants({ shape }), className)} {...props} />;
}

export { Skeleton };
