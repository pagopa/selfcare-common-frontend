import React from 'react';
import ReactDOM from 'react-dom/client';
import './lib/index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router';
import AppExample from './AppExample';
import { createStore } from './examples/redux/store';
import { CONFIG } from './lib/config/env';
import './examples/locale';

const store = createStore();

// eslint-disable-next-line functional/immutable-data
CONFIG.MOCKS.MOCK_USER = true;

// A data router is required to intercept the navigations (see useUnloadEventInterceptor)
const router = createBrowserRouter([
  {
    path: '*',
    element: (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppExample />
      </ThemeProvider>
    ),
  },
]);

// Type-safe aliases to avoid TypeScript conflicts
const ReduxProvider = Provider as any;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);