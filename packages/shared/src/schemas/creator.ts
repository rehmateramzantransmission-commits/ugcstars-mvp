import { z } from 'zod';

export const submitSocialAccountsSchema = z.object({
  accounts: z.array(
    z.object({
      platform: z.string(),
      handle: z.string().min(1, 'Handle is required'),
      profileUrl: z.string().url('Invalid profile URL'),
    })
  ).min(1, 'At least one social account is required'),
});

export const uploadVerificationScreenshotSchema = z.object({
  screenshotUrl: z.string().url('Invalid screenshot URL'),
});

export type SubmitSocialAccountsInput = z.infer<typeof submitSocialAccountsSchema>;
export type UploadVerificationScreenshotInput = z.infer<typeof uploadVerificationScreenshotSchema>;
