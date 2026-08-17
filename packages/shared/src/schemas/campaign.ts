import { z } from 'zod';

const deliverableSchema = z.object({
  type: z.string(),
  count: z.number().int().positive(),
  description: z.string().optional(),
});

export const campaignSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  objective: z.string().min(3, 'Objective is required'),
  category: z.string().min(1, 'Category is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  briefAssets: z.array(z.string().url()).optional(),
  dosAndDonts: z.string().optional(),
  hashtags: z.array(z.string()).optional(),
  mentions: z.array(z.string()).optional(),
  targetSlabs: z.array(z.string()).min(1, 'Select at least one target slab'),
  deliverables: z.array(deliverableSchema).min(1, 'At least one deliverable is required'),
  contentRights: z.enum(['NONE', 'DIGITAL', 'FULL']),
  rightsDuration: z.number().int().nonnegative().optional(),
  deadline: z.string().datetime(),
  budget: z.coerce.number().positive('Budget must be positive'),
  maxSlots: z.number().int().positive(),
});

export type CampaignInput = z.infer<typeof campaignSchema>;
