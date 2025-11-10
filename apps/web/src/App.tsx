import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createAppTheme } from '@incident-system/design-system';
import { useIncidentStore } from '@incident-system/shared';
import { MainLayout } from './components/Layout/MainLayout';
import { IncidentsPage } from './pages/IncidentsPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  const themeMode = useIncidentStore((state) => state.themeMode);
  const theme = createAppTheme(themeMode);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <MainLayout>
            <IncidentsPage />
          </MainLayout>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
