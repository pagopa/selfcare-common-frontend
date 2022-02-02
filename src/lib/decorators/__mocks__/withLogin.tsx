import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../model/User';
import { userActions, userSelectors } from '../../redux/slices/userSlice';

export const mockedUser: User = {
  name: 'NAME',
  surname: 'SURNAME',
  uid: 'UID',
  taxCode: 'AAAAAA00A00A000A',
  email: 'a@a.aa',
};

export const verifyMockExecution = (state: any) => {
  expect(state.user.logged).toMatchObject(mockedUser);
};

export default (WrappedComponent: React.ComponentType<any>) => () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(userSelectors.selectLoggedUser);
  useEffect(() => {
    dispatch(userActions.setLoggedUser(mockedUser));
  }, []);
  return loggedUser ? <WrappedComponent /> : <></>;
};
