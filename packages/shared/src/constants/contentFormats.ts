export const CONTENT_FORMATS = [
  { slug: 'reels', label: 'Instagram Reels', labelUr: 'انسٹاگرام ریلز', icon: '🎬' },
  { slug: 'tiktok', label: 'TikTok Videos', labelUr: 'ٹک ٹاک ویڈیوز', icon: '🎵' },
  { slug: 'stories', label: 'Stories', labelUr: 'اسٹوریز', icon: '📱' },
  { slug: 'youtube', label: 'YouTube Videos', labelUr: 'یوٹیوب ویڈیوز', icon: '▶️' },
  { slug: 'static', label: 'Static Posts', labelUr: 'سٹیٹک پوسٹس', icon: '🖼️' },
  { slug: 'blog', label: 'Blog Posts', labelUr: 'بلاگ پوسٹس', icon: '📝' },
] as const;

export type ContentFormatSlug = (typeof CONTENT_FORMATS)[number]['slug'];
