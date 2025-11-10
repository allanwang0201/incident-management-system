import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incidentService } from '../api/incident-service';

export const INCIDENTS_QUERY_KEY = ['incidents'];
export const LOCATIONS_QUERY_KEY = ['locations'];

export function useIncidents() {
  return useQuery({
    queryKey: INCIDENTS_QUERY_KEY,
    queryFn: () => incidentService.getAllIncidents(),
    staleTime: 30000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes (was cacheTime in v4)
  });
}

export function useLocations() {
  return useQuery({
    queryKey: LOCATIONS_QUERY_KEY,
    queryFn: () => incidentService.getLocations(),
    staleTime: 60000, // 1 minute
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function useIncidentsByLocation(locationId: string | null) {
  return useQuery({
    queryKey: ['incidents', 'location', locationId],
    queryFn: () =>
      locationId ? incidentService.getIncidentsByLocationId(locationId) : Promise.resolve([]),
    enabled: !!locationId,
    staleTime: 30000,
    gcTime: 5 * 60 * 1000,
  });
}

export function useRefreshIncidents() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const data = await incidentService.getAllIncidents();
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(INCIDENTS_QUERY_KEY, data);
    },
  });
}
