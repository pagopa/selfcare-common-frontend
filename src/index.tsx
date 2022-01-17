import 'react-app-polyfill/ie11';
import 'core-js/es/object/values';
import 'core-js/es/promise';
import 'core-js/es/array';
import 'core-js/stable/string';
import 'core-js/stable/number';
import 'core-js/stable/url-search-params';
import React from 'react';
import ReactDOM from 'react-dom';
import './lib/index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '@pagopa/mui-italia/theme';
import App from './App';
import { createStore } from './lib/redux/__tests__/store';
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
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
