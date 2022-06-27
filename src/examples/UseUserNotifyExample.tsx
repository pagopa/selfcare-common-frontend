import { Button } from '@mui/material';
import { useRef } from 'react';
import useUserNotify from '../lib/hooks/useUserNotify';

export default () => {
  const addNotify = useUserNotify();
  const counter = useRef(0);

  const testUserNotifyToast = () => {
    // eslint-disable-next-line functional/immutable-data
    counter.current = counter.current + 1;
    addNotify({
      component: 'Toast',
      id: 'NOTIFY_EXAMPLE',
      title: 'A USER NOTIFY',
      message: `NOTIFY THROUGH TOAST! (${counter.current})`,
      showCloseIcon: true,
    });
  };

  const testUserNotifyModal = () => {
    addNotify({
      component: 'SessionModal',
      id: 'Notify_Example',
      title: 'A USER NOTIFY',
      message: 'NOTIFY THROUGH SESSION MODAL!',
      confirmLabel: 'Conferma',
      showCloseIcon: true,
    });
  };

  return (
    <>
      <div>
        <Button onClick={() => testUserNotifyToast()} variant="contained">
          User notify through Toast
        </Button>
        <Button onClick={() => testUserNotifyModal()} variant="contained">
          User notify through Session Modal
        </Button>
      </div>
    </>
  );
};
