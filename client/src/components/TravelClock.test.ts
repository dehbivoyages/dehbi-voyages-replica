import { describe, expect, it } from 'vitest';
import { sceneForTangierHour } from './Hero';
import { formatClock, formatDate, formatHijriDate } from './TravelClock';

describe('TravelClock', () => {
  const instant = new Date('2026-09-01T09:23:25.000Z');

  it('formats the same instant in Tangier time without a manual offset', () => {
    expect(formatClock(instant)).toMatch(/10:23:25/);
    expect(formatDate(instant)).toMatch(/2026/);
    expect(formatDate(instant).toLowerCase()).toMatch(/sept/);
    expect(formatHijriDate(instant)).toMatch(/1448/);
    expect(formatClock(instant)).not.toContain('−1 h');
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
