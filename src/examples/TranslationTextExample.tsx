import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
// import { SessionModal } from '../lib';

export default function TranslationTextExample() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();
  return (
    <>
      <Button onClick={handleClickOpen} variant="contained">
        {t('session modal button')}
      </Button>
      {/* <SessionModal
        open={open}
        title={t('labelTitle')}
        message="Body example"
        handleClose={() => setOpen(false)}
        onConfirm={() => {
          setOpen(false);
          setTimeout(() => setOpen(true), 1000);
        }}
      /> */}

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('labelTitle')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Box>
              Test Descrizione con <strong>{t('boldDescriptionText')}</strong>
            </Box>
            <Box>{t('boldDescriptionTwo')}</Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
