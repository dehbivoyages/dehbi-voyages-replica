import { describe, expect, it } from 'vitest';
import { sceneForTangierHour } from './Hero';
import { formatClock, formatDate, formatHijriDate, formatWorldClock, getDisplayInstant } from './TravelClock';

describe('TravelClock', () => {
  const instant = new Date('2026-09-01T09:23:25.000Z');

  it('displays the real Morocco time without an artificial offset', () => {
    const displayInstant = getDisplayInstant(instant);

    expect(displayInstant.getTime()).toBe(instant.getTime());
    expect(formatClock(displayInstant)).toMatch(/10:23:25/);
    expect(formatDate(displayInstant)).toMatch(/^01-09-2026$/);
    expect(formatHijriDate(displayInstant)).toMatch(/^19-03-1448$/);
    expect(formatClock(displayInstant)).not.toContain('−1 h');
  });

  it('formats the world clocks with a 24-hour display', () => {
    expect(formatWorldClock(instant, 'Europe/Paris')).toMatch(/^11:23:25$/);
    expect(formatWorldClock(instant, 'America/New_York')).toMatch(/^05:23:25$/);
  });
});

describe('Tangier hero rotation', () => {
  it.each([
    [0, 'mohammedV'],
    [2, 'mohammedV'],
    [3, 'port'],
    [5, 'port'],
    [6, 'rmilat'],
    [8, 'rmilat'],
    [9, 'saoudienne'],
    [11, 'saoudienne'],
    [12, 'tangierMohammedV'],
    [23, 'rmilat'],
  ] as const)('selects %s for Tangier hour %s', (hour, expectedScene) => {
    expect(sceneForTangierHour(hour)).toBe(expectedScene);
  });
});
