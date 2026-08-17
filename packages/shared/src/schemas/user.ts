import { z } from 'zod';

export const updateProfileSchema = z.object({
  displayName: z.string().min(2, 'Display name must be at least 2 characters'),
  bio: z.string().max(500, 'Bio must be at most 500 characters').optional(),
  avatarUrl: z.string().url('Invalid avatar URL').optional(),
  city: z.string().min(2, 'City is required'),
  languages: z.array(z.enum(['en', 'ur'])).min(1, 'Select at least one language'),
  niches: z.array(z.string()).min(1, 'Select at least one niche'),
  contentFormats: z.array(z.string()).min(1, 'Select at least one content format'),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
