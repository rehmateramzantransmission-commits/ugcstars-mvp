import { z } from 'zod';
import { router, creatorProcedure } from '../trpc';
import { encrypt } from '../lib/encryption';

export const kycRouter = router({
  submit: creatorProcedure
    .input(z.object({ cnicNumber: z.string(), frontImageUrl: z.string(), backImageUrl: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
      const encryptedCnic = encrypt(input.cnicNumber);
      return await (ctx.db as any).kycRecord.create({
        data: {
          creatorId: profile.id,
          cnicEncrypted: encryptedCnic,
          frontImageUrl: input.frontImageUrl,
          backImageUrl: input.backImageUrl,
          status: 'PENDING',
        },
      });
    }),

  getStatus: creatorProcedure.query(async ({ ctx }) => {
    const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
    const record = await (ctx.db as any).kycRecord.findFirst({
      where: { creatorId: profile.id },
      orderBy: { createdAt: 'desc' },
    });
    return record ? { status: record.status, rejectionReason: record.rejectionReason } : null;
  }),
});
