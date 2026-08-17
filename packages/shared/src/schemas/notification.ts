import { z } from 'zod';

export const updateNotificationPreferencesSchema = z.object({
  type: z.string().min(1, 'Notification type is required'),
  enabled: z.boolean(),
});

export type UpdateNotificationPreferencesInput = z.infer<typeof updateNotificationPreferencesSchema>;
