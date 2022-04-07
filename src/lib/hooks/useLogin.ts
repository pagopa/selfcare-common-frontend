import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { CONFIG } from '../config/env';
import { User } from '../model/User';
import { userActions } from '../redux/slices/userSlice';
import { storageTokenOps, storageUserOps } from '../utils/storage';

const testToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjliMTdjZTcwLWY3OWYtNDJkOS04YjBlLTRlN2ViNGQ4ODA3NCIsImxldmVsIjoiTDIiLCJpYXQiOjE2NDkzMjQ5NjYsImV4cCI6MTY0OTM1NzM2NiwiYXVkIjoiaHR0cHM6Ly9hcGkuZGV2LnNlbGZjYXJlLnBhZ29wYS5pdCIsImlzcyI6IlNQSUQiLCJqdGkiOiIwMUcwMVBWR01HWENHUjIxN1lZNkVNQ1g2TiJ9.ac_BEzjxQMv06-Qy9nOo7RfjOKH0cnIowELePGbxgG-uGLoyu31IFXVYofU2DlcYx23_X3rUW8xk2FmNpM5QohvJEX1zI44RuHR99sQY2_uFraWCK11NAfw9YCZjrMOXlygsNjXms109MTJ6I1OqWwe9_ng3yAxHvEKUJuBzVXZMLHB8QWLFI6ErV_DI8GoWFVPJTi77wmB4_XhIL83jIifEUrqZGA-Jq3-ssfBr3QO_cqVLebzJClwvR8VoX7k5iOgHuv4q0XVZSvTpdXGzs5W918PRwm7DEuih8-eC01xTWzB586xXfNrWcHBn6P_7_t-efY_2rvUbC0n5wYhKxQ';

const mockedUser = {
  uid: '0',
  taxCode: 'AAAAAA00A00A000A',
  name: 'loggedName',
  surname: 'loggedSurname',
  email: 'loggedEmail@aa.aa',
};

export const useLogin = () => {
  const dispatch = useDispatch();
  const setUser = (user: User) => dispatch(userActions.setLoggedUser(user));

  const attemptSilentLogin = async () => {
    if (CONFIG.MOCKS.MOCK_USER) {
      setUser(mockedUser);
      storageTokenOps.write(testToken);
      storageUserOps.write(mockedUser);
      return;
    }

    const sessionStorageUser = storageUserOps.read();

    // If there are no credentials, it is impossible to get the user, so
    if (isEmpty(sessionStorageUser)) {
      // Remove any partial data that might have remained, just for safety
      storageUserOps.delete();
      // Go to the login view
      window.location.assign(CONFIG.URL_FE.LOGIN);
      // This return is necessary
      return;
    }

    // Otherwise, set the user to the one stored in the storage
    setUser(sessionStorageUser);
  };

  return { attemptSilentLogin };
};
