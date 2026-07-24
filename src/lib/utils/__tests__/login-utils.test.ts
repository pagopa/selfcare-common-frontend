import { withOnSuccess } from '../login-utils';

const oldWindowLocation = global.window.location;
const mockedLocation = {
  assign: vi.fn(),
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

const standingOn = (pathname: string, search: string = '') => {
  // eslint-disable-next-line functional/immutable-data
  mockedLocation.pathname = pathname;
  // eslint-disable-next-line functional/immutable-data
  mockedLocation.search = search;
};

test('appends the current page as onSuccess', () => {
  standingOn('/onboarding/user');

  expect(withOnSuccess('/auth/login')).toBe('/auth/login?onSuccess=%2Fonboarding%2Fuser');
});

test('keeps the querystring of the current page inside onSuccess', () => {
  standingOn('/onboarding/user', '?productId=prod-io');

  expect(withOnSuccess('https://selfcare.it/auth/login')).toBe(
    'https://selfcare.it/auth/login?onSuccess=%2Fonboarding%2Fuser%3FproductId%3Dprod-io'
  );
});

test('appends to a login url which already carries other params', () => {
  standingOn('/onboarding/user');

  expect(withOnSuccess('/auth/login?lang=it')).toBe(
    '/auth/login?lang=it&onSuccess=%2Fonboarding%2Fuser'
  );
});

test('leaves untouched a login url which already carries its own onSuccess', () => {
  standingOn('/onboarding/user');

  expect(withOnSuccess('/auth/login?onSuccess=%2Fdashboard')).toBe(
    '/auth/login?onSuccess=%2Fdashboard'
  );
});

test('adds nothing when there is no destination to go back to', () => {
  standingOn('');

  expect(withOnSuccess('/auth/login')).toBe('/auth/login');
});
