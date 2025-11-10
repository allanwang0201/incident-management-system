import { describe, it, expect, vi } from 'vitest';
import { formatDate, formatRelativeTime } from '../src/utils/date';

describe('date utils', () => {
  it('formats date as MMM d, yyyy', () => {
    const out = formatDate('2018-01-22T11:25:18.000Z');
    expect(out).toMatch(/Jan\s22,\s2018/);
  });

  it('formats relative time', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2020-01-02T00:00:00.000Z'));
    const out = formatRelativeTime('2020-01-01T00:00:00.000Z');
    expect(out).toMatch(/(?:about\s)?1\sday\sago/);
    vi.useRealTimers();
  });
});
