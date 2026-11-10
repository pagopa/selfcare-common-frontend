import { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useBlocker, useNavigate } from 'react-router';
import { useUnloadEventOnExit } from '../hooks/useUnloadEventInterceptor';
import { appStateSelectors } from '../redux/slices/appStateSlice';

/** Blocks the router navigations while the unload event interceptor is enabled and asks the user for confirmation.
It requires a data router (useBlocker throws with a plain BrowserRouter). */
export default function UnloadEventRouterBlocker() {
  const store = useStore();
  const navigate = useNavigate();
  const onExit = useUnloadEventOnExit();

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      appStateSelectors.selectUnloadEventConfiguration(store.getState() as any).enabled &&
      (currentLocation.pathname !== nextLocation.pathname ||
        currentLocation.search !== nextLocation.search ||
        currentLocation.hash !== nextLocation.hash)
  );

  useEffect(() => {
    if (blocker.state === 'blocked') {
      const target = blocker.location;
      blocker.reset();
      // the exit action is invoked after the interceptor has been disabled, so the navigation is not blocked again
      onExit(() => navigate(target, { state: target.state }));
    }
  }, [blocker.state]);

  return null;
}
