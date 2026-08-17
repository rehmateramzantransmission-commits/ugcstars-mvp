import { z } from 'zod';

export const addCommentSchema = z.object({
  body: z.string().min(1, 'Comment cannot be empty').max(1000, 'Comment is too long'),
  contentPlanId: z.string().uuid('Invalid Content Plan ID').optional(),
  draftId: z.string().uuid('Invalid Draft ID').optional(),
  parentId: z.string().uuid('Invalid Parent Comment ID').optional(),
});

export type AddCommentInput = z.infer<typeof addCommentSchema>;
