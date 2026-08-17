import { z } from 'zod';
import { router, brandProcedure, protectedProcedure } from '../trpc';

export function calculatePlatformFee(amount: number, feePercent: number): number {
  return (amount * feePercent) / 100;
}

export function calculateWHT(amount: number, isFiler: boolean, filerRate: number, nonFilerRate: number): number {
  const rate = isFiler ? filerRate : nonFilerRate;
  return (amount * rate) / 100;
}

export function calculateNetPayout(
  grossAmount: number,
  platformFeePercent: number,
  isFiler: boolean,
  whtFilerRate: number,
  whtNonFilerRate: number
): { platformFee: number; whtAmount: number; netAmount: number } {
  const platformFee = calculatePlatformFee(grossAmount, platformFeePercent);
  const taxableAmount = grossAmount - platformFee;
  const whtAmount = calculateWHT(taxableAmount, isFiler, whtFilerRate, whtNonFilerRate);
  const netAmount = grossAmount - platformFee - whtAmount;
  return { platformFee, whtAmount, netAmount };
}

export const escrowRouter = router({
  fundCampaign: brandProcedure
    .input(z.object({ campaignId: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      // Setup escrow transaction
      return await (ctx.db as any).escrowTransaction.create({
        data: {
          campaignId: input.campaignId,
          amount: input.amount,
          type: 'FUND',
          status: 'COMPLETED',
        },
      });
    }),

  refundCampaign: brandProcedure
    .input(z.object({ campaignId: z.string(), amount: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).escrowTransaction.create({
        data: {
          campaignId: input.campaignId,
          amount: input.amount,
          type: 'REFUND',
          status: 'COMPLETED',
        },
      });
    }),

  getEscrowStatus: protectedProcedure
    .input(z.object({ slotId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await (ctx.db as any).escrowTransaction.findMany({
        where: { slotId: input.slotId },
      });
    }),
});
