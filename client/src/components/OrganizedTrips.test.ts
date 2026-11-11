import { describe, expect, it } from 'vitest';
import { getMoroccoDateKey, getTripShareUrl, isTripExpired, matchesTripSearch, trips } from './OrganizedTrips';

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


describe('Programme selection', () => {
  it('contains the five newly supplied programmes before the legacy catalogue', async () => {
    const { trips } = await import('./OrganizedTrips');
    expect(trips).toHaveLength(19);
    expect(trips.map((trip) => trip.id)).toEqual([
      'omra-ramadan-direct-fevrier-2027',
      'omra-chaabane-ramadan-direct-fevrier-2027',
      'omra-ramadan-50-jours-2027',
      'vietnam-merveilles-decembre-2026',
      'istanbul-novembre-decembre-2026',
      'omra-ramadan-fevrier-2027',
      'omra-chaabane-ramadan-fevrier-2027',
      'istanbul-septembre-2026-prodv26',
      'istanbul-octobre-2026-prodv26',
      'omra-istanbul-decembre-2026-mns',
      'omra-rajab-decembre-2026-mns',
      'omra-hajj-sur-mesure-prodv26',
      'omra-kuala-lumpur-septembre-2026-prodv26',
      'deux-omra-etihad-2026-prodv26',
      'omra-direct-tanger-novembre-2026',
      'cairo-omra-octobre-2026',
      'punta-cana-ete-2026-prodv26',
      'ouzbekistan-istanbul-mai-2027-prodv26',
      'dakhla-lagon-dunes-prodv26',
    ]);
    expect(trips.every((trip) => trip.image.startsWith('/manus-storage/'))).toBe(true);
    expect(trips.every((trip) => trip.image.toLowerCase().endsWith('.jpg'))).toBe(true);
    expect(trips.filter((trip) => trip.featured).map((trip) => trip.id)).toEqual([
      'omra-ramadan-direct-fevrier-2027',
      'omra-chaabane-ramadan-direct-fevrier-2027',
      'omra-ramadan-50-jours-2027',
      'vietnam-merveilles-decembre-2026',
      'istanbul-novembre-decembre-2026',
    ]);
    expect(trips.filter((trip) => trip.featured).every((trip) => trip.pdfUrl?.endsWith('.pdf'))).toBe(true);
    expect(trips.some((trip) => trip.id === 'omra-ramadan-1448-economique' || trip.id === 'omra-ramadan-1448-premium')).toBe(false);
  });

  it('keeps the on-demand spiritual and Dakhla programmes non-expiring', async () => {
    const { trips } = await import('./OrganizedTrips');
    expect(trips.find((trip) => trip.id === 'omra-hajj-sur-mesure-prodv26')?.endDate).toBeUndefined();
    expect(trips.find((trip) => trip.id === 'dakhla-lagon-dunes-prodv26')?.endDate).toBeUndefined();
  });

  it('keeps legacy offers archived but available through the expired filter', async () => {
    const { trips } = await import('./OrganizedTrips');
    expect(trips.find((trip) => trip.id === 'omra-ramadan-fevrier-2027')?.endDate).toBe('2026-11-09');
    expect(trips.find((trip) => trip.id === 'istanbul-novembre-decembre-2026')?.endDate).toBe('2027-01-01');
    expect(isTripExpired(trips.find((trip) => trip.id === 'omra-ramadan-fevrier-2027')!, new Date('2026-11-10T12:00:00.000Z'))).toBe(true);
    expect(isTripExpired(trips.find((trip) => trip.id === 'vietnam-merveilles-decembre-2026')!, new Date('2026-11-10T12:00:00.000Z'))).toBe(false);
  });
});


describe('OrganizedTrips search and sharing', () => {
  it('finds offers by destination, title, dates or highlights', () => {
    const istanbul = trips.find((trip) => trip.id === 'istanbul-septembre-2026-prodv26')!;
    expect(matchesTripSearch(istanbul, 'istanbul')).toBe(true);
    expect(matchesTripSearch(istanbul, 'Royal Air Maroc')).toBe(true);
    expect(matchesTripSearch(istanbul, 'Dakhla')).toBe(false);
    expect(matchesTripSearch(istanbul, '  ')).toBe(true);
  });

  it('creates a stable share URL containing the selected offer', () => {
    const url = getTripShareUrl('istanbul-septembre-2026-prodv26');
    expect(url).toContain('voyage=istanbul-septembre-2026-prodv26');
    expect(url).toContain('#organized-trips');
  });
});
