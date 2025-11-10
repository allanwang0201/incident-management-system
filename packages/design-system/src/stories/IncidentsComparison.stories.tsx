import type { Meta, StoryObj } from '@storybook/react';
import {
  Paper,
  Typography,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { PriorityIcon } from '../components/PriorityIcon/PriorityIcon';
import React from 'react';

interface Incident {
  id: number;
  name: string;
  priority: 1 | 2 | 3;
  datetime: string;
  locationName: string;
  description: string;
}

const mockIncidents: Incident[] = [
  {
    id: 3,
    name: 'Unattended Baggage',
    priority: 1,
    datetime: '1/22/2018, 7:13:00 AM',
    locationName: 'T1',
    description:
      'Suspicious unattended luggage reported, security team dispatched to investigate immediately',
  },
  {
    id: 5,
    name: 'Fire',
    priority: 1,
    datetime: '1/22/2018, 11:25:18 AM',
    locationName: 'T2',
    description:
      'Smoke detected in electrical room, fire alarm activated, evacuation procedures initiated',
  },
  {
    id: 4,
    name: 'Theft',
    priority: 2,
    datetime: '1/22/2018, 1:04:24 AM',
    locationName: 'T2',
    description: 'Passenger reported stolen wallet from shopping area, CCTV footage being reviewed',
  },
];

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    backgroundColor:
      theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
  },
}));

const IncidentCard = ({ incident }: { incident: Incident }) => (
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
          {incident.datetime}
        </Typography>
        <Typography variant="body2" sx={{ mb: 0.5 }}>
          {incident.locationName}
        </Typography>
        <Typography variant="body2" fontWeight={500} sx={{ mb: 0.5 }}>
          {incident.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {incident.description}
        </Typography>
      </Box>
    </Box>
  </Box>
);

const ResponsiveIncidents = ({ incidents = mockIncidents }: { incidents?: Incident[] }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (isMobile) {
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
  }

  return (
    <TableContainer component={Paper} elevation={0}>
      <Table>
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
                  {incident.datetime}
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
                  {incident.description}
                </Typography>
              </TableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const meta = {
  title: 'Components/Responsive Incidents',
  component: ResponsiveIncidents,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ResponsiveIncidents>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopView: Story = {
  args: {
    incidents: mockIncidents,
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
  },
};

export const MobileView: Story = {
  args: {
    incidents: mockIncidents,
  },
  parameters: {
    viewport: {
      defaultViewport: 'iphone12',
    },
  },
};

export const TabletView: Story = {
  args: {
    incidents: mockIncidents,
  },
  parameters: {
    viewport: {
      defaultViewport: 'ipad',
    },
  },
};
