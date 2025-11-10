import type { Meta, StoryObj } from '@storybook/react';
import { Box, Typography, Paper } from '@mui/material';

const ThemeShowcase = () => {
  const colors = [
    { name: 'Primary', color: 'primary.main', value: '#27C6FF' },
    { name: 'Secondary', color: 'secondary.main', value: '#FFC627' },
    { name: 'Error', color: 'error.main', value: '#FF2727' },
    { name: 'Warning', color: 'warning.main', value: '#FFC627' },
    { name: 'Info', color: 'info.main', value: '#27C6FF' },
    { name: 'Success', color: 'success.main', value: '#4caf50' },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Box>
        <Typography variant="h4" gutterBottom>
          Color Palette
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {colors.map((color) => (
            <Paper
              key={color.name}
              elevation={3}
              sx={{
                p: 2,
                minWidth: 150,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 80,
                  bgcolor: color.color,
                  borderRadius: 1,
                }}
              />
              <Typography variant="subtitle2">{color.name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {color.value}
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom>
          Typography
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="h1">Heading 1</Typography>
          <Typography variant="h2">Heading 2</Typography>
          <Typography variant="h3">Heading 3</Typography>
          <Typography variant="h4">Heading 4</Typography>
          <Typography variant="h5">Heading 5</Typography>
          <Typography variant="h6">Heading 6</Typography>
          <Typography variant="body1">
            Body 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="body2">
            Body 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Typography>
          <Typography variant="caption">Caption: Lorem ipsum dolor sit amet</Typography>
        </Box>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom>
          Backgrounds
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'background.default',
              border: 1,
              borderColor: 'divider',
              minWidth: 200,
            }}
          >
            <Typography variant="subtitle2">Default Background</Typography>
            <Typography variant="caption" color="text.secondary">
              #3C3F41 (Dark) / #fafafa (Light)
            </Typography>
          </Paper>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              bgcolor: 'background.paper',
              minWidth: 200,
            }}
          >
            <Typography variant="subtitle2">Paper Background</Typography>
            <Typography variant="caption" color="text.secondary">
              #3C3F41 (Dark) / #ffffff (Light)
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

const meta = {
  title: 'Design System/Theme',
  component: ThemeShowcase,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeShowcase>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
