import http from 'k6/http';
import { check, sleep } from 'k6';
import { smoke } from '../profiles/smoke';
import { url } from '../shared/http';

/**
 * Example k6 scenario against the Reminders API.
 *
 * This is a minimal starting point: it lists reminders and checks the status.
 * For Part C, build this into a realistic journey (for example: search, page
 * through results, then fetch a detail), add a custom metric, and set a couple
 * of thresholds (for example a p95 response-time budget and an error ceiling).
 *
 * Run:
 *   npm run api        # in one terminal
 *   npm run k6:build   # bundle scenarios to load/dist/
 *   npm run k6:smoke   # runs load/dist/reminders-smoke.js
 */
export const options = {
  vus: smoke.vus,
  duration: smoke.duration,
  // TODO(candidate): add thresholds, e.g.
  // thresholds: { http_req_duration: ['p(95)<500'], http_req_failed: ['rate<0.01'] },
};

export default function () {
  const res = http.get(url('/reminders?page=1&pageSize=10'));

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
