import { MutableRefObject, useRef } from 'react';
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
  const lastNotifyToast = useRef<UserNotify>();
  const lastNotifyModal = useRef<UserNotify>();

  const { openModal, openToast } = updateCurrents(lastNotifyModal, lastNotifyToast, notifies);

  const notifyModal = lastNotifyModal.current;
  const notifyToast = lastNotifyToast.current;

  const onClose = (notify: UserNotify) => {
    dispatch(appStateActions.removeNotify(notify as UserNotify));
    if (notify?.onClose) {
      notify.onClose();
    }
  };
  const onConfirm = (notify: UserNotify) => {
    dispatch(appStateActions.removeNotify(notify as UserNotify));
    if (notify?.onConfirm) {
      notify.onConfirm();
    }
  };

  return (
    <>
      <Toast
        open={openToast}
        title={notifyToast?.title ?? 'Notify Title'}
        message={notifyToast?.message}
        logo={notifyToast?.logo}
        leftBorderColor={notifyToast?.leftBorderColor}
        onCloseToast={() => onClose(notifyToast as UserNotify)}
      />
      <SessionModal
        open={openModal}
        title={notifyModal?.title ?? 'Notify Title'}
        message={notifyModal?.message}
        onConfirm={() => onConfirm(notifyModal as UserNotify)}
        onConfirmLabel={notifyModal?.confirmLabel}
        handleClose={() => onClose(notifyModal as UserNotify)}
        onCloseLabel={notifyModal?.closeLabel}
      />
    </>
  );
}

export default UserNotifyHandle;

function updateCurrents(
  lastNotifyModalRef: MutableRefObject<UserNotify | undefined>,
  lastNotifyToastRef: MutableRefObject<UserNotify | undefined>,
  notifies: Array<UserNotify>
) {
  const lastNotifyToast = notifies.find((e) => e.component === 'Toast');
  const lastNotifySessionModal = notifies.find((e) => e.component === 'SessionModal');

  const openToast: boolean = !!lastNotifyToast;
  const openModal: boolean = !!lastNotifySessionModal;

  if (lastNotifySessionModal && lastNotifySessionModal !== lastNotifyModalRef?.current) {
    // eslint-disable-next-line functional/immutable-data
    lastNotifyModalRef.current = lastNotifySessionModal;
  }
  if (lastNotifyToast && lastNotifyToast !== lastNotifyToastRef?.current) {
    // eslint-disable-next-line functional/immutable-data
    lastNotifyToastRef.current = lastNotifyToast;
  }
  return {
    openToast,
    openModal,
  };
}
