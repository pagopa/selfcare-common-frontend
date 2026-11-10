/// <reference types="vitest/globals" />
import { ThemeProvider } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import AppExample from '../AppExample';
import '../examples/locale';
import { createStore } from '../examples/redux/store';
import { verifyMockExecution as verifyLoginMockExecution } from '../lib/decorators/__mocks__/withLogin';

vi.mock('../lib/decorators/withLogin');
vi.mock('i18next-browser-languagedetector');

// Type-safe aliases to avoid TypeScript conflicts
const ReduxProvider = Provider as any;

const renderApp = (initialPath = '/', injectedStore?: ReturnType<typeof createStore>) => {
  const store = injectedStore ? injectedStore : createStore();
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <AppExample />
        </ThemeProvider>
      </ReduxProvider>
    </MemoryRouter>
  );
  return { store };
};

test('Test rendering dashboard no parties loaded', () => {
  const { store } = renderApp('/dashboard/1');

  verifyLoginMockExecution(store.getState());
  expect(store.getState().appState.loading.result).toBeFalsy();
});
