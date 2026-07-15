import { test, expect } from '@fixtures/api.fixture';
import { RemindersApi } from './Reminders_API';
import { ReminderListSchema } from './Reminders_Schema';

/**
 * Example spec. This is here to show the patterns we use: a wrapper class, a
 * custom status matcher, and schema validation. It is deliberately minimal.
 *
 * Build your own coverage out from here. Every spec file should have at least
 * one @Healthcheck test.
 */
test.describe('Reminders list @ReadOnly', () => {
  test('returns 200 and a well-formed list @Healthcheck', async ({ request }) => {
    const api = new RemindersApi(request);

    const response = await api.list({ page: 1, pageSize: 5 });
    await expect(response).toHaveApiStatus(200);

    const body = await response.json();
    // Validate the response shape, not just the status.
    ReminderListSchema.parse(body);
    expect(body.items.length).toBeGreaterThan(0);
  });
});
