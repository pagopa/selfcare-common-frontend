import { Button } from '@mui/material';
import useUserNotify from '../lib/hooks/useUserNotify';

export default () => {
  const addNotify = useUserNotify();

  const testUserNotify = () => {
    addNotify({
      id: 'NOTIFY_EXAMPLE',
      title: 'A NOTIFY',
      message: 'YOU GENERATE A NOTIFY',
    });
  };

  return (
    <div>
      <Button onClick={() => testUserNotify()} variant="contained">
        Generating a notify
      </Button>
    </div>
  );
};
