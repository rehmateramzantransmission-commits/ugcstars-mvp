/**
 * UGC Stars Theme Tokens
 * Sourced directly from `metapic-header.md` design system & reverse-engineering specification.
 */

export const themeTokens = {
  layout: {
    navHeight: '76px',
    containerMax: '1360px',
    heroMaxWidth: '840px',
    subheadMaxWidth: '560px',
  },
  colors: {
    heroBg: '#0A0A0C', // Monochrome black/graphite hero base
    heroSurface: '#1A1A1E', // Rotated background rectangle shapes
    heroVignetteCenter: 'rgba(45,45,55,0.65)',
    textPrimary: '#FFFFFF',
    textSecondary: '#B8B8BE', // ~72% white
    accentPink: '#F0A8C4', // Active nav pill & primary CTA pink fill
    accentPinkDot: '#C75B8F', // Leading dot indicator inside active pill
    accentPinkHover: '#E592B1',
    accentNavy: '#3A3F52', // Secondary CTA & nav "Sign up" button fill
    accentNavyHover: '#4A5068',
    navBgTransparent: 'transparent',
    navBgScrolled: 'rgba(10,10,12,0.85)',
    mockupGradient: 'linear-gradient(135deg, #F5B8D0 0%, #F7C9A0 100%)',
  },
  radii: {
    pill: '9999px',
    card: '24px',
    inner: '16px',
    mockup: '48px',
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "General Sans", "Inter", sans-serif',
    h1Desktop: '68px',
    h1Mobile: '36px',
    h1LineHeight: '1.15',
    subheadSize: '19px',
    subheadLineHeight: '1.5',
    navSize: '15px',
  },
  zIndex: {
    header: 999,
    mobileDrawer: 998,
    heroContent: 30,
    phoneMockup: 20,
    backgroundShapes: 10,
    baseCanvas: 1,
  },
  breakpoints: {
    mobile: 479,
    mobileLandscape: 767,
    tablet: 991,
    desktop: 1439,
  },
} as const;
