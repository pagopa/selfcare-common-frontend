import { Button } from '@mui/material';
import { Fragment, useState } from 'react';
import { SessionModal } from '../lib';

export default () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalWithEnvironments, setOpenModalWithEnvironments] = useState(false);
  const [openModalWithNoCloseButton, setOpenModalWithNoCloseButton] = useState(false);

  const backOfficeEnvironmentConfigurationsExample: Array<{
    environment: string;
    url: string;
  }> = [
    {
      environment: 'test1',
      url: 'www.test1.com',
    },
    {
      environment: 'test2',
      url: 'www.test2.com',
    },
  ];

  return (
    <Fragment>
      <Button sx={{ height: 'auto' }} onClick={() => setOpenModal(true)} variant="contained">
        Open session modal
      </Button>
      <SessionModal
        open={openModal}
        title="Session Modal Example"
        message="Body example"
        handleClose={() => setOpenModal(false)}
        onConfirm={() => {
          setOpenModal(false);
          setTimeout(() => setOpenModal(true), 1000);
        }}
      />

      <Button
        onClick={() => setOpenModalWithEnvironments(true)}
        variant="contained"
        sx={{ marginTop: 1, height: 'auto' }}
      >
        Open session modal with environment buttons
      </Button>
      <SessionModal
        open={openModalWithEnvironments}
        title="Session Modal Example"
        message="Body example"
        handleClose={() => {
          setOpenModalWithEnvironments(false);
        }}
        onConfirm={() => {
          setOpenModalWithEnvironments(false);
          setTimeout(() => setOpenModalWithEnvironments(true), 1000);
        }}
        productEnvironments={backOfficeEnvironmentConfigurationsExample}
      />

      <Button
        onClick={() => setOpenModalWithNoCloseButton(true)}
        variant="contained"
        sx={{ marginTop: 1, height: 'auto' }}
      >
        Open blocking session modal with no close button
      </Button>
      <SessionModal
        open={openModalWithNoCloseButton}
        title="Session Modal Example"
        message="Body example"
        handleClose={() => {}}
        onConfirm={() => {
          setOpenModalWithNoCloseButton(false);
        }}
        showCloseButton={false}
      />
    </Fragment>
  );
};
