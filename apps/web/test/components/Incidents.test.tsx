import React from 'react';
import '@testing-library/jest-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@incident-system/design-system';
import { createAppTheme } from '@incident-system/design-system';
import { Incidents } from '@/components/Incidents/Incidents';
import * as incidentHooks from '@incident-system/shared';

// Mock the hooks
vi.mock('@incident-system/shared', async () => {
  const actual = await vi.importActual('@incident-system/shared');
  return {
    ...actual,
    useIncidents: vi.fn(),
    useIncidentStore: vi.fn(),
  };
});

const mockIncidents = [
  {
    id: 1,
    name: 'Fire',
    priority: 1 as const,
    datetime: '2018-01-22T11:25:18.000Z',
    locationId: 'airport/t2',
    locationName: 'T2',
    description: 'Fire in terminal 2',
  },
  {
    id: 2,
    name: 'Theft',
    priority: 2 as const,
    datetime: '2018-01-22T01:04:24.000Z',
    locationId: 'airport/t2',
    locationName: 'T2',
    description: 'Reported theft incident',
  },
  {
    id: 3,
    name: 'Liquid Spill',
    priority: 3 as const,
    datetime: '2018-01-21T22:54:12.000Z',
    locationId: 'airport/t1/lobby',
    locationName: 'T1 Lobby',
    description: 'Liquid spill in lobby area',
  },
];

// Helper to coerce mocked TanStack Query results in tests
const mockUseIncidents = (result: any) =>
  vi.mocked(incidentHooks.useIncidents).mockReturnValue(result as any);

describe('Incidents Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: { retry: false },
      },
    });

    // Default mock implementation
    vi.mocked(incidentHooks.useIncidentStore).mockReturnValue({
      viewMode: 'table',
      setViewMode: vi.fn(),
      filters: {},
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      sortConfig: { field: 'priority', direction: 'asc' },
      setSortConfig: vi.fn(),
      pagination: { page: 0, pageSize: 10, total: 0 },
      setPagination: vi.fn(),
      selectedIncidentIds: [],
      toggleIncidentSelection: vi.fn(),
      selectAllIncidents: vi.fn(),
      clearSelection: vi.fn(),
      isSidebarOpen: true,
      toggleSidebar: vi.fn(),
      themeMode: 'dark',
      toggleTheme: vi.fn(),
    });
  });

  const renderWithProviders = (component: React.ReactElement) => {
    const theme = createAppTheme('dark');
    return render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{component}</ThemeProvider>
      </QueryClientProvider>
    );
  };

  it('should render loading state', () => {
    mockUseIncidents({
      data: undefined,
      isLoading: true,
      error: null,
      isError: false,
      isSuccess: false,
      status: 'pending',
      fetchStatus: 'fetching',
      isPending: true,
      isLoadingError: false,
      isFetchedAfterMount: false,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: false,
      isFetching: true,
      isPaused: false,
      isPlaceholderData: false,
      isInitialLoading: true,
      refetch: vi.fn(),
    });

    renderWithProviders(<Incidents />);
    expect(screen.getByText('Loading incidents...')).toBeInTheDocument();
  });

  it('should render error state', () => {
    const error = new Error('Failed to fetch incidents');
    mockUseIncidents({
      data: undefined,
      isLoading: false,
      error,
      isError: true,
      isSuccess: false,
      status: 'error',
      fetchStatus: 'idle',
      isPending: false,
      isLoadingError: true,
      isFetchedAfterMount: true,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      dataUpdatedAt: 0,
      errorUpdatedAt: Date.now(),
      failureCount: 1,
      failureReason: error,
      errorUpdateCount: 1,
      isFetched: true,
      isFetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isInitialLoading: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<Incidents />);
    expect(screen.getByText(/Error loading incidents/i)).toBeInTheDocument();
  });

  it('should render empty state when no incidents', () => {
    mockUseIncidents({
      data: [],
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
      isPending: false,
      isLoadingError: false,
      isFetchedAfterMount: true,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isInitialLoading: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<Incidents />);
    expect(screen.getByText('No incidents found')).toBeInTheDocument();
  });

  it('should render incidents table when viewMode is table', async () => {
    mockUseIncidents({
      data: mockIncidents,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
      isPending: false,
      isLoadingError: false,
      isFetchedAfterMount: true,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isInitialLoading: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<Incidents />);

    // Use async findBy* to avoid sync query throwing before render settles
    expect(await screen.findByText('Fire')).toBeInTheDocument();
    expect(await screen.findByText('Theft')).toBeInTheDocument();
    expect(await screen.findByText('Liquid Spill')).toBeInTheDocument();
    const t2s = await screen.findAllByText('T2');
    expect(t2s.length).toBeGreaterThan(0);
    expect(await screen.findByText('T1 Lobby')).toBeInTheDocument();
  });

  it('should render incidents list when viewMode is list', async () => {
    vi.mocked(incidentHooks.useIncidentStore).mockReturnValue({
      viewMode: 'list',
      setViewMode: vi.fn(),
      filters: {},
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      sortConfig: { field: 'priority', direction: 'asc' },
      setSortConfig: vi.fn(),
      pagination: { page: 0, pageSize: 10, total: 0 },
      setPagination: vi.fn(),
      selectedIncidentIds: [],
      toggleIncidentSelection: vi.fn(),
      selectAllIncidents: vi.fn(),
      clearSelection: vi.fn(),
      isSidebarOpen: true,
      toggleSidebar: vi.fn(),
      themeMode: 'dark',
      toggleTheme: vi.fn(),
    });

    mockUseIncidents({
      data: mockIncidents,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
      isPending: false,
      isLoadingError: false,
      isFetchedAfterMount: true,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isInitialLoading: false,
      refetch: vi.fn(),
    });

    renderWithProviders(<Incidents />);

    expect(await screen.findByText('Fire')).toBeInTheDocument();
    expect(await screen.findByText('Theft')).toBeInTheDocument();
    expect(await screen.findByText('Liquid Spill')).toBeInTheDocument();
    // Current UI shows locationName without "Location:" prefix
    const t2sList = await screen.findAllByText('T2');
    expect(t2sList.length).toBeGreaterThan(0);
    expect(await screen.findByText('T1 Lobby')).toBeInTheDocument();
  });

  it('should switch to list view on mobile screens', () => {
    const setViewMode = vi.fn();

    vi.mocked(incidentHooks.useIncidentStore).mockReturnValue({
      viewMode: 'table',
      setViewMode,
      filters: {},
      setFilters: vi.fn(),
      resetFilters: vi.fn(),
      sortConfig: { field: 'priority', direction: 'asc' },
      setSortConfig: vi.fn(),
      pagination: { page: 0, pageSize: 10, total: 0 },
      setPagination: vi.fn(),
      selectedIncidentIds: [],
      toggleIncidentSelection: vi.fn(),
      selectAllIncidents: vi.fn(),
      clearSelection: vi.fn(),
      isSidebarOpen: true,
      toggleSidebar: vi.fn(),
      themeMode: 'dark',
      toggleTheme: vi.fn(),
    });

    mockUseIncidents({
      data: mockIncidents,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
      isPending: false,
      isLoadingError: false,
      isFetchedAfterMount: true,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isInitialLoading: false,
      refetch: vi.fn(),
    });

    // Mock mobile screen size
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: query === '(max-width:600px)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    renderWithProviders(<Incidents />);

    expect(setViewMode).toHaveBeenCalledWith('list');
  });

  it('should display incidents sorted by priority and datetime', async () => {
    // Ensure non-mobile viewport for table rendering
    window.matchMedia = vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    mockUseIncidents({
      data: mockIncidents,
      isLoading: false,
      error: null,
      isError: false,
      isSuccess: true,
      status: 'success',
      fetchStatus: 'idle',
      isPending: false,
      isLoadingError: false,
      isFetchedAfterMount: true,
      isRefetching: false,
      isRefetchError: false,
      isStale: false,
      dataUpdatedAt: Date.now(),
      errorUpdatedAt: 0,
      failureCount: 0,
      failureReason: null,
      errorUpdateCount: 0,
      isFetched: true,
      isFetching: false,
      isPaused: false,
      isPlaceholderData: false,
      isInitialLoading: false,
      refetch: vi.fn(),
    } as any);

    renderWithProviders(<Incidents />);

    await waitFor(() => {
      const cells = screen.getAllByRole('cell');
      const incidentNames = cells
        .map((cell) => cell.textContent || '')
        .filter((text) => ['Fire', 'Theft', 'Liquid Spill'].includes(text));

      // Should be sorted by priority (High=1, Medium=2, Low=3)
      expect(incidentNames[0]).toBe('Fire'); // Priority 1
      expect(incidentNames[1]).toBe('Theft'); // Priority 2
      expect(incidentNames[2]).toBe('Liquid Spill'); // Priority 3
    });
  });
});
