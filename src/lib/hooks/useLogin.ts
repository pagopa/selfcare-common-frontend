import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { CONFIG } from '../config/env';
import { User } from '../model/User';
import { userActions } from '../redux/slices/userSlice';
import { storageTokenOps, storageUserOps } from '../utils/storage';

const testToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjliMTdjZTcwLWY3OWYtNDJkOS04YjBlLTRlN2ViNGQ4ODA3NCIsImxldmVsIjoiTDIiLCJpYXQiOjE2NDkzMjQ5NjYsImF1ZCI6ImFwaS5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiU1BJRCIsImp0aSI6IjAxRzAxUFZHTUdYQ0dSMjE3WVk2RU1DWDZOIn0.oO8-WtML_VQexvVgiZOOtrpNqQTgIryk0IbLd9GPDzm8zvn7ykz5Oe02yshBKwItvHHEvp-dIgyWj-rl_V6FcQm4ctO4eXYb8q6rjnryaKcbY7SG0_jCOyKHVpEnNiT-rk-mnEgCg9k6aXWWhRxgw6J3LhxkoRSNnwE-5p48Y9cntjJyfum0kxw3GQNpjly3DJ2H4NMykitzgY2gDS1DaYJJVHsheBMuz4kKu5El1ExchbpH2FU51pZalfPnWzd4h8PQgyNCT0MbhxuBVi0G8R_TWPMAo0HRZGBKNEYNwkLAiMOe-mmIHSldmFE_XXDuxaQ-lo1iwkQ_qJdnUUvnhw';

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
