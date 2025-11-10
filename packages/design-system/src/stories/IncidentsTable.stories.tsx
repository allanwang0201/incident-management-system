import type { Meta, StoryObj } from '@storybook/react';
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
} from '@mui/material';
import { PriorityIcon } from '../components/PriorityIcon/PriorityIcon';

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
  {
    id: 1,
    name: 'Liquid Spill',
    priority: 3,
    datetime: '1/21/2018, 10:54:12 PM',
    locationName: 'T1 Lobby',
    description: 'Small water spill near gate entrance, maintenance team notified for cleanup',
  },
  {
    id: 2,
    name: 'Lost Property',
    priority: 3,
    datetime: '1/23/2018, 6:25:43 PM',
    locationName: 'T1 Lobby',
    description:
      'Black backpack found near seating area, handed to security office for safekeeping',
  },
];

const IncidentsTable = ({ incidents = mockIncidents }: { incidents?: Incident[] }) => {
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

const meta = {
  title: 'Components/Incidents Table',
  component: IncidentsTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IncidentsTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    incidents: mockIncidents,
  },
};

export const Empty: Story = {
  args: {
    incidents: [],
  },
};

export const SingleIncident: Story = {
  args: {
    incidents: [mockIncidents[0]],
  },
};

export const HighPriorityOnly: Story = {
  args: {
    incidents: mockIncidents.filter((i) => i.priority === 1),
  },
};

export const LowPriorityOnly: Story = {
  args: {
    incidents: mockIncidents.filter((i) => i.priority === 3),
  },
};
