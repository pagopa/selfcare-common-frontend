import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { CONFIG } from '../config/env';
import { User } from '../model/User';
import { userActions } from '../redux/slices/userSlice';
import { storageTokenOps, storageUserOps } from '../utils/storage';

const testToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjUwOTZlNGM2LTI1YTEtNDVkNS05YmRmLTJmYjk3NGE3YzFjOCIsImxldmVsIjoiTDIiLCJpYXQiOjE2NTMwNDA1MzQsImF1ZCI6ImFwaS5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiU1BJRCIsImp0aSI6IjAxRzNHRTlOQ1ZSVldEUjlHVERGU0MxQjZWIn0.gMnrecCaAZb5F-NRjMcPCM2eJcEIP89Hv6KWbz3PCIAcVb9g9tBl_c_llv90P_yQn50F8N9nhcaD3MrKpeKkdVSFkYrkZQycpz0vSUpxrriS85UN48iHM_dGDZaZm7zo1Funb6eRVx7M49e_bJRPIzBqF8SuwVhYN05KwivZyGHiVtBL4UmC-4A2kGQTCCOp4ECYMNFjEIetfRbpy3-FmWgQzArj9wAxG0x_Qd2YI3AI8RvVH4jeoc77K_bHxBe_mRj73BQPT1wHAFW8ztBaTD2o2V2br4qgozHqOvx1C_dvXYjvKVCNHgcsa_aKaY0cuYaBMkwfTfknHMMcVGuSzQ';

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
