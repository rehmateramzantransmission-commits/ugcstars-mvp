import { initTRPC, TRPCError } from '@trpc/server';
import superjson from 'superjson';
import { type PrismaClient } from '@repo/db';
import { ZodError } from 'zod';

// Context type
export type Context = {
  db: PrismaClient;
  user: { id: string; role: 'BRAND' | 'CREATOR' | 'ADMIN' } | null;
  locale: 'en' | 'ur';
};

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createCallerFactory = t.createCallerFactory;
export const router = t.router;
export const publicProcedure = t.procedure;

// Auth middleware
const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const protectedProcedure = t.procedure.use(isAuthed);

// Role-based middleware
const isBrand = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== 'BRAND') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Brand access required' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

const isCreator = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== 'CREATOR') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Creator access required' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

const isAdmin = t.middleware(({ ctx, next }) => {
  if (!ctx.user || ctx.user.role !== 'ADMIN') {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Admin access required' });
  }
  return next({ ctx: { ...ctx, user: ctx.user } });
});

export const brandProcedure = t.procedure.use(isAuthed).use(isBrand);
export const creatorProcedure = t.procedure.use(isAuthed).use(isCreator);
export const adminProcedure = t.procedure.use(isAuthed).use(isAdmin);
