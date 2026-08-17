export const CATEGORIES = [
  { slug: 'fashion', label: 'Fashion', labelUr: 'فیشن', icon: '👗' },
  { slug: 'beauty', label: 'Beauty', labelUr: 'خوبصورتی', icon: '💄' },
  { slug: 'food', label: 'Food', labelUr: 'کھانا', icon: '🍕' },
  { slug: 'tech', label: 'Tech', labelUr: 'ٹیکنالوجی', icon: '💻' },
  { slug: 'fitness', label: 'Fitness', labelUr: 'فٹنس', icon: '💪' },
  { slug: 'lifestyle', label: 'Lifestyle', labelUr: 'طرز زندگی', icon: '✨' },
  { slug: 'gaming', label: 'Gaming', labelUr: 'گیمنگ', icon: '🎮' },
  { slug: 'education', label: 'Education', labelUr: 'تعلیم', icon: '📚' },
  { slug: 'travel', label: 'Travel', labelUr: 'سفر', icon: '✈️' },
  { slug: 'comedy', label: 'Comedy', labelUr: 'مزاح', icon: '😂' },
] as const;

export type CategorySlug = (typeof CATEGORIES)[number]['slug'];
