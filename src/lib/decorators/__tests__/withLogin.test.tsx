import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { storageDelete, storageWrite } from '../../utils/storage-utils';
import { STORAGE_KEY_USER } from '../../utils/constants';
import { User } from '../../model/User';
import { createStore } from '../../redux/__tests__/store';
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
  storageDelete(STORAGE_KEY_USER);
  mockedLocation.assign.mockReset();
});

const renderApp = () => {
  const store = createStore();
  const Component = () => <></>;
  const DecoratedComponent = withLogin(Component);
  render(
    <Provider store={store}>
      <DecoratedComponent />
    </Provider>
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

  storageWrite(STORAGE_KEY_USER, user, 'object');

  return user;
};

test('Test no auth session', async () => {
  renderApp();
  await waitFor(() => expect(global.window.location.assign).toBeCalledWith('/auth/login'));
});

test('Test auth session', async () => {
  const user = mockUser();
  const store = renderApp();
  await waitFor(() => {
    expect(global.window.location.assign).not.toBeCalled();
    expect(store.getState().user.logged).toMatchObject(user);
  });
});
