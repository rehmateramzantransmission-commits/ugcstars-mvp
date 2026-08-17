import { z } from 'zod';

export const submitSubmissionSchema = z.object({
  postUrl: z.string().url('Invalid Post URL'),
  screenshots: z.array(z.string().url('Invalid screenshot URL')).min(1, 'At least one screenshot is required'),
  metrics: z.object({
    views: z.number().int().nonnegative().optional(),
    likes: z.number().int().nonnegative().optional(),
    comments: z.number().int().nonnegative().optional(),
    shares: z.number().int().nonnegative().optional(),
  }).optional(),
});

export type SubmitSubmissionInput = z.infer<typeof submitSubmissionSchema>;
