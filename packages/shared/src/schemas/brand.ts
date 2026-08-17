import { z } from 'zod';

export const updateBrandProfileSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  logo: z.string().url('Invalid logo URL').optional(),
  website: z.string().url('Invalid website URL').optional(),
  industry: z.string().min(2, 'Industry is required'),
  bio: z.string().max(1000, 'Bio must be at most 1000 characters').optional(),
});

export type UpdateBrandProfileInput = z.infer<typeof updateBrandProfileSchema>;
