import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@repo/api';
import { db } from '@repo/db';

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({
      db,
      user: null,
      locale: 'en' as const,
    }),
  });

export { handler as GET, handler as POST };
