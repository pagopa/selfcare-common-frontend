import { MutableRefObject, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SessionModal, Toast } from '..';
import { UserNotify } from '../model/UserNotify';
import { appStateActions, appStateSelectors } from '../redux/slices/appStateSlice';
import ToastWrapper from './ToastWrapper';

/** This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to dispatch User Notifies in order to display a pop up or a toast notification.

To use this feature you have to put UserNotifyHandle in your App as a child of a redux Provider component.
In order to dispatch a User Notify, you have to use the custom hook useUserNotify which will return a fuction to be used to dispatch the User Notify. */
function UserNotifyHandle() {
  const dispatch = useDispatch();
  const notifies = useSelector(appStateSelectors.selectNotifies);
  const lastNotifiesToast = useRef<Array<UserNotify>>([]);
  const lastNotifyModal = useRef<UserNotify>();

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

  const { openModal, openToast } = updateCurrents(
    lastNotifyModal,
    lastNotifiesToast,
    notifies,
    onClose
  );

  const notifyModal = lastNotifyModal.current;
  const notifiesToast = lastNotifiesToast.current;
  return (
    <>
      <ToastWrapper>
        {notifiesToast.map((n) => (
          <Toast
            key={n.id}
            wrapped={true}
            open={openToast}
            title={n.title}
            message={n.message}
            logo={n.logo}
            leftBorderColor={n.leftBorderColor}
            onCloseToast={() => onClose(n)}
            width={n.width}
          />
        ))}
      </ToastWrapper>
      <SessionModal
        open={openModal}
        title={notifyModal?.title ?? 'Notify Title'}
        message={notifyModal?.message}
        onConfirm={notifyModal?.onConfirm ? () => onConfirm(notifyModal as UserNotify) : undefined}
        onConfirmLabel={notifyModal?.confirmLabel}
        handleClose={() => onClose(notifyModal as UserNotify)}
        onCloseLabel={notifyModal?.closeLabel}
        width={notifyModal?.width}
      />
    </>
  );
}

export default UserNotifyHandle;

function updateCurrents(
  lastNotifyModalRef: MutableRefObject<UserNotify | undefined>,
  lastNotifiesToastRef: MutableRefObject<Array<UserNotify>>,
  notifies: Array<UserNotify>,
  onClose: (notify: UserNotify) => void
) {
  const lastNotifiesToast = notifies.filter((e) => e.component === 'Toast');
  const lastNotifySessionModal = notifies.find((e) => e.component === 'SessionModal');

  const openToast: boolean = lastNotifiesToast.length > 0;
  const openModal: boolean = !!lastNotifySessionModal;

  if (lastNotifySessionModal && lastNotifySessionModal !== lastNotifyModalRef?.current) {
    // eslint-disable-next-line functional/immutable-data
    lastNotifyModalRef.current = lastNotifySessionModal;
  }
  if (openToast) {
    // eslint-disable-next-line functional/immutable-data
    lastNotifiesToastRef.current = lastNotifiesToast;

    lastNotifiesToast.forEach((n) => {
      if (n.autoclosable === 'timer') {
        setTimeout(() => onClose(n), n.autocloseMilliseconds);
      }
    });
  }
  return {
    openToast,
    openModal,
  };
}
