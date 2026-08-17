import { z } from 'zod';
import { router, creatorProcedure, brandProcedure, protectedProcedure } from '../trpc';

export const draftRouter = router({
  upload: creatorProcedure
    .input(z.object({ slotId: z.string(), fileUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).draft.create({
        data: { slotId: input.slotId, fileUrl: input.fileUrl, version: 1, status: 'SUBMITTED' },
      });
    }),

  revise: creatorProcedure
    .input(z.object({ slotId: z.string(), fileUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const prev = await (ctx.db as any).draft.findFirst({ where: { slotId: input.slotId }, orderBy: { version: 'desc' } });
      return await (ctx.db as any).draft.create({
        data: { slotId: input.slotId, fileUrl: input.fileUrl, version: (prev?.version || 0) + 1, status: 'SUBMITTED' },
      });
    }),

  approve: brandProcedure
    .input(z.object({ draftId: z.string(), slotId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await (ctx.db as any).draft.update({ where: { id: input.draftId }, data: { status: 'APPROVED' } });
      await (ctx.db as any).campaignSlot.update({ where: { id: input.slotId }, data: { status: 'DRAFT_APPROVED' } });
      return { success: true };
    }),

  requestRevision: brandProcedure
    .input(z.object({ draftId: z.string(), comment: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await (ctx.db as any).draft.update({ where: { id: input.draftId }, data: { status: 'REVISION_REQUESTED' } });
      await (ctx.db as any).comment.create({ data: { draftId: input.draftId, userId: ctx.user.id, content: input.comment } });
      return { success: true };
    }),

  getBySlot: protectedProcedure
    .input(z.object({ slotId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await (ctx.db as any).draft.findMany({
        where: { slotId: input.slotId },
        include: { comments: true },
        orderBy: { version: 'asc' },
      });
    }),

  addComment: protectedProcedure
    .input(z.object({ draftId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).comment.create({
        data: { draftId: input.draftId, userId: ctx.user.id, content: input.content },
      });
    }),
});
