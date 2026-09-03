import { describe, expect, it } from 'vitest';
import { getMoroccoDateKey, isTripExpired } from './OrganizedTrips';

describe('OrganizedTrips expiration filtering', () => {
  it('formats the same calendar date in the Morocco timezone', () => {
    const instant = new Date('2026-09-01T23:30:00.000Z');
    expect(getMoroccoDateKey(instant)).toBe('2026-09-02');
  });

  it('does not expire an offer on its final valid day', () => {
    expect(isTripExpired({ endDate: '2026-09-04' }, new Date('2026-09-04T12:00:00.000Z'))).toBe(false);
  });

  it('expires an offer after its final valid day', () => {
    expect(isTripExpired({ endDate: '2026-09-04' }, new Date('2026-09-05T00:00:00.000Z'))).toBe(true);
  });

  it('keeps offers without a fixed end date available', () => {
    expect(isTripExpired({}, new Date('2030-01-01T00:00:00.000Z'))).toBe(false);
  });
});
