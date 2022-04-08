import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { CONFIG } from '../config/env';
import { User } from '../model/User';
import { userActions } from '../redux/slices/userSlice';
import { storageTokenOps, storageUserOps } from '../utils/storage';

const testToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjliMTdjZTcwLWY3OWYtNDJkOS04YjBlLTRlN2ViNGQ4ODA3NCIsImxldmVsIjoiTDIiLCJpYXQiOjE2NDkzMjQ5NjYsImF1ZCI6Imh0dHBzOi8vYXBpLmRldi5zZWxmY2FyZS5wYWdvcGEuaXQiLCJpc3MiOiJTUElEIiwianRpIjoiMDFHMDFQVkdNR1hDR1IyMTdZWTZFTUNYNk4ifQ.Deq53Tt1Lohp54H6e83-ZaUVMuRahGRDVW7awKl9czZ5UC8Nb6-PPP4hLz7Ut3lq_DjVy7sUpMVjHhGBi2g-Xya95apRlwOwl5Evu-MJzoLTjSKMRK7Nz5qEhJoA3tgOU3094VNuz_-AyIyOptD--wXZH15furowqGdvzH2lFWN2SK7mqwnuCw8zHsPiDtmUD2LxWIGP7TUo5wYHggwD332Gzi85fWJAFlwY0K0mtUE6JiAcZmtTNSnlksqPlrRa1AfwGrgs8Wi9kxS7eL1YhcBIi3b6Y3qPg5sLvM77L8RCdPRmGt1nViGDFSmcBldhtk82XW2IjJwyiJb5kgrMcQ';

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
