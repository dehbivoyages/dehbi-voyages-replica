import { describe, expect, it } from 'vitest';
import {
  agencyNotificationContent,
  getMoroccoDayKey,
  shouldShowAgencyNotification,
} from './AgencyNotification';

describe('AgencyNotification', () => {
  it('uses Morocco calendar time for its daily display key', () => {
    expect(getMoroccoDayKey(new Date('2026-09-01T23:30:00.000Z'))).toBe('2026-09-02');
  });

  it('shows once for a new Morocco day and stays hidden after dismissal', () => {
    expect(shouldShowAgencyNotification(null, '2026-09-02')).toBe(true);
    expect(shouldShowAgencyNotification('2026-09-01', '2026-09-02')).toBe(true);
    expect(shouldShowAgencyNotification('2026-09-02', '2026-09-02')).toBe(false);
  });

  it('keeps the personalized Dehbi Voyages message and action label', () => {
    expect(agencyNotificationContent.title).toContain('Dehbi Voyages');
    expect(agencyNotificationContent.message).toContain('Tanger');
    expect(agencyNotificationContent.actionLabel).toBe('Préparer mon départ');
  });
});
