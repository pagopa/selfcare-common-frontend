import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useUnloadEventInterceptor } from '../hooks/useUnloadEventInterceptor';
import i18n from '../locale/locale-utils';
import { appStateActions, appStateSelectors } from '../redux/slices/appStateSlice';
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
    dispatch(appStateActions.closeUnloadEventNotify(undefined));
  };
  const onConfirm = () => {
    unregisterUnloadEvent();
    if (unloadEventconfiguration.exitAction) {
      unloadEventconfiguration.exitAction();
    }
  };
  const { t } = useTranslation();
  return (
    <SessionModal
      open={unloadEventconfiguration.enabled && unloadEventconfiguration.open}
      title={unloadEventconfiguration.title ?? t('common.unloadEventHandler.title')}
      message={unloadEventconfiguration.description ?? t('common.unloadEventHandler.message')}
      onConfirm={onConfirm}
      onConfirmLabel={t('common.unloadEventHandler.confirmLabel')}
      handleClose={onClose}
      t={i18n.t}
    />
  );
}
