import { Button } from '@mui/material';
import useErrorDispatcher from '../lib/hooks/useErrorDispatcher';

export default () => {
  const addError = useErrorDispatcher();

  const testBlockingError = (notify: boolean) => {
    addError({
      id: 'BLOCKING_ERROR_EXAMPLE',
      error: new Error('PROVA'),
      techDescription: `blocking error example having notify ${notify}`,
      toNotify: notify,
      blocking: true,
    });
  };

  const testNotBlockingError = (notify: boolean) => {
    addError({
      id: 'NOT_BLOCKING_ERROR_EXAMPLE',
      error: new Error('PROVA'),
      techDescription: `not blocking error example having notify ${notify}`,
      displayableDescription: 'Example of message body',
      toNotify: notify,
      blocking: false,
      component: 'SessionModal',
      onRetry: () => {
        setTimeout(() => testNotBlockingError(notify), 1000);
      },
    });
  };

  const testToastError = (notify: boolean) => {
    addError({
      id: 'TOAST_NOTIFY_ERROR',
      error: new Error('PROVA'),
      techDescription: `blocking error example having toast notify ${notify}`,
      toNotify: notify,
      component: 'Toast',
      blocking: false,
    });
  };

  return (
    <div>
      <Button onClick={() => testBlockingError(true)} variant="contained">
        Test Blocking Error notified
      </Button>
      <Button onClick={() => testBlockingError(false)} variant="contained">
        Test Blocking Error not notified
      </Button>
      <Button onClick={() => testNotBlockingError(true)} variant="contained">
        Test NOT Blocking Error notified
      </Button>
      <Button onClick={() => testNotBlockingError(false)} variant="contained">
        Test NOT Blocking Error not notified
      </Button>

      <Button onClick={() => testToastError(true)} variant="contained">
        Test With Toast notification
      </Button>

      <Button
        onClick={() => {
          throw new Error('Dummy error');
        }}
        variant="contained"
      >
        Test throw exception
      </Button>
    </div>
  );
};
