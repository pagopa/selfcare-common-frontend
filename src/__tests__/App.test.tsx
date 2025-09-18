import { ThemeProvider } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import AppExample from '../AppExample';
import '../examples/locale';
import { createStore } from '../examples/redux/store';
import { verifyMockExecution as verifyLoginMockExecution } from '../lib/decorators/__mocks__/withLogin';

jest.mock('../lib/decorators/withLogin');
jest.mock('i18next-browser-languagedetector');

// Type-safe aliases to avoid TypeScript conflicts
const ReduxProvider = Provider as any;
const RouterProvider = Router as any;

const renderApp = (
  injectedStore?: ReturnType<typeof createStore>,
  injectedHistory?: ReturnType<typeof createMemoryHistory>
) => {
  const store = injectedStore ? injectedStore : createStore();
  const history = injectedHistory ? injectedHistory : createMemoryHistory();
  render(
    <RouterProvider history={history}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <AppExample />
        </ThemeProvider>
      </ReduxProvider>
    </RouterProvider>
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
