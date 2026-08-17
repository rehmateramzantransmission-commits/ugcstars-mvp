import { z } from 'zod';

export const submitDraftSchema = z.object({
  fileUrl: z.string().url('Invalid file URL'),
  fileType: z.string(),
  caption: z.string().optional(),
});

export const reviewDraftSchema = z.object({
  draftId: z.string().uuid('Invalid Draft ID'),
  comment: z.string().optional(),
});

export type SubmitDraftInput = z.infer<typeof submitDraftSchema>;
export type ReviewDraftInput = z.infer<typeof reviewDraftSchema>;
