import React from 'react';
import { Box, Typography, IconButton } from '@incident-system/design-system';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useIncidentStore } from '@incident-system/shared';
import { useQueryClient } from '@tanstack/react-query';

export const Header: React.FC = () => {
  const queryClient = useQueryClient();
  const { themeMode, toggleTheme } = useIncidentStore();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['incidents'] });
  };

  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: 1,
        borderColor: 'divider',
        px: 3,
        py: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
          }}
        >
          Incidents
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton onClick={handleRefresh} color="inherit" aria-label="refresh incidents">
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
            {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
