import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { FilterConfig, SortConfig, PaginationConfig } from '../types';

interface IncidentState {
  // Filter state
  filters: FilterConfig;
  setFilters: (filters: FilterConfig) => void;
  resetFilters: () => void;

  // Sort state
  sortConfig: SortConfig;
  setSortConfig: (config: SortConfig) => void;

  // Pagination state
  pagination: PaginationConfig;
  setPagination: (pagination: Partial<PaginationConfig>) => void;

  // View state
  viewMode: 'table' | 'list';
  setViewMode: (mode: 'table' | 'list') => void;

  // Selection state
  selectedIncidentIds: number[];
  toggleIncidentSelection: (id: number) => void;
  selectAllIncidents: (ids: number[]) => void;
  clearSelection: () => void;

  // UI state
  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  // Theme
  themeMode: 'light' | 'dark';
  toggleTheme: () => void;
}

const initialFilters: FilterConfig = {
  priority: [],
  location: [],
  dateFrom: undefined,
  dateTo: undefined,
  searchTerm: '',
};

const initialSort: SortConfig = {
  field: 'priority',
  direction: 'asc',
};

const initialPagination: PaginationConfig = {
  page: 0,
  pageSize: 10,
  total: 0,
};

export const useIncidentStore = create<IncidentState>()(
  devtools(
    persist(
      (set) => ({
        // Filter state
        filters: initialFilters,
        setFilters: (filters) => set({ filters }),
        resetFilters: () => set({ filters: initialFilters }),

        // Sort state
        sortConfig: initialSort,
        setSortConfig: (sortConfig) => set({ sortConfig }),

        // Pagination state
        pagination: initialPagination,
        setPagination: (pagination) =>
          set((state) => ({
            pagination: { ...state.pagination, ...pagination },
          })),

        // View state
        viewMode: 'table',
        setViewMode: (viewMode) => set({ viewMode }),

        // Selection state
        selectedIncidentIds: [],
        toggleIncidentSelection: (id) =>
          set((state) => ({
            selectedIncidentIds: state.selectedIncidentIds.includes(id)
              ? state.selectedIncidentIds.filter((i) => i !== id)
              : [...state.selectedIncidentIds, id],
          })),
        selectAllIncidents: (ids) => set({ selectedIncidentIds: ids }),
        clearSelection: () => set({ selectedIncidentIds: [] }),

        // UI state
        isSidebarOpen: true,
        toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),

        // Theme
        themeMode: 'dark',
        toggleTheme: () =>
          set((state) => ({
            themeMode: state.themeMode === 'dark' ? 'light' : 'dark',
          })),
      }),
      {
        name: 'incident-storage',
        partialize: (state) => ({
          themeMode: state.themeMode,
          viewMode: state.viewMode,
          pagination: { ...state.pagination, page: 0 }, // Reset page on reload
        }),
      }
    )
  )
);
