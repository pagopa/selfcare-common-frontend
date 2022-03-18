import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { appStateSelectors } from '../lib/redux/slices/appStateSlice';
import { useUnloadEventInterceptor } from './../lib/hooks/useUnloadEventInterceptor';

export default function UseUnloadEventInterceptorExample() {
  const { registerUnloadEvent, unregisterUnloadEvent } = useUnloadEventInterceptor();
  const unloadEventconfiguration = useSelector(appStateSelectors.selectUnloadEventConfiguration);
  const history = useHistory();

  return !unloadEventconfiguration.enabled ? (
    <Button
      onClick={() => registerUnloadEvent(undefined, 'Vuoi uscire dal flusso attuale?')}
      variant="contained"
    >
      StartUnloadEventInterceptor
    </Button>
  ) : (
    <>
      <Button onClick={() => unregisterUnloadEvent()} variant="contained">
        EndUnloadEventInterceptor
      </Button>
      <Button
        onClick={() => history.push(history.location.pathname + 'subpath/')}
        variant="outlined"
      >
        pushRoute
      </Button>
    </>
  );
}
