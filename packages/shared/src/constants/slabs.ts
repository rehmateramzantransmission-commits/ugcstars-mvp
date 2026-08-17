export const SLABS = {
  RISING: { label: 'Rising', labelUr: 'ابھرتے ہوئے', min: 10_000, max: 50_000, color: '#34D399' },
  EMERGING: { label: 'Emerging', labelUr: 'ابھرتے', min: 50_000, max: 200_000, color: '#6EE7B7' },
  ESTABLISHED: { label: 'Established', labelUr: 'مستحکم', min: 200_000, max: 500_000, color: '#0E6E52' },
  ELITE: { label: 'Elite', labelUr: 'ایلیٹ', min: 500_000, max: 1_000_000, color: '#F4A63C' },
  ICON: { label: 'Icon', labelUr: 'آئیکن', min: 1_000_000, max: Infinity, color: '#D97706' },
} as const;

export type SlabKey = keyof typeof SLABS;

export function getSlabForFollowerCount(count: number): SlabKey | null {
  for (const [key, slab] of Object.entries(SLABS)) {
    if (count >= slab.min && count < slab.max) return key as SlabKey;
  }
  return null;
}

export function getNextSlab(currentSlab: SlabKey): SlabKey | null {
  const order: SlabKey[] = ['RISING', 'EMERGING', 'ESTABLISHED', 'ELITE', 'ICON'];
  const idx = order.indexOf(currentSlab);
  return idx < order.length - 1 ? order[idx + 1]! : null;
}
