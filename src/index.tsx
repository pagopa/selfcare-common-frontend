import './lib/common-polyfill';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './lib/index.css';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppExample from './AppExample';
import { createStore } from './examples/redux/store';
import { CONFIG } from './lib/config/env';
import './examples/locale';

const store = createStore();

// eslint-disable-next-line functional/immutable-data
CONFIG.MOCKS.MOCK_USER = true;

// Type-safe aliases to avoid TypeScript conflicts
const ReduxProvider = Provider as any;
const Router = BrowserRouter as any;

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppExample />
        </ThemeProvider>
      </Router>
    </ReduxProvider>
  </React.StrictMode>
);