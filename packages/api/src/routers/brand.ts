import { z } from 'zod';
import { router, brandProcedure } from '../trpc';

export const brandRouter = router({
  getProfile: brandProcedure.query(async ({ ctx }) => {
    const profile = await (ctx.db as any).brandProfile.findUnique({
      where: { userId: ctx.user.id },
      include: {
        campaigns: {
          select: { id: true, status: true },
        },
      },
    });
    return profile;
  }),

  updateProfile: brandProcedure
    .input(z.object({
      companyName: z.string().optional(),
      logo: z.string().url().optional(),
      website: z.string().url().optional(),
      industry: z.string().optional(),
      bio: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).brandProfile.update({
        where: { userId: ctx.user.id },
        data: input,
      });
    }),
});
