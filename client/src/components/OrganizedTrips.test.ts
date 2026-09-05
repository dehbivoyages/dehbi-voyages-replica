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


describe('PRODV26-2 programme selection', () => {
  it('contains only the nine archive programmes with usable images', async () => {
    const { trips } = await import('./OrganizedTrips');
    expect(trips).toHaveLength(9);
    expect(trips.map((trip) => trip.id)).toEqual([
      'istanbul-septembre-2026-prodv26',
      'istanbul-octobre-2026-prodv26',
      'omra-hajj-sur-mesure-prodv26',
      'omra-kuala-lumpur-septembre-2026-prodv26',
      'deux-omra-etihad-2026-prodv26',
      'omra-deux-departs-septembre-2026-prodv26',
      'punta-cana-ete-2026-prodv26',
      'ouzbekistan-istanbul-mai-2027-prodv26',
      'dakhla-lagon-dunes-prodv26',
    ]);
    expect(trips.every((trip) => trip.image.startsWith('/manus-storage/'))).toBe(true);
  });

  it('keeps the on-demand spiritual and Dakhla programmes non-expiring', async () => {
    const { trips } = await import('./OrganizedTrips');
    expect(trips.find((trip) => trip.id === 'omra-hajj-sur-mesure-prodv26')?.endDate).toBeUndefined();
    expect(trips.find((trip) => trip.id === 'dakhla-lagon-dunes-prodv26')?.endDate).toBeUndefined();
  });
});
