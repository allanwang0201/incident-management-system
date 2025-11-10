import React from 'react';
import type { Preview } from '@storybook/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '../src/theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#3C3F41',
        },
        {
          name: 'light',
          value: '#fafafa',
        },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const theme = createAppTheme(context.globals.theme || 'dark');

      return (
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div style={{ padding: '2rem' }}>
            <Story />
          </div>
        </ThemeProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'dark',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', icon: 'circlehollow', title: 'light' },
          { value: 'dark', icon: 'circle', title: 'dark' },
        ],
        showName: true,
      },
    },
  },
};

export default preview;
