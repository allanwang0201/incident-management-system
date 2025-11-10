import type { Meta, StoryObj } from '@storybook/react';
import { PriorityIcon } from '../components/PriorityIcon/PriorityIcon';
import { Box, Typography } from '@mui/material';

const meta = {
  title: 'Components/PriorityIcon',
  component: PriorityIcon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    priority: {
      control: 'select',
      options: [1, 2, 3],
      description: '1: High, 2: Medium, 3: Low',
    },
    size: {
      control: { type: 'range', min: 16, max: 64, step: 4 },
    },
  },
} satisfies Meta<typeof PriorityIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HighPriority: Story = {
  args: {
    priority: 1,
    size: 24,
  },
};

export const MediumPriority: Story = {
  args: {
    priority: 2,
    size: 24,
  },
};

export const LowPriority: Story = {
  args: {
    priority: 3,
    size: 24,
  },
};

export const AllSizes: Story = {
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {[1, 2, 3].map((priority) => (
        <Box key={priority} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography variant="body2" sx={{ width: 80 }}>
            Priority {priority}:
          </Typography>
          {[16, 20, 24, 32, 48].map((size) => (
            <Box
              key={size}
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}
            >
              <PriorityIcon priority={priority as 1 | 2 | 3} size={size} />
              <Typography variant="caption" color="text.secondary">
                {size}px
              </Typography>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  ),
};

export const Comparison: Story = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 4 }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <PriorityIcon priority={1} size={32} />
        <Typography variant="body2">High</Typography>
        <Typography variant="caption" color="error.main">
          #FF2727
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <PriorityIcon priority={2} size={32} />
        <Typography variant="body2">Medium</Typography>
        <Typography variant="caption" color="warning.main">
          #FFC627
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
        <PriorityIcon priority={3} size={32} />
        <Typography variant="body2">Low</Typography>
        <Typography variant="caption" color="info.main">
          #27C6FF
        </Typography>
      </Box>
    </Box>
  ),
};
