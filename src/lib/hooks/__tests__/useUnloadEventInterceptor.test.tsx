import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../store';
import UnloadEventHandler from './../../components/UnloadEventHandler';
import { useUnloadEventOnExit, useUnloadEventLogout } from './../useUnloadEventInterceptor';
import UseUnloadEventInterceptorExample from './../../../examples/UseUnloadEventInterceptorExample';

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

const renderApp = () => {
  const store = createStore();
  const Child = buildChildComponent();
  render(
    <Provider store={store}>
      <UnloadEventHandler />
      <UseUnloadEventInterceptorExample />
      <Child />
    </Provider>
  );
  return store;
};

function buildChildComponent() {
  return () => {
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
    renderApp();
    await checkButtonClick(buttonLabel, invokedUrl);
  };
  const baseTestDisabledExplicitly = async (buttonLabel: string, invokedUrl: string) => {
    renderApp();
    const startButton = screen.getByText('StartUnloadEventInterceptor');
    fireEvent.click(startButton);
    const endButton = screen.getByText('EndUnloadEventInterceptor');
    fireEvent.click(endButton);
    await checkButtonClick(buttonLabel, invokedUrl);
  };
  const checkButtonClick = async (buttonLabel: string, invokedUrl: string) => {
    const button = screen.getByText(buttonLabel);
    fireEvent.click(button);
    expect(mockedLocation.assign).toBeCalledWith(invokedUrl);
  };
  test('logout', async () => {
    await baseTest('LOGOUT', '/auth/logout');
  });
  test('logoutDisabledExplicitly', async () => {
    await baseTestDisabledExplicitly('LOGOUT', '/auth/logout');
  });
  test('exit', async () => {
    await baseTest('EXIT', 'http://dummyurl');
  });
  test('exitDisabledExplicitly', async () => {
    await baseTestDisabledExplicitly('EXIT', 'http://dummyurl');
  });
});

describe('enabled', () => {
  const baseTest = async (buttonLabel: string, invokedUrl: string) => {
    renderApp();
    const startButton = screen.getByText('StartUnloadEventInterceptor');
    fireEvent.click(startButton);

    const button = screen.getByText(buttonLabel);
    fireEvent.click(button);

    expect(mockedLocation.assign).toBeCalledTimes(0);

    screen.getByText('Vuoi davvero uscire?');

    fireEvent.click(screen.getByText('Annulla'));
    await waitFor(() => expect(screen.queryByText('Vuoi davvero uscire?')).toBeNull());

    fireEvent.click(button);
    fireEvent.click(screen.getByText('Esci'));
    expect(mockedLocation.assign).toBeCalledWith(invokedUrl);
  };
  test('logout', async () => {
    await baseTest('LOGOUT', '/auth/logout');
  });
  test('exit', async () => {
    await baseTest('EXIT', 'http://dummyurl');
  });
});