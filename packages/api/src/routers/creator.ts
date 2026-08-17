import { z } from 'zod';
import { router, creatorProcedure } from '../trpc';

export const creatorRouter = router({
  submitSocialAccounts: creatorProcedure
    .input(z.object({
      accounts: z.array(z.object({
        platform: z.string(),
        handle: z.string(),
        profileUrl: z.string().url(),
      })),
    }))
    .mutation(async ({ ctx, input }) => {
      const profile = await (ctx.db as any).creatorProfile.findUnique({ where: { userId: ctx.user.id } });
      for (const acc of input.accounts) {
        await (ctx.db as any).socialAccount.upsert({
          where: { creatorId_platform: { creatorId: profile.id, platform: acc.platform } },
          update: { handle: acc.handle, profileUrl: acc.profileUrl },
          create: { creatorId: profile.id, platform: acc.platform, handle: acc.handle, profileUrl: acc.profileUrl },
        });
      }
      return { success: true };
    }),

  uploadVerificationScreenshot: creatorProcedure
    .input(z.object({ accountId: z.string(), screenshotUrl: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).socialAccount.update({
        where: { id: input.accountId },
        data: { verificationScreenshotUrl: input.screenshotUrl },
      });
    }),

  getVerificationStatus: creatorProcedure.query(async ({ ctx }) => {
    const profile = await (ctx.db as any).creatorProfile.findUnique({
      where: { userId: ctx.user.id },
      select: { verificationStatus: true, slab: true },
    });
    return profile;
  }),

  getSlabInfo: creatorProcedure.query(async ({ ctx }) => {
    const profile = await (ctx.db as any).creatorProfile.findUnique({
      where: { userId: ctx.user.id },
      select: { slab: true, followerCount: true },
    });
    return {
      currentSlab: profile?.slab,
      followerTotal: profile?.followerCount || 0,
      nextSlabGoal: 10000, // Example logic
    };
  }),
});
