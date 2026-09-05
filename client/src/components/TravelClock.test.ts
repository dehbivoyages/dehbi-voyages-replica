import { describe, expect, it } from 'vitest';
import { sceneForTangierHour } from './Hero';
import { formatClock, formatDate, formatHijriDate, getDisplayInstant } from './TravelClock';

describe('TravelClock', () => {
  const instant = new Date('2026-09-01T09:23:25.000Z');

  it('displays one hour less while keeping Gregorian and Hijri dates on the same display instant', () => {
    const displayInstant = getDisplayInstant(instant);

    expect(displayInstant.getTime()).toBe(instant.getTime() - 60 * 60 * 1000);
    expect(formatClock(displayInstant)).toMatch(/09:23:25/);
    expect(formatDate(displayInstant)).toMatch(/2026/);
    expect(formatDate(displayInstant).toLowerCase()).toMatch(/sept/);
    expect(formatHijriDate(displayInstant)).toMatch(/1448/);
    expect(formatClock(displayInstant)).not.toContain('−1 h');
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
    [12, 'mohammedV'],
    [23, 'saoudienne'],
  ] as const)('selects %s for Tangier hour %s', (hour, expectedScene) => {
    expect(sceneForTangierHour(hour)).toBe(expectedScene);
  });
});
