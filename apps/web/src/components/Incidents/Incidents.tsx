import React, { useEffect } from 'react';
import { Box, Typography, useMediaQuery } from '@incident-system/design-system';
import { useIncidents, useIncidentStore } from '@incident-system/shared';
import { IncidentsTable } from './IncidentsTable';
import { IncidentsList } from './IncidentsList';

export interface IncidentsProps {
  className?: string;
}

/**
 * Reusable Incidents component that displays incidents in table or list format
 * based on screen size. This component is designed to be imported and used
 * in different applications (web, mobile, desktop).
 */
export const Incidents: React.FC<IncidentsProps> = ({ className }) => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { viewMode, setViewMode } = useIncidentStore();
  const { data: incidents = [], isLoading, error } = useIncidents();

  // Automatically switch to list view on mobile
  useEffect(() => {
    if (isMobile) {
      setViewMode('list');
    } else {
      setViewMode('table');
    }
  }, [isMobile, setViewMode]);

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">
          Error loading incidents: {error instanceof Error ? error.message : 'Unknown error'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box className={className} sx={{ width: '100%' }}>
      {viewMode === 'list' || isMobile ? (
        <IncidentsList incidents={incidents} loading={isLoading} />
      ) : (
        <IncidentsTable incidents={incidents} loading={isLoading} />
      )}
    </Box>
  );
};

// Export for convenient importing
export default Incidents;
