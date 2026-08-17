import { z } from 'zod';

export const submitContentPlanSchema = z.object({
  concept: z.string().min(10, 'Concept must be at least 10 characters'),
  hook: z.string().min(5, 'Hook is required'),
  outline: z.string().min(10, 'Outline is required'),
  shotList: z.string().optional(),
  references: z.array(z.string().url()).optional(),
  proposedDates: z.array(z.string().datetime()).min(1, 'Provide at least one proposed date'),
  proposedPrice: z.coerce.number().positive().optional(),
});

export const reviewContentPlanSchema = z.object({
  planId: z.string().uuid('Invalid Plan ID'),
  comment: z.string().optional(),
});

export type SubmitContentPlanInput = z.infer<typeof submitContentPlanSchema>;
export type ReviewContentPlanInput = z.infer<typeof reviewContentPlanSchema>;
