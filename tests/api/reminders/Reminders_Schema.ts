import { z } from 'zod';

/**
 * Example schema for a single reminder.
 *
 * We validate the *shape and types* of responses, not just the status code.
 * This is a starting point. Tighten it, or add schemas for the list response
 * and error responses, as you build out coverage.
 */
export const ReminderSchema = z.object({
  id: z.string(),
  patientName: z.string(),
  title: z.string(),
  notes: z.string(),
  dueDate: z.string(),
  status: z.enum(['Open', 'Done']),
  createdAt: z.string(),
});

export type Reminder = z.infer<typeof ReminderSchema>;

export const ReminderListSchema = z.object({
  items: z.array(ReminderSchema),
  page: z.number(),
  pageSize: z.number(),
  total: z.number(),
});
