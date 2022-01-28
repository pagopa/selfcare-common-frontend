import { Button } from '@mui/material';
import useUserNotify from '../lib/hooks/useUserNotify';

export default () => {
  const addNotify = useUserNotify();

  const testUserNotifyToast = () => {
    addNotify({
      component: 'Toast',
      id: 'NOTIFY_EXAMPLE',
      title: 'A USER NOTIFY',
      message: 'NOTIFY THROUGH TOAST!',
    });
  };

  const testUserNotifyModal = () => {
    addNotify({
      component: 'SessionModal',
      id: 'Notify_Example',
      title: 'A USER NOTIFY',
      message: 'NOTIFY THROUGH SESSION MODAL!',
      confirmLabel: 'Conferma',
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
