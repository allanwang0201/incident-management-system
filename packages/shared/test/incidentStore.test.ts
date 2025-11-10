import { describe, it, expect } from 'vitest';
import { useIncidentStore } from '../src/store/incidentStore';

describe('useIncidentStore', () => {
  it('toggles theme between dark and light', () => {
    const initial = useIncidentStore.getState().themeMode;
    expect(initial).toBe('dark');
    useIncidentStore.getState().toggleTheme();
    expect(useIncidentStore.getState().themeMode).toBe('light');
    useIncidentStore.getState().toggleTheme();
    expect(useIncidentStore.getState().themeMode).toBe('dark');
  });

  it('updates viewMode', () => {
    expect(useIncidentStore.getState().viewMode).toBe('table');
    useIncidentStore.getState().setViewMode('list');
    expect(useIncidentStore.getState().viewMode).toBe('list');
  });

  it('selects and toggles incident ids', () => {
    expect(useIncidentStore.getState().selectedIncidentIds).toEqual([]);
    useIncidentStore.getState().toggleIncidentSelection(1);
    expect(useIncidentStore.getState().selectedIncidentIds).toEqual([1]);
    useIncidentStore.getState().toggleIncidentSelection(1);
    expect(useIncidentStore.getState().selectedIncidentIds).toEqual([]);
    useIncidentStore.getState().selectAllIncidents([1, 2, 3]);
    expect(useIncidentStore.getState().selectedIncidentIds).toEqual([1, 2, 3]);
    useIncidentStore.getState().clearSelection();
    expect(useIncidentStore.getState().selectedIncidentIds).toEqual([]);
  });
});
