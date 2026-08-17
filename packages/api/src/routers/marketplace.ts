import { z } from 'zod';
import { router, creatorProcedure } from '../trpc';

export const marketplaceRouter = router({
  list: creatorProcedure
    .input(z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(100).default(50),
      category: z.string().optional(),
    }))
    .query(async ({ ctx, input }) => {
      const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
      
      const items = await (ctx.db as any).campaign.findMany({
        where: { 
          status: 'OPEN',
          targetSlab: profile?.slab,
          ...(input.category ? { category: input.category } : {})
        },
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

  getById: creatorProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const campaign = await (ctx.db as any).campaign.findUnique({
        where: { id: input.id },
      });
      return campaign; // Returning full for now, add logic to hide brief if no active slot
    }),

  applyToCampaign: creatorProcedure
    .input(z.object({ campaignId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
      return await (ctx.db as any).campaignSlot.create({
        data: { campaignId: input.campaignId, creatorId: profile.id, status: 'APPLIED' },
      });
    }),
});
