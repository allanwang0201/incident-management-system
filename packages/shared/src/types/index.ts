export interface Location {
  id: string;
  name: string;
}

export interface Incident {
  id: number;
  name: string;
  priority: 1 | 2 | 3;
  datetime: string;
  locationId: string;
  locationName?: string;
  description?: string;
}

export interface IncidentWithLocation extends Incident {
  locationName: string;
}

export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
  field: keyof Incident;
  direction: SortDirection;
}

export interface FilterConfig {
  priority?: number[];
  location?: string[];
  dateFrom?: Date;
  dateTo?: Date;
  searchTerm?: string;
}

export interface PaginationConfig {
  page: number;
  pageSize: number;
  total: number;
}
