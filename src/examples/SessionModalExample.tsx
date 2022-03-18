import { Button } from '@mui/material';
import { Fragment, useState } from 'react';
import { SessionModal } from '../lib';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} variant="contained">
        Open session modal
      </Button>
      <SessionModal
        open={open}
        title="Session Modal Example"
        message="Body example"
        handleClose={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          setTimeout(() => setOpen(true), 1000);
        }}
      />
    </Fragment>
  );
};
