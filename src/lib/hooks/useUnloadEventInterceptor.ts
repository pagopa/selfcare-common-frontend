import { useEffect, useRef } from 'react';
import { useDispatch, useStore } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { CONFIG } from '../config/env';
import { appStateActions } from '../redux/slices/appStateSlice';
import { appStateSelectors } from './../redux/slices/appStateSlice';

/** In order to use this feature you have to use the custom hook useUnloadEventInterceptor, which will return an object having the following keys:
1.  registerUnloadEvent: an arrow function which takes two optional parameters to customize the title and the description of the pop-up opened when invoking the exitAction function (see below) and enable the functionality.
2.  unregisterUnloadEvent: an arrow function to call in order to disable this functionality.
 */
export const useUnloadEventInterceptor = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onExit = useUnloadEventOnExit();

  const unblockHistory = useRef<() => void>(() => {});

  const registerUnloadEvent = (title?: string, description?: string) => {
    dispatch(appStateActions.enableUnloadEventInterceptor({ title, description }));
    // eslint-disable-next-line functional/immutable-data
    unblockHistory.current = history.block((tx) => {
      onExit(() => {
        unblockHistory.current();
        history.push(tx);
      });
      return false;
    });
  };

  const unregisterUnloadEvent = () => {
    dispatch(appStateActions.disableUnloadEventInterceptor());
    unblockHistory.current();
  };

  return {
    registerUnloadEvent,
    unregisterUnloadEvent,
  };
};

/** If you wont to enable immediately this functionality when invoking the custom hook you can use the hook useUnloadEventInterceptorAndActivate, which will enable the functionality and will disable it when unmounting the component. */
export const useUnloadEventInterceptorAndActivate = (title?: string, description?: string) => {
  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  useEffect(() => {
    registerUnloadEvent(title, description);
    return () => unregisterUnloadEvent();
  }, []);
  return {
    registerUnloadEvent,
    unregisterUnloadEvent,
  };
};

/** In order to show a custom pop-up when the user trigger an exit action you have to use the custom hook useUnloadEventOnExit which will return an arrow function to invoke instead of the exit action passing to it the exitAction itself. */
export const useUnloadEventOnExit = () => {
  const dispatch = useDispatch();
  const store = useStore();
  return (exitAction: () => void) => {
    if (appStateSelectors.selectUnloadEventConfiguration(store.getState()).enabled) {
      dispatch(appStateActions.openUnloadEventNotify(exitAction));
    } else {
      exitAction();
    }
  };
};

/** When the exitAction is the Logout you can use the custom hook useUnloadEventLogout which is the customization of the useUnloadEventOnExit using the logout as an exit action. */
export const useUnloadEventLogout = () => {
  const onExit = useUnloadEventOnExit();
  return () => onExit(() => window.location.assign(CONFIG.URL_FE.LOGOUT));
};
