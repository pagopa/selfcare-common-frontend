import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useLoading from '../hooks/useLoading';
import { useLogin } from '../hooks/useLogin';
import { userSelectors } from '../redux/slices/userSlice';
import { LOADING_TASK_LOGIN_CHECK } from '../utils/constants';

// eslint-disable-next-line @typescript-eslint/ban-types
type LoginProps = {};

/** This feature is based on react-redux library and require to register the reducer build in userSlice into the application's redux store.
This decorator has to be applied to components whose acces require an active session.
Accessing to the components decorated with it without a session will brought to the login page.
It's possible to modify the login path changing the value in CONFIG.login inside the index.tsx file  */
export default function withLogin<T extends LoginProps>(
  WrappedComponent: React.ComponentType<T>
): React.ComponentType<T> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithLogin = (props: Omit<T, keyof LoginProps>) => {
    const user = useSelector(userSelectors.selectLoggedUser);
    const { attemptSilentLogin } = useLogin();
    const setLoading = useLoading(LOADING_TASK_LOGIN_CHECK);

    useEffect(() => {
      async function asyncAttemptSilentLogin() {
        await attemptSilentLogin();
      }

      if (!user) {
        setLoading(true);

        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        asyncAttemptSilentLogin().finally(() => setLoading(false));
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return user ? <WrappedComponent {...(props as T)} /> : <></>;
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentWithLogin.displayName = `withLogin(${displayName})`;

  return ComponentWithLogin;
}
