import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';

export const userRouter = router({
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const user = await (ctx.db as any).user.findUnique({
      where: { id: ctx.user.id },
      include: {
        creatorProfile: {
          include: { socialAccounts: true },
        },
        brandProfile: true,
      },
    });
    return user;
  }),

  updateProfile: protectedProcedure
    .input(z.any())
    .mutation(async ({ ctx, input }) => {
      if (ctx.user.role === 'CREATOR') {
        return await (ctx.db as any).creatorProfile.update({
          where: { userId: ctx.user.id },
          data: input,
        });
      } else if (ctx.user.role === 'BRAND') {
        return await (ctx.db as any).brandProfile.update({
          where: { userId: ctx.user.id },
          data: input,
        });
      }
    }),

  updateLocale: protectedProcedure
    .input(z.object({ locale: z.enum(['en', 'ur']) }))
    .mutation(async ({ ctx, input }) => {
      // Assuming a locale field in User
      return await (ctx.db as any).user.update({
        where: { id: ctx.user.id },
        data: { locale: input.locale },
      });
    }),
});
