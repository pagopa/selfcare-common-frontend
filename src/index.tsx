import './lib/common-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './lib/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@pagopa/mui-italia/theme';
import AppExample from './AppExample';
import { createStore } from './examples/redux/store';
import { CONFIG } from './lib/config/env';

const store = createStore();

// eslint-disable-next-line functional/immutable-data
CONFIG.MOCKS.MOCK_USER = true;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppExample />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
