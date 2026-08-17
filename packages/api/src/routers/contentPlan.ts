import { z } from 'zod';
import { router, creatorProcedure, brandProcedure, protectedProcedure } from '../trpc';

export const contentPlanRouter = router({
  submit: creatorProcedure
    .input(z.object({ slotId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).contentPlan.create({
        data: { slotId: input.slotId, content: input.content, version: 1, status: 'SUBMITTED' },
      });
    }),

  revise: creatorProcedure
    .input(z.object({ slotId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const prev = await (ctx.db as any).contentPlan.findFirst({ where: { slotId: input.slotId }, orderBy: { version: 'desc' } });
      return await (ctx.db as any).contentPlan.create({
        data: { slotId: input.slotId, content: input.content, version: (prev?.version || 0) + 1, status: 'SUBMITTED' },
      });
    }),

  approve: brandProcedure
    .input(z.object({ planId: z.string(), slotId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await (ctx.db as any).contentPlan.update({ where: { id: input.planId }, data: { status: 'APPROVED' } });
      await (ctx.db as any).campaignSlot.update({ where: { id: input.slotId }, data: { status: 'PLAN_APPROVED' } });
      return { success: true };
    }),

  requestRevision: brandProcedure
    .input(z.object({ planId: z.string(), comment: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await (ctx.db as any).contentPlan.update({ where: { id: input.planId }, data: { status: 'REVISION_REQUESTED' } });
      await (ctx.db as any).comment.create({ data: { planId: input.planId, userId: ctx.user.id, content: input.comment } });
      return { success: true };
    }),

  decline: brandProcedure
    .input(z.object({ planId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).contentPlan.update({ where: { id: input.planId }, data: { status: 'DECLINED' } });
    }),

  getBySlot: protectedProcedure
    .input(z.object({ slotId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await (ctx.db as any).contentPlan.findMany({
        where: { slotId: input.slotId },
        include: { comments: true },
        orderBy: { version: 'asc' },
      });
    }),

  addComment: protectedProcedure
    .input(z.object({ planId: z.string(), content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).comment.create({
        data: { planId: input.planId, userId: ctx.user.id, content: input.content },
      });
    }),
});
