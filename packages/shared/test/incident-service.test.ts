import { describe, it, expect, vi } from 'vitest';
import { incidentService } from '../src/api/incident-service';

vi.mock('../src/api/fake-api', () => {
  const all = [
    {
      id: 1,
      name: 'Fire',
      priority: 1,
      datetime: '2018-01-22T11:25:18.000Z',
      locationId: 'airport/t2',
      description: 'a',
    },
    {
      id: 2,
      name: 'Theft',
      priority: 2,
      datetime: '2018-01-22T01:04:24.000Z',
      locationId: 'airport/t2',
      description: 'b',
    },
    {
      id: 3,
      name: 'Liquid Spill',
      priority: 3,
      datetime: '2018-01-21T22:54:12.000Z',
      locationId: 'airport/t1/lobby',
      description: 'c',
    },
    // duplicate id, later should be removed
    {
      id: 3,
      name: 'Duplicate',
      priority: 3,
      datetime: '2018-01-21T20:00:00.000Z',
      locationId: 'airport/t1/lobby',
      description: 'dup',
    },
  ];
  return {
    fakeApi: {
      getLocations: vi.fn().mockResolvedValue([
        { id: 'airport/t2', name: 'T2' },
        { id: 'airport/t1/lobby', name: 'T1 Lobby' },
      ]),
      getIncidentsByLocationId: vi.fn((locationId: string) => {
        if (locationId === 'airport') {
          return Promise.resolve(all);
        }
        return Promise.resolve(all.filter((i) => i.locationId === locationId));
      }),
    },
  };
});

describe('incidentService', () => {
  it('getAllIncidents returns deduped and sorted incidents with locationName', async () => {
    const out = await incidentService.getAllIncidents();
    // dedup
    expect(out.map((i) => i.id)).toEqual([1, 2, 3]);
    // has locationName
    expect(out[0].locationName).toBe('T2');
    expect(out[2].locationName).toBe('T1 Lobby');
    // sorted by priority asc, datetime desc within same priority
    expect(out[0].priority).toBe(1);
    expect(out[1].priority).toBe(2);
    expect(out[2].priority).toBe(3);
  });

  it('getIncidentsByLocationId returns deduped and sorted results', async () => {
    const out = await incidentService.getIncidentsByLocationId('airport/t1/lobby');
    expect(out.map((i) => i.id)).toEqual([3]);
    expect(out[0].priority).toBe(3);
  });
});
