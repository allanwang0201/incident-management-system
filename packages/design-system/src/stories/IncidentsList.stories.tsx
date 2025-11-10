import type { Meta, StoryObj } from '@storybook/react';
import { Paper, Typography, Box, Divider } from '@mui/material';
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
          {incident.description || '-'}
        </Typography>
      </Box>
    </Box>
  </Box>
);

const IncidentsList = ({ incidents = mockIncidents }: { incidents?: Incident[] }) => {
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

const meta = {
  title: 'Components/Incidents List',
  component: IncidentsList,
  parameters: {
    layout: 'padded',
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof IncidentsList>;

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

export const MediumPriorityOnly: Story = {
  args: {
    incidents: mockIncidents.filter((i) => i.priority === 2),
  },
};

export const LowPriorityOnly: Story = {
  args: {
    incidents: mockIncidents.filter((i) => i.priority === 3),
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
