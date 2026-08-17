export const SOCIAL_PLATFORMS = [
  { slug: 'instagram', label: 'Instagram', labelUr: 'انسٹاگرام', icon: '📸', color: '#E4405F' },
  { slug: 'tiktok', label: 'TikTok', labelUr: 'ٹک ٹاک', icon: '🎵', color: '#000000' },
  { slug: 'youtube', label: 'YouTube', labelUr: 'یوٹیوب', icon: '▶️', color: '#FF0000' },
  { slug: 'facebook', label: 'Facebook', labelUr: 'فیس بک', icon: '👤', color: '#1877F2' },
] as const;

export type SocialPlatformSlug = (typeof SOCIAL_PLATFORMS)[number]['slug'];
