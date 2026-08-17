import { z } from 'zod';
import { router, creatorProcedure, protectedProcedure } from '../trpc';

export const submissionRouter = router({
  submit: creatorProcedure
    .input(z.object({
      slotId: z.string(),
      postUrl: z.string().url(),
      screenshotUrls: z.array(z.string().url()),
      metrics: z.any().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const submission = await (ctx.db as any).submission.create({
        data: {
          slotId: input.slotId,
          postUrl: input.postUrl,
          screenshotUrls: input.screenshotUrls,
          metrics: input.metrics,
        },
      });
      await (ctx.db as any).campaignSlot.update({
        where: { id: input.slotId },
        data: { status: 'PUBLISHED' },
      });
      return submission;
    }),

  getBySlot: protectedProcedure
    .input(z.object({ slotId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await (ctx.db as any).submission.findFirst({
        where: { slotId: input.slotId },
      });
    }),
});
