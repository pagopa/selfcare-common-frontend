import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { CONFIG } from '../config/env';
import { User } from '../model/User';
import { userActions } from '../redux/slices/userSlice';
import { withOnSuccess } from '../utils/login-utils';
import { isPagoPaUser, storageTokenOps, storageUserOps } from '../utils/storage';

const testToken = CONFIG.TEST.JWT;

const warnOnce = (() => {
  let warned = false;
  return (message: string) => {
    if (!warned) {
      warned = true;
      // eslint-disable-next-line no-console
      console.warn(message);
    }
  };
})();

const mockedUser = {
  uid: '0',
  taxCode: 'AAAAAA00A00A000A',
  name: 'loggedName',
  surname: 'loggedSurname',
  email: 'loggedEmail@aa.aa',
  iss: 'SPID',
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const setUser = (user: User) => dispatch(userActions.setLoggedUser(user));

  const attemptSilentLogin = async () => {
    if (CONFIG.MOCKS.MOCK_USER) {
      if (!import.meta.env.DEV) {
        warnOnce(
          '[selfcare-common-frontend] CONFIG.MOCKS.MOCK_USER is enabled outside DEV mode. This should be used only for local development.'
        );
      }
      if (!testToken) {
        warnOnce(
          '[selfcare-common-frontend] MOCK_USER is enabled but CONFIG.TEST.JWT is empty. Set VITE_TEST_JWT in .env.development.local.'
        );
      }

      setUser(mockedUser);
      if (testToken) {
        storageTokenOps.write(testToken);
      }
      storageUserOps.write(mockedUser);
      return;
    }

    const sessionStorageUser = storageUserOps.read();
    const LOGIN_URL = isPagoPaUser() ? CONFIG.URL_FE.LOGOUT_GOOGLE : CONFIG.URL_FE.LOGIN;

    // If there are no credentials, it is impossible to get the user, so
    if (isEmpty(sessionStorageUser)) {
      // Remove any partial data that might have remained, just for safety
      storageUserOps.delete();
      // Go to the login view
      globalThis.location.assign(withOnSuccess(LOGIN_URL));
      // This return is necessary
      return;
    }

    // Otherwise, set the user to the one stored in the storage
    setUser(sessionStorageUser);
  };

  return { attemptSilentLogin };
};
