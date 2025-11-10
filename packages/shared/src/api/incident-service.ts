import { fakeApi } from './fake-api';
import { Location, Incident, IncidentWithLocation } from '../types';

export class IncidentService {
  async getAllIncidents(): Promise<IncidentWithLocation[]> {
    // Get all locations
    const locations = await fakeApi.getLocations();
    const locationMap = new Map(locations.map((loc) => [loc.id, loc.name]));

    // Get all incidents (using root location to get all)
    const allIncidents = await fakeApi.getIncidentsByLocationId('airport');

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

  async getLocations(): Promise<Location[]> {
    return fakeApi.getLocations();
  }

  async getIncidentsByLocationId(locationId: string): Promise<Incident[]> {
    const incidents = await fakeApi.getIncidentsByLocationId(locationId);

    // Remove duplicates
    const uniqueIncidents = Array.from(
      new Map(incidents.map((incident) => [incident.id, incident])).values()
    );

    // Sort by priority ascending, then datetime descending
    uniqueIncidents.sort((a, b) => {
      if (a.priority !== b.priority) {
        return a.priority - b.priority;
      }
      return new Date(b.datetime).getTime() - new Date(a.datetime).getTime();
    });

    return uniqueIncidents;
  }
}

export const incidentService = new IncidentService();
