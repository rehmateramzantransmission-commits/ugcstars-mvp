import { z } from 'zod';
import { router, brandProcedure, protectedProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

export const campaignRouter = router({
  create: brandProcedure
    .input(z.any()) // Use shared schema in real impl
    .mutation(async ({ ctx, input }) => {
      const profile = await (ctx.db as any).brandProfile.findUnique({ where: { userId: ctx.user.id } });
      return await (ctx.db as any).campaign.create({
        data: { ...input, brandId: profile.id, status: 'DRAFT' },
      });
    }),

  update: brandProcedure
    .input(z.object({ id: z.string(), data: z.any() }))
    .mutation(async ({ ctx, input }) => {
      const campaign = await (ctx.db as any).campaign.findUnique({ where: { id: input.id } });
      if (campaign.status !== 'DRAFT') throw new TRPCError({ code: 'BAD_REQUEST', message: 'Only draft campaigns can be updated' });
      return await (ctx.db as any).campaign.update({
        where: { id: input.id },
        data: input.data,
      });
    }),

  getById: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await (ctx.db as any).campaign.findUnique({
        where: { id: input.id },
        include: { slots: { include: { contentPlans: true, drafts: true } } },
      });
    }),

  listByBrand: brandProcedure
    .input(z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(100).default(50),
      status: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const profile = await (ctx.db as any).brandProfile.findUnique({ where: { userId: ctx.user.id } });
      const items = await (ctx.db as any).campaign.findMany({
        where: { brandId: profile.id, ...(input.status ? { status: input.status } : {}) },
        take: input.limit + 1,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: { createdAt: 'desc' },
      });
      let nextCursor: typeof input.cursor | undefined = undefined;
      if (items.length > input.limit) {
        const nextItem = items.pop();
        nextCursor = nextItem.id;
      }
      return { items, nextCursor };
    }),

  fund: brandProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Simulation for Safepay
      return await (ctx.db as any).campaign.update({
        where: { id: input.id },
        data: { status: 'OPEN' },
      });
    }),

  duplicate: brandProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const campaign = await (ctx.db as any).campaign.findUnique({ where: { id: input.id } });
      if (!campaign) throw new TRPCError({ code: 'NOT_FOUND' });
      const { id, createdAt, updatedAt, status, ...rest } = campaign;
      return await (ctx.db as any).campaign.create({
        data: { ...rest, status: 'DRAFT' },
      });
    }),

  markComplete: brandProcedure
    .input(z.object({ slotId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // Payout logic simulated here
      return await (ctx.db as any).campaignSlot.update({
        where: { id: input.slotId },
        data: { status: 'COMPLETED' },
      });
    }),
});
