import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../examples/redux/store';
import { User } from '../../model/User';
import { storageUserOps } from '../../utils/storage';
import withLogin from '../withLogin';

const oldWindowLocation = global.window.location;
const mockedLocation = {
  assign: jest.fn(),
  pathname: '',
  origin: 'MOCKED_ORIGIN',
  search: '',
  hash: '',
};

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
});
afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

// clean storage after each test
afterEach(() => {
  storageUserOps.delete();
  mockedLocation.assign.mockReset();
});

const renderApp = () => {
  const store = createStore();
  const Component = () => <></>;
  const DecoratedComponent = withLogin(Component);
  // Type-safe aliases to avoid TypeScript conflicts
const ReduxProvider = Provider as any;
  render(
    <ReduxProvider store={store}>
      <DecoratedComponent />
    </ReduxProvider>
  );
  return store;
};

const mockUser = (): User => {
  const user: User = {
    name: 'NAME',
    surname: 'SURNAME',
    uid: 'UID',
    taxCode: 'AAAAAA00A00A000A',
    email: 'a@a.aa',
  };

  storageUserOps.write(user);

  return user;
};

test('Test no auth session', async () => {
  renderApp();
  await waitFor(() => expect(global.window.location.assign).toHaveBeenCalledWith('/auth/login'));
});

test('Test auth session', async () => {
  const user = mockUser();
  const store = renderApp();
  await waitFor(() => {
    expect(global.window.location.assign).not.toHaveBeenCalled();
    expect(store.getState().user.logged).toMatchObject(user);
  });
});
