import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { expect } from 'vitest';
import { User } from '../../model/User';
import { userActions, userSelectors } from '../../redux/slices/userSlice';

export const mockedUser: User = {
  uid: 'UID',
};

export const verifyMockExecution = (state: any) => {
  expect(state.user.logged).toMatchObject(mockedUser);
};

export default (WrappedComponent: React.ComponentType<any>) => (props: any) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(userSelectors.selectLoggedUser);
  useEffect(() => {
    dispatch(userActions.setLoggedUser(mockedUser));
  }, []);
  return loggedUser ? <WrappedComponent {...props} /> : <></>;
};
