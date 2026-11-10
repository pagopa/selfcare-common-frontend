import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, RouterProvider, createMemoryRouter } from 'react-router';
import { createStore } from '../../../examples/redux/store';
import './../../../examples/locale';
import UseUnloadEventInterceptorExample from './../../../examples/UseUnloadEventInterceptorExample';
import UnloadEventHandler from './../../components/UnloadEventHandler';
import {
  useUnloadEventInterceptorAndActivate,
  useUnloadEventLogout,
  useUnloadEventOnExit,
} from './../useUnloadEventInterceptor';

vi.mock('i18next-browser-languagedetector');

const oldWindowLocation = global.window.location;

const initialLocation = {
  assign: vi.fn(),
  pathname: '',
  origin: 'MOCKED_ORIGIN',
  search: '',
  hash: '',
  state: undefined,
};

const mockedLocation = Object.assign({}, initialLocation);

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
});

afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

const renderApp = (startEnabled: boolean) => {
  const store = createStore();
  const Child = buildChildComponent(startEnabled);
  // Type-safe aliases to avoid TypeScript conflicts
  const ReduxProvider = Provider as any;
  render(
    <MemoryRouter>
      <ReduxProvider store={store}>
        <UnloadEventHandler />
        <UseUnloadEventInterceptorExample />
        <Child />
      </ReduxProvider>
    </MemoryRouter>
  );
  return store;
};

const renderAppWithDataRouter = () => {
  const store = createStore();
  const ReduxProvider = Provider as any;
  const router = createMemoryRouter([
    {
      path: '*',
      element: (
        <>
          <UnloadEventHandler />
          <UseUnloadEventInterceptorExample />
        </>
      ),
    },
  ]);
  render(
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  );
  return { store, router };
};

function buildChildComponent(startEnabled: boolean) {
  return () => {
    if (startEnabled) {
      useUnloadEventInterceptorAndActivate();
    }
    const logout = useUnloadEventLogout();
    const onExit = useUnloadEventOnExit();
    return (
      <>
        <button onClick={logout}>LOGOUT</button>
        <button onClick={() => onExit(() => window.location.assign('http://dummyurl'))}>
          EXIT
        </button>
      </>
    );
  };
}

describe('not enabled', () => {
  const baseTest = async (buttonLabel: string, invokedUrl: string) => {
    renderApp(false);
    await checkButtonClick(buttonLabel, invokedUrl);
  };

  const baseTestDisabledExplicitly = async (buttonLabel: string, invokedUrl: string) => {
    renderApp(false);
    const startButton = screen.getByText('StartUnloadEventInterceptor');
    fireEvent.click(startButton);
    const endButton = screen.getByText('EndUnloadEventInterceptor');
    fireEvent.click(endButton);
    await checkButtonClick(buttonLabel, invokedUrl);
  };

  const baseTestStartEnabled = async (buttonLabel: string, invokedUrl: string) => {
    renderApp(true);
    const endButton = screen.getByText('EndUnloadEventInterceptor');
    fireEvent.click(endButton);
    await checkButtonClick(buttonLabel, invokedUrl);
  };

  const checkButtonClick = async (buttonLabel: string, invokedUrl: string) => {
    const button = screen.getByText(buttonLabel);
    fireEvent.click(button);
    await waitFor(() => expect(mockedLocation.assign).toHaveBeenCalledWith(invokedUrl));
  };

  test('logout', async () => {
    await baseTest('LOGOUT', '/auth/logout');
  });
  test('logoutDisabledExplicitly', async () => {
    await baseTestDisabledExplicitly('LOGOUT', '/auth/logout');
  });
  test('logoutStartEnabled', async () => {
    await baseTestStartEnabled('LOGOUT', '/auth/logout');
  });

  test('exit', async () => {
    await baseTest('EXIT', 'http://dummyurl');
  });
  test('exitDisabledExplicitly', async () => {
    await baseTestDisabledExplicitly('EXIT', 'http://dummyurl');
  });
  test('exitStartEnabled', async () => {
    await baseTestStartEnabled('EXIT', 'http://dummyurl');
  });
});

describe('enabled', () => {
  const baseTest = async (buttonLabel: string, invokedUrl: string) => {
    renderApp(false);
    const startButton = screen.getByText('StartUnloadEventInterceptor');
    fireEvent.click(startButton);
    await checkBehavior(buttonLabel, invokedUrl);
  };

  const baseTestStartEnabled = async (buttonLabel: string, invokedUrl: string) => {
    renderApp(true);
    await checkBehavior(buttonLabel, invokedUrl);
  };

  const checkBehavior = async (buttonLabel: string, invokedUrl: string) => {
    const button = screen.getByText(buttonLabel);
    fireEvent.click(button);

    expect(mockedLocation.assign).toHaveBeenCalledTimes(0);

    screen.getByText('Vuoi davvero uscire?');

    fireEvent.click(screen.getByText('Annulla'));
    await waitFor(() => expect(screen.queryByText('Vuoi davvero uscire?')).toBeNull());

    fireEvent.click(button);
    fireEvent.click(screen.getByText('Esci'));
    expect(mockedLocation.assign).toHaveBeenCalledWith(invokedUrl);
  };

  test('logout', async () => {
    await baseTest('LOGOUT', '/auth/logout');
  });
  test('logoutStartEnabled', async () => {
    await baseTestStartEnabled('LOGOUT', '/auth/logout');
  });

  test('exit', async () => {
    await baseTest('EXIT', 'http://dummyurl');
  });
  test('exitStartEnabled', async () => {
    await baseTestStartEnabled('EXIT', 'http://dummyurl');
  });
});

describe('data router navigation blocking', () => {
  test('blocks the navigation, keeps the location on cancel and proceeds on confirm', async () => {
    const { router } = renderAppWithDataRouter();
    fireEvent.click(screen.getByText('StartUnloadEventInterceptor'));

    fireEvent.click(screen.getByText('pushRoute'));
    await screen.findByText('Vuoi uscire dal flusso attuale?');
    expect(router.state.location.pathname).toBe('/');

    fireEvent.click(screen.getByText('Annulla'));
    await waitFor(() => expect(screen.queryByText('Vuoi uscire dal flusso attuale?')).toBeNull());
    expect(router.state.location.pathname).toBe('/');

    fireEvent.click(screen.getByText('pushRoute'));
    fireEvent.click(await screen.findByText('Esci'));
    await waitFor(() => expect(router.state.location.pathname).toBe('/subpath/'));
  });

  test('does not block the navigation when not enabled', async () => {
    const { router } = renderAppWithDataRouter();
    await router.navigate('/other');
    expect(router.state.location.pathname).toBe('/other');
  });
});
