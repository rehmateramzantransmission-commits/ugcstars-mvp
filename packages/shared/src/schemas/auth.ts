import { z } from 'zod';

export const sendOtpSchema = z.object({
  phone: z.string().regex(/^\+92[0-9]{10}$/, 'Invalid Pakistani phone number (e.g., +923001234567)'),
});

export const verifyOtpSchema = z.object({
  phone: z.string().regex(/^\+92[0-9]{10}$/),
  code: z.string().length(6, 'OTP must be 6 digits'),
});

export const selectRoleSchema = z.object({
  role: z.enum(['BRAND', 'CREATOR']),
});

export const googleAuthSchema = z.object({
  idToken: z.string().min(1),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1),
});

export type SendOtpInput = z.infer<typeof sendOtpSchema>;
export type VerifyOtpInput = z.infer<typeof verifyOtpSchema>;
export type SelectRoleInput = z.infer<typeof selectRoleSchema>;
export type GoogleAuthInput = z.infer<typeof googleAuthSchema>;
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;
