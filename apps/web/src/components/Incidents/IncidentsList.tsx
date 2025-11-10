import React from 'react';
import { Paper, Typography, Box, Divider, PriorityIcon } from '@incident-system/design-system';
import { IncidentWithLocation, formatDateTime } from '@incident-system/shared';

const IncidentCard = ({ incident }: { incident: IncidentWithLocation }) => (
  <Box
    sx={{
      p: 2,
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      },
    }}
  >
    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
      <Box sx={{ pt: 0.5 }}>
        <PriorityIcon priority={incident.priority} size={20} />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Typography variant="body2" color="primary" sx={{ mb: 1 }}>
          {formatDateTime(incident.datetime)}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {incident.locationName}
        </Typography>
        <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
          {incident.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {incident.description || '-'}
        </Typography>
      </Box>
    </Box>
  </Box>
);

interface IncidentsListProps {
  incidents: IncidentWithLocation[];
  loading?: boolean;
}

export const IncidentsList: React.FC<IncidentsListProps> = ({ incidents, loading = false }) => {
  if (loading) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>Loading incidents...</Typography>
      </Box>
    );
  }

  if (!incidents.length) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography>No incidents found</Typography>
      </Box>
    );
  }

  return (
    <Paper elevation={0}>
      <Box>
        {incidents.map((incident, index) => (
          <React.Fragment key={incident.id}>
            <IncidentCard incident={incident} />
            {index < incidents.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Box>
    </Paper>
  );
};
