import { render } from '@testing-library/react';
import AppExample from '../AppExample';
import { Provider } from 'react-redux';
import { createStore } from '../examples/redux/store';
import { verifyMockExecution as verifyLoginMockExecution } from '../lib/decorators/__mocks__/withLogin';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import '../examples/locale';
import { ThemeProvider } from '@mui/material';
import { theme } from '@pagopa/mui-italia';

jest.mock('../lib/decorators/withLogin');
jest.mock('i18next-browser-languagedetector');

const renderApp = (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();
  render(
    <Router history={history}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <AppExample />
        </ThemeProvider>
      </Provider>
    </Router>
  );
  return { store, history };
};

test('Test rendering dashboard no parties loaded', () => {
  const history = createMemoryHistory();
  history.push('/dashboard/1');

  const { store } = renderApp(undefined, history);

  verifyLoginMockExecution(store.getState());
  expect(store.getState().appState.loading.result).toBeFalsy();
});
