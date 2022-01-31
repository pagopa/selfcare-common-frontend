import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SessionModal, Toast } from '..';
import { UserNotify } from '../model/UserNotify';
import { appStateActions, appStateSelectors } from '../redux/slices/appStateSlice';

/** This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to dispatch User Notifies in order to display a pop up or a toast notification.

To use this feature you have to put UserNotifyHandle in your App as a child of a redux Provider component.
In order to dispatch a User Notify, you have to use the custom hook useUserNotify which will return a fuction to be used to dispatch the User Notify. */

function UserNotifyHandle() {
  const dispatch = useDispatch();
  const notifies = useSelector(appStateSelectors.selectNotifies);
  const lastNotify = useRef<UserNotify>();

  const hasNotify = notifies.length > 0;
  const openToast = hasNotify && notifies[0].component === 'Toast';
  const openModal = hasNotify && notifies[0].component === 'SessionModal';

  if (hasNotify && notifies[0] !== lastNotify.current) {
    // eslint-disable-next-line functional/immutable-data
    lastNotify.current = notifies[0];
  }
  const notify = lastNotify.current;

  const onClose = () => {
    dispatch(appStateActions.removeNotify(notify as UserNotify));
    if (notify?.onClose) {
      notify.onClose();
    }
  };
  const onConfirm = () => {
    dispatch(appStateActions.removeNotify(notify as UserNotify));
    if (notify?.onConfirm) {
      notify.onConfirm();
    }
  };

  return (
    <>
      <Toast
        open={openToast}
        title={notify?.title ?? 'Notify Title'}
        message={notify?.message}
        logo={notify?.logo}
        leftBorderColor={notify?.leftBorderColor}
        onCloseToast={onClose}
      />
      <SessionModal
        open={openModal}
        title={notify?.title ?? 'Notify Title'}
        message={notify?.message}
        onConfirm={onConfirm}
        onConfirmLabel={notify?.confirmLabel}
        handleClose={onClose}
        onCloseLabel={notify?.closeLabel}
      />
    </>
  );
}

export default UserNotifyHandle;
