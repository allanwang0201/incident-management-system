import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  styled,
  PriorityIcon,
} from '@incident-system/design-system';
import { IncidentWithLocation, formatDateTime } from '@incident-system/shared';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

interface IncidentsTableProps {
  incidents: IncidentWithLocation[];
  loading?: boolean;
}

export const IncidentsTable: React.FC<IncidentsTableProps> = ({ incidents, loading = false }) => {
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
    <TableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 650 }} aria-label="incidents table">
        <TableHead>
          <TableRow>
            <TableCell width="60" align="center">
              &nbsp;
            </TableCell>
            <TableCell>Date and Time</TableCell>
            <TableCell>ID</TableCell>
            <TableCell>Location Name</TableCell>
            <TableCell>Incident Name</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {incidents.map((incident) => (
            <StyledTableRow key={incident.id}>
              <TableCell align="center">
                <PriorityIcon priority={incident.priority} size={20} />
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ whiteSpace: 'nowrap' }}>
                  {formatDateTime(incident.datetime)}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{incident.id}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{incident.locationName}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">{incident.name}</Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {incident.description || '-'}
                </Typography>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
