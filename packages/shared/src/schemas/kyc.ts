import { z } from 'zod';

export const submitKycSchema = z.object({
  fullName: z.string().min(2, 'Full name is required'),
  cnicNumber: z.string().regex(/^[0-9]{5}-[0-9]{7}-[0-9]$/, 'CNIC must be in format XXXXX-XXXXXXX-X'),
  cnicFrontUrl: z.string().url('Invalid CNIC front image URL'),
  cnicBackUrl: z.string().url('Invalid CNIC back image URL'),
  selfieUrl: z.string().url('Invalid selfie image URL'),
});

export type SubmitKycInput = z.infer<typeof submitKycSchema>;
