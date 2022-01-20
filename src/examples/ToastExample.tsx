import { Button } from '@mui/material';
import { Fragment, useState } from 'react';
import { Toast } from '../lib';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} variant="contained">
        Open toast
      </Button>
      <Toast
        open={open}
        title="Session Modal Example"
        message="Body example"
        onCloseToast={() => setOpen(false)}
      />
    </Fragment>
  );
};
