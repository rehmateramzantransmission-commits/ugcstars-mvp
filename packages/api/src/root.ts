import { router } from './trpc';
import { authRouter } from './routers/auth';
import { userRouter } from './routers/user';
import { creatorRouter } from './routers/creator';
import { brandRouter } from './routers/brand';
import { campaignRouter } from './routers/campaign';
import { marketplaceRouter } from './routers/marketplace';
import { contentPlanRouter } from './routers/contentPlan';
import { draftRouter } from './routers/draft';
import { submissionRouter } from './routers/submission';
import { escrowRouter } from './routers/escrow';
import { walletRouter } from './routers/wallet';
import { kycRouter } from './routers/kyc';
import { notificationRouter } from './routers/notification';
import { adminRouter } from './routers/admin';

export const appRouter = router({
  auth: authRouter,
  user: userRouter,
  creator: creatorRouter,
  brand: brandRouter,
  campaign: campaignRouter,
  marketplace: marketplaceRouter,
  contentPlan: contentPlanRouter,
  draft: draftRouter,
  submission: submissionRouter,
  escrow: escrowRouter,
  wallet: walletRouter,
  kyc: kycRouter,
  notification: notificationRouter,
  admin: adminRouter,
});

export type AppRouter = typeof appRouter;
