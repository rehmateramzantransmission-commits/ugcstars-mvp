import { z } from 'zod';

export const verificationActionSchema = z.object({
  creatorProfileId: z.string().uuid('Invalid Creator Profile ID'),
  action: z.enum(['APPROVE', 'REJECT']),
  slabOverride: z.string().optional(),
});

export const kycActionSchema = z.object({
  kycRecordId: z.string().uuid('Invalid KYC Record ID'),
  action: z.enum(['APPROVE', 'REJECT']),
  rejectionReason: z.string().optional(),
});

export const withdrawalActionSchema = z.object({
  withdrawalId: z.string().uuid('Invalid Withdrawal ID'),
  action: z.enum(['APPROVE', 'REJECT']),
});

export const settingsUpdateSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  value: z.string().min(1, 'Value is required'),
});

export const slabConfigUpdateSchema = z.object({
  slab: z.string().min(1, 'Slab is required'),
  minFollowers: z.number().int().nonnegative(),
  maxFollowers: z.number().int().positive(),
});

export type VerificationActionInput = z.infer<typeof verificationActionSchema>;
export type KycActionInput = z.infer<typeof kycActionSchema>;
export type WithdrawalActionInput = z.infer<typeof withdrawalActionSchema>;
export type SettingsUpdateInput = z.infer<typeof settingsUpdateSchema>;
export type SlabConfigUpdateInput = z.infer<typeof slabConfigUpdateSchema>;
