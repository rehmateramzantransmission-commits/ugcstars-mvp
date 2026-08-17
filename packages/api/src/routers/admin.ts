import { z } from 'zod';
import { router, adminProcedure } from '../trpc';

export const adminRouter = router({
  getVerificationQueue: adminProcedure.query(async ({ ctx }) => {
    return await (ctx.db as any).creatorProfile.findMany({
      where: { verificationStatus: 'PENDING' },
    });
  }),

  approveVerification: adminProcedure
    .input(z.object({ profileId: z.string(), slab: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await (ctx.db as any).creatorProfile.update({
        where: { id: input.profileId },
        data: { verificationStatus: 'VERIFIED', slab: input.slab },
      });
      await (ctx.db as any).auditLog.create({
        data: { adminId: ctx.user.id, action: 'APPROVE_VERIFICATION', targetId: input.profileId },
      });
      return result;
    }),

  rejectVerification: adminProcedure
    .input(z.object({ profileId: z.string(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await (ctx.db as any).creatorProfile.update({
        where: { id: input.profileId },
        data: { verificationStatus: 'REJECTED' }, // Assuming reason is stored or sent via notification
      });
      await (ctx.db as any).auditLog.create({
        data: { adminId: ctx.user.id, action: 'REJECT_VERIFICATION', targetId: input.profileId },
      });
      return result;
    }),

  getKycQueue: adminProcedure.query(async ({ ctx }) => {
    return await (ctx.db as any).kycRecord.findMany({
      where: { status: 'PENDING' },
    });
  }),

  approveKyc: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await (ctx.db as any).kycRecord.update({
        where: { id: input.id },
        data: { status: 'APPROVED' },
      });
      await (ctx.db as any).auditLog.create({
        data: { adminId: ctx.user.id, action: 'APPROVE_KYC', targetId: input.id },
      });
      return result;
    }),

  rejectKyc: adminProcedure
    .input(z.object({ id: z.string(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await (ctx.db as any).kycRecord.update({
        where: { id: input.id },
        data: { status: 'REJECTED', rejectionReason: input.reason },
      });
      await (ctx.db as any).auditLog.create({
        data: { adminId: ctx.user.id, action: 'REJECT_KYC', targetId: input.id },
      });
      return result;
    }),

  getWithdrawalQueue: adminProcedure.query(async ({ ctx }) => {
    return await (ctx.db as any).withdrawalRequest.findMany({
      where: { status: 'PENDING' },
    });
  }),

  approveWithdrawal: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await (ctx.db as any).withdrawalRequest.update({
        where: { id: input.id },
        data: { status: 'COMPLETED' },
      });
      await (ctx.db as any).auditLog.create({
        data: { adminId: ctx.user.id, action: 'APPROVE_WITHDRAWAL', targetId: input.id },
      });
      return result;
    }),

  rejectWithdrawal: adminProcedure
    .input(z.object({ id: z.string(), reason: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const result = await (ctx.db as any).withdrawalRequest.update({
        where: { id: input.id },
        data: { status: 'REJECTED' }, // Should refund wallet balance
      });
      await (ctx.db as any).auditLog.create({
        data: { adminId: ctx.user.id, action: 'REJECT_WITHDRAWAL', targetId: input.id },
      });
      return result;
    }),

  getSettings: adminProcedure.query(async ({ ctx }) => {
    return await (ctx.db as any).setting.findMany();
  }),

  updateSetting: adminProcedure
    .input(z.object({ key: z.string(), value: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).setting.upsert({
        where: { key: input.key },
        update: { value: input.value },
        create: { key: input.key, value: input.value },
      });
    }),

  getAuditLog: adminProcedure
    .input(z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(100).default(50),
    }))
    .query(async ({ ctx, input }) => {
      const items = await (ctx.db as any).auditLog.findMany({
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

  getDashboardStats: adminProcedure.query(async ({ ctx }) => {
    const pendingVerifications = await (ctx.db as any).creatorProfile.count({ where: { verificationStatus: 'PENDING' } });
    const pendingKycs = await (ctx.db as any).kycRecord.count({ where: { status: 'PENDING' } });
    const pendingWithdrawals = await (ctx.db as any).withdrawalRequest.count({ where: { status: 'PENDING' } });

    return {
      pendingVerifications,
      pendingKycs,
      pendingWithdrawals,
    };
  }),
});
