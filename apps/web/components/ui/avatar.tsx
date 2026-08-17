'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const avatarVariants = cva(
  'relative flex shrink-0 overflow-hidden rounded-full',
  {
    variants: {
      size: {
        sm: 'h-8 w-8',
        md: 'h-10 w-10',
        lg: 'h-12 w-12',
        xl: 'h-16 w-16',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: string;
  isOnline?: boolean;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, src, alt, fallback, isOnline, ...props }, ref) => {
    const [hasError, setHasError] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);

    return (
      <div className="relative inline-block">
        <div ref={ref} className={cn(avatarVariants({ size }), className)} {...props}>
          {src && !hasError ? (
            <img
              src={src}
              alt={alt || ''}
              className={cn('aspect-square h-full w-full object-cover', !isLoaded && 'opacity-0')}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
            />
          ) : null}
          {(!src || hasError || !isLoaded) && (
            <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
              {fallback ? (
                <span className="font-medium text-muted-foreground">{fallback}</span>
              ) : (
                <div className="h-full w-full animate-pulse bg-secondary" />
              )}
            </div>
          )}
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';

export { Avatar };
