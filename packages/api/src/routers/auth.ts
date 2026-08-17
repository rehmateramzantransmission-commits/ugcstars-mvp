import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '../lib/jwt';

export const authRouter = router({
  sendOtp: publicProcedure
    .input(z.object({ phone: z.string() }))
    .mutation(async ({ input }) => {
      // TODO: Implement Firebase SMS sending
      return { success: true };
    }),

  verifyOtp: publicProcedure
    .input(z.object({ phone: z.string(), otp: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (input.otp !== '123456') {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid OTP' });
      }

      const user = await (ctx.db as any).user.upsert({
        where: { phone: input.phone },
        update: {},
        create: { phone: input.phone, role: 'CREATOR' },
      });

      const accessToken = signAccessToken({ userId: user.id, role: user.role });
      const refreshToken = signRefreshToken({ userId: user.id });

      return { accessToken, refreshToken, user };
    }),

  googleAuth: publicProcedure
    .input(z.object({ idToken: z.string(), email: z.string().email(), googleId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      // TODO: Verify idToken with Firebase Admin
      const user = await (ctx.db as any).user.upsert({
        where: { email: input.email },
        update: { googleId: input.googleId },
        create: { email: input.email, googleId: input.googleId, role: 'CREATOR' },
      });

      const accessToken = signAccessToken({ userId: user.id, role: user.role });
      const refreshToken = signRefreshToken({ userId: user.id });

      return { accessToken, refreshToken, user };
    }),

  refreshToken: publicProcedure
    .input(z.object({ refreshToken: z.string() }))
    .mutation(async ({ ctx, input }) => {
      try {
        const payload = verifyRefreshToken(input.refreshToken);
        const user = await (ctx.db as any).user.findUnique({ where: { id: payload.userId } });

        if (!user) throw new TRPCError({ code: 'UNAUTHORIZED' });

        const accessToken = signAccessToken({ userId: user.id, role: user.role });
        return { accessToken };
      } catch (err) {
        throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid refresh token' });
      }
    }),

  selectRole: protectedProcedure
    .input(z.object({ role: z.enum(['BRAND', 'CREATOR']) }))
    .mutation(async ({ ctx, input }) => {
      const user = await (ctx.db as any).user.update({
        where: { id: ctx.user.id },
        data: { role: input.role },
      });

      if (input.role === 'BRAND') {
        await (ctx.db as any).brandProfile.upsert({
          where: { userId: user.id },
          create: { userId: user.id, companyName: 'New Brand' },
          update: {},
        });
      } else {
        await (ctx.db as any).creatorProfile.upsert({
          where: { userId: user.id },
          create: { userId: user.id, displayName: 'New Creator' },
          update: {},
        });
      }

      return user;
    }),

  getSession: protectedProcedure.query(async ({ ctx }) => {
    const user = await (ctx.db as any).user.findUnique({
      where: { id: ctx.user.id },
      include: {
        creatorProfile: true,
        brandProfile: true,
      },
    });
    return user;
  }),
});
