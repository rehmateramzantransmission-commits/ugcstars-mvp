import { z } from 'zod';
import { router, protectedProcedure } from '../trpc';
import { type PrismaClient } from '@repo/db';

type NotificationType = 'INFO' | 'ACTION' | 'ALERT';

export async function createNotification(db: PrismaClient, params: {
  userId: string;
  type: NotificationType;
  title: string;
  body: string;
  data?: any;
}) {
  return await (db as any).notification.create({
    data: {
      userId: params.userId,
      type: params.type,
      title: params.title,
      body: params.body,
      data: params.data,
      isRead: false,
    },
  });
}

export const notificationRouter = router({
  list: protectedProcedure
    .input(z.object({
      cursor: z.string().nullish(),
      limit: z.number().min(1).max(100).default(50),
    }))
    .query(async ({ ctx, input }) => {
      const items = await (ctx.db as any).notification.findMany({
        where: { userId: ctx.user.id },
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

  markRead: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await (ctx.db as any).notification.update({
        where: { id: input.id },
        data: { isRead: true },
      });
    }),

  markAllRead: protectedProcedure.mutation(async ({ ctx }) => {
    return await (ctx.db as any).notification.updateMany({
      where: { userId: ctx.user.id, isRead: false },
      data: { isRead: true },
    });
  }),

  getUnreadCount: protectedProcedure.query(async ({ ctx }) => {
    return await (ctx.db as any).notification.count({
      where: { userId: ctx.user.id, isRead: false },
    });
  }),
});
