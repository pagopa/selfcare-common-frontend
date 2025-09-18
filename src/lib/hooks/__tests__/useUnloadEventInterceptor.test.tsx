import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createStore } from '../../../examples/redux/store';
import './../../../examples/locale';
import UseUnloadEventInterceptorExample from './../../../examples/UseUnloadEventInterceptorExample';
import UnloadEventHandler from './../../components/UnloadEventHandler';
import {
  useUnloadEventInterceptorAndActivate,
  useUnloadEventLogout,
  useUnloadEventOnExit,
} from './../useUnloadEventInterceptor';

jest.mock('i18next-browser-languagedetector');

const oldWindowLocation = global.window.location;

const initialLocation = {
  assign: jest.fn(),
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
  const history = createMemoryHistory();
  // Type-safe aliases to avoid TypeScript conflicts
  const ReduxProvider = Provider as any;
  const RouterProvider = Router as any;
  render(
    <RouterProvider history={history}>
      <ReduxProvider store={store}>
        <UnloadEventHandler />
        <UseUnloadEventInterceptorExample />
        <Child />
      </ReduxProvider>
    </RouterProvider>
  );
  return store;
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
