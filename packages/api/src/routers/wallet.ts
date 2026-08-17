import { z } from 'zod';
import { router, creatorProcedure } from '../trpc';
import { encrypt } from '../lib/encryption';

export const walletRouter = router({
  getBalance: creatorProcedure.query(async ({ ctx }) => {
    const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
    const wallet = await (ctx.db as any).wallet.findUnique({ where: { creatorId: profile.id } });
    return wallet || { available: 0, inEscrow: 0, lifetime: 0 };
  }),

  getTransactions: creatorProcedure
    .input(z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(100).default(50),
    }))
    .query(async ({ ctx, input }) => {
      const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
      const wallet = await (ctx.db as any).wallet.findUnique({ where: { creatorId: profile.id } });
      if (!wallet) return { items: [], nextCursor: undefined };

      const items = await (ctx.db as any).ledger.findMany({
        where: { walletId: wallet.id },
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

  requestWithdrawal: creatorProcedure
    .input(z.object({ amount: z.number(), bankDetails: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
      const wallet = await (ctx.db as any).wallet.findUnique({ where: { creatorId: profile.id } });
      if (!wallet || wallet.available < input.amount) {
        throw new Error('Insufficient balance');
      }
      
      const encryptedDetails = encrypt(input.bankDetails);
      return await (ctx.db as any).withdrawalRequest.create({
        data: {
          walletId: wallet.id,
          amount: input.amount,
          bankDetails: encryptedDetails,
          status: 'PENDING',
        },
      });
    }),

  getWithdrawals: creatorProcedure.query(async ({ ctx }) => {
    const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
    const wallet = await (ctx.db as any).wallet.findUnique({ where: { creatorId: profile.id } });
    if (!wallet) return [];
    return await (ctx.db as any).withdrawalRequest.findMany({
      where: { walletId: wallet.id },
      orderBy: { createdAt: 'desc' },
    });
  }),
});
