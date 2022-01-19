import isEmpty from 'lodash/isEmpty';
import { useDispatch } from 'react-redux';
import { storageDelete, storageRead, storageWrite } from '../utils/storage-utils';
import { CONFIG } from '../config/env';
import { STORAGE_KEY_TOKEN, STORAGE_KEY_USER } from '../utils/constants';
import { User } from '../model/User';
import { userActions } from '../redux/slices/userSlice';

const testToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjliMTdjZTcwLWY3OWYtNDJkOS04YjBlLTRlN2ViNGQ4ODA3NCIsImxldmVsIjoiTDIiLCJpYXQiOjE2Mzk1OTI2NTMsImlzcyI6IlNQSUQiLCJqdGkiOiIwMUZQWk5DV1c0RFhIQ0JZNFlHVFBKTkM2UiJ9.Cz6bZ1degD0APpJS3rfLPdjpjBE9JBGByVoLcFtqGhDxRAOhP_5aKqE0-1S9u9QUCakmhLA8i1auV7ImP8CLMaJTyUGUwz85yYL9KgqcRZ9qsYghFDqBQsh-n5_4Ldsu1-vBp2klwpJA87ppdzEyLZnSp6kUhpytFf00XtmSOYvt6-OMI6K6bBVFGXk_IYGs4KHx3-fij1DGg-_8BhghtkvJVyC2p9R4XezT8oXg55H-sBigTPdk9LssDa75Pj91zwPrbwTOBp9Tgk0HqOgieEDDpIuVplJI2uaq9YpDNyZkR8RnkSV072gPWlrJXDEb1-zXty7nT8NcGdRGTHDkkQ';

export const useLogin = () => {
  const dispatch = useDispatch();
  const setUser = (user: User) => dispatch(userActions.setLoggedUser(user));

  const attemptSilentLogin = async () => {
    if (CONFIG.MOCKS.MOCK_USER === 'true') {
      setUser({
        uid: '0',
        taxCode: 'AAAAAA00A00A000A',
        name: 'loggedName',
        surname: 'loggedSurname',
        email: 'loggedEmail@aa.aa',
      });
      storageWrite(STORAGE_KEY_TOKEN, testToken, 'string');
      return;
    }

    const sessionStorageUser = storageRead(STORAGE_KEY_USER, 'object');

    // If there are no credentials, it is impossible to get the user, so
    if (isEmpty(sessionStorageUser)) {
      // Remove any partial data that might have remained, just for safety
      storageDelete(STORAGE_KEY_USER);
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
