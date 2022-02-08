import { useSelector, useDispatch } from 'react-redux';
import { useUnloadEventInterceptor } from '../hooks/useUnloadEventInterceptor';
import { appStateSelectors, appStateActions } from '../redux/slices/appStateSlice';
import SessionModal from './SessionModal';

/** This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to intercept when the user try to exit from the current page and ask him if he wants to continue or not.

To use this feature you have to put UnloadEventHandler in your App as a child of a redux Provider component.
In order to use this feature you have to use the custom hook useUnloadEventInterceptor.
@see {@link useUnloadEventInterceptor}
*/
export default function UnloadEventHandler() {
  const dispatch = useDispatch();
  const unloadEventconfiguration = useSelector(appStateSelectors.selectUnloadEventConfiguration);
  const { unregisterUnloadEvent } = useUnloadEventInterceptor();

  const onClose = () => {
    dispatch(appStateActions.closeUnloadEventNotify());
  };
  const onConfirm = () => {
    unregisterUnloadEvent();
    if (unloadEventconfiguration.exitAction) {
      unloadEventconfiguration.exitAction();
    }
  };
  return (
    <SessionModal
      open={unloadEventconfiguration.enabled && unloadEventconfiguration.open}
      title={unloadEventconfiguration.title ?? 'Vuoi davvero uscire?'}
      message={
        unloadEventconfiguration.description ?? 'Se esci, le modifiche apportate andranno perse.'
      }
      onConfirm={onConfirm}
      onConfirmLabel={'Esci'}
      handleClose={onClose}
    />
  );
}
