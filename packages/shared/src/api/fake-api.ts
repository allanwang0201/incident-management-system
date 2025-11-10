import { Location, Incident } from '../types';

const locationIds: Location[] = [
  { name: 'Airport', id: 'airport' },
  { name: 'T1', id: 'airport/t1' },
  { name: 'Taxi Zone', id: 'airport/taxi_zone' },
  { name: 'Carpark', id: 'airport/carpark' },
  { name: 'T1 Lobby', id: 'airport/t1/lobby' },
  { name: 'T2', id: 'airport/t2' },
  { name: 'T2 Lobby', id: 'airport/t2/lobby' },
];

const incidents: Incident[] = [
  {
    name: 'Liquid Spill',
    id: 1,
    priority: 3,
    datetime: '2018-01-21T22:54:12.000Z',
    locationId: 'airport/t1/lobby',
    description: 'Small water spill near gate entrance, maintenance team notified for cleanup',
  },
  {
    name: 'Lost Property',
    id: 2,
    priority: 3,
    datetime: '2018-01-23T18:25:43.511Z',
    locationId: 'airport/t1/lobby',
    description:
      'Black backpack found near seating area, handed to security office for safekeeping',
  },
  {
    name: 'Unattended Baggage',
    id: 3,
    priority: 1,
    datetime: '2018-01-22T07:13:00.000Z',
    locationId: 'airport/t1',
    description:
      'Suspicious unattended luggage reported, security team dispatched to investigate immediately',
  },
  {
    name: 'Theft',
    id: 4,
    priority: 2,
    datetime: '2018-01-22T01:04:24.000Z',
    locationId: 'airport/t2',
    description: 'Passenger reported stolen wallet from shopping area, CCTV footage being reviewed',
  },
  {
    name: 'Fire',
    id: 5,
    datetime: '2018-01-22T11:25:18.000Z',
    priority: 1,
    locationId: 'airport/t2',
    description:
      'Smoke detected in electrical room, fire alarm activated, evacuation procedures initiated',
  },
];

const incidentsLookup: Record<string, Incident[]> = {
  airport: incidents,
  'airport/t1': [incidents[0], incidents[1], incidents[2]],
  'airport/t1/lobby': [incidents[0], incidents[1]],
  'airport/t2': [incidents[3], incidents[4]],
};

const fakeResponse = <T>(fakeData: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(fakeData), 100));

export const fakeApi = {
  getLocations: (): Promise<Location[]> => fakeResponse(locationIds),
  getIncidentsByLocationId: (locationId: string): Promise<Incident[]> =>
    fakeResponse(incidentsLookup[locationId] || []),
};
