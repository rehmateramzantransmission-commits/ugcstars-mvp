import { z } from 'zod';

export const withdrawalRequestSchema = z.object({
  amount: z.coerce.number().positive('Amount must be positive'),
  method: z.enum(['JAZZCASH', 'EASYPAISA', 'BANK_IBFT', 'RAAST']),
  accountDetails: z.string().min(5, 'Account details are required'),
});

export type WithdrawalRequestInput = z.infer<typeof withdrawalRequestSchema>;
