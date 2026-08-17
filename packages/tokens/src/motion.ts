export const durations = {
  fast: 120,
  normal: 200,
  slow: 320,
  slower: 500,
} as const;

export const springs = {
  gentle: { type: 'spring' as const, damping: 20, stiffness: 100, mass: 1 },
  snappy: { type: 'spring' as const, damping: 24, stiffness: 300, mass: 0.8 },
  bouncy: { type: 'spring' as const, damping: 12, stiffness: 200, mass: 0.6 },
} as const;

export const easing = [0.25, 0.1, 0.25, 1.0] as const;

// Pre-built animation presets
export const transitions = {
  fadeIn: { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: durations.normal / 1000 } },
  fadeInUp: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: springs.gentle },
  fadeInDown: { initial: { opacity: 0, y: -20 }, animate: { opacity: 1, y: 0 }, transition: springs.gentle },
  scaleIn: { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: springs.snappy },
  slideInLeft: { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: springs.snappy },
  slideInRight: { initial: { opacity: 0, x: 30 }, animate: { opacity: 1, x: 0 }, transition: springs.snappy },
  // Button micro-interactions
  buttonPress: { whileTap: { scale: 0.97 }, whileHover: { scale: 1.02 }, transition: springs.snappy },
  cardHover: { whileHover: { y: -4, boxShadow: '0 12px 40px rgba(0,0,0,0.12)' }, transition: springs.gentle },
} as const;

// Stagger children animation
export const stagger = {
  container: { animate: { transition: { staggerChildren: 0.06 } } },
  item: { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } },
} as const;
