import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ThemeProvider,
  CssBaseline,
  createAppTheme,
  Box,
  Typography,
  Container,
  IconButton,
  useTheme,
} from '@incident-system/design-system';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useIncidentStore } from '@incident-system/shared';
import { useQueryClient } from '@tanstack/react-query';
// Import the reusable Incidents component from web app
import Incidents from '../../web/src/components/Incidents/Incidents';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function AppContent() {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { themeMode, toggleTheme } = useIncidentStore();

  const handleRefresh = () => {
    queryClient.invalidateQueries({ queryKey: ['incidents'] });
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      {/* Header */}
      <Box
        component="header"
        sx={{
          bgcolor: 'background.paper',
          borderBottom: 1,
          borderColor: 'divider',
          px: 3,
          py: 2,
          WebkitAppRegion: 'drag', // Allow window dragging
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
            Incidents - Desktop
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, WebkitAppRegion: 'no-drag' }}>
            <IconButton onClick={handleRefresh} color="inherit" aria-label="refresh incidents">
              <RefreshIcon />
            </IconButton>
            <IconButton onClick={toggleTheme} color="inherit" aria-label="toggle theme">
              {themeMode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 3,
        }}
      >
        <Container maxWidth="xl">
          <Incidents />
        </Container>
      </Box>
    </Box>
  );
}

function App() {
  const themeMode = useIncidentStore((state) => state.themeMode);
  const theme = createAppTheme(themeMode);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppContent />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
