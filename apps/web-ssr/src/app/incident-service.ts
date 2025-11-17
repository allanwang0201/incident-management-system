import { IncidentWithLocation } from './types';
// Next.js key: service layer runs on the server; data is processed during SSR (dedupe, sort, mapping)

const locationIds = [
  { name: 'Airport', id: 'airport' },
  { name: 'T1', id: 'airport/t1' },
  { name: 'Taxi Zone', id: 'airport/taxi_zone' },
  { name: 'Carpark', id: 'airport/carpark' },
  { name: 'T1 Lobby', id: 'airport/t1/lobby' },
  { name: 'T2', id: 'airport/t2' },
  { name: 'T2 Lobby', id: 'airport/t2/lobby' },
];

const incidents = [
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
    priority: 1,
    datetime: '2018-01-22T11:25:18.000Z',
    locationId: 'airport/t2',
    description:
      'Smoke detected in electrical room, fire alarm activated, evacuation procedures initiated',
  },
];

const incidentsLookup = {
  airport: incidents,
  'airport/t1': [incidents[0], incidents[1], incidents[2]],
  'airport/t1/lobby': [incidents[0], incidents[1]],
  'airport/t2': [incidents[3], incidents[4]],
};

export class IncidentService {
  async getAllIncidents(): Promise<IncidentWithLocation[]> {
    // Get all locations
    const locationMap = new Map(locationIds.map((loc) => [loc.id, loc.name]));

    // Get all incidents (using root location to get all)
    const allIncidents = incidentsLookup['airport'] || [];

    // Remove duplicates based on ID
    const uniqueIncidents = Array.from(
      new Map(allIncidents.map((incident) => [incident.id, incident])).values()
    );

    // Add location names and sort
    const incidentsWithLocation: IncidentWithLocation[] = uniqueIncidents.map((incident) => ({
      ...incident,
      locationName: locationMap.get(incident.locationId) || 'Unknown',
    }));

    // Sort by priority ascending, then datetime descending
    incidentsWithLocation.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority; // Ascending
      }
      return new Date(b.datetime).getTime() - new Date(a.datetime).getTime(); // Descending
    });

    return incidentsWithLocation;
  }

  // Next.js key: provide lookup by ID for dynamic routes used by the SSR detail page
  async getIncidentById(id: number): Promise<IncidentWithLocation | null> {
    const locationMap = new Map(locationIds.map((loc) => [loc.id, loc.name]));
    const allIncidents = incidentsLookup['airport'] || [];
    const match = allIncidents.find((incident) => incident.id === id);
    if (!match) return null;
    return {
      ...match,
      locationName: locationMap.get(match.locationId) || 'Unknown',
    } as IncidentWithLocation;
  }
}

export const incidentService = new IncidentService();
