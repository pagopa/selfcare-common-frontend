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
import { TFunction, Trans } from 'react-i18next';
import i18n from '../lib/locale/locale-utils';
// import { SessionModal } from '../lib';

type Props = {
  t: TFunction<'translation', undefined>;
};
export default function TranslationTextExample({ t }: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // local use of Hook
  // const { t, i18n } = useTranslation();
  const obj = { name: 'Jon', surname: 'Smith' };
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
            <Box>{t('description.part1')}</Box>
            <Box>
              {t('key', {
                what: 'prima parte',
                how: 'seconda parte',
              })}
            </Box>
            -{/* with bold */}
            <Box>
              {t('key', {
                what: 'prima parte ',
                e: '',
                how: '',
              })}
              <strong>
                {t('key', {
                  what: '',
                  e: 'e',
                  how: 'seconda parte bold',
                })}
              </strong>
            </Box>
            {/* <Box> // non funziona
              {t('key', {
                what: 'prima parte',
                how: (
                  <>
                    <strong>test</strong>
                  </>
                ),
              })}
            </Box> */}
            <Box>
              <Trans i18nKey="key2">
                {/* xx: is the default text */}
                xx <strong>{{ author: `${obj.name} ${obj.surname}` }}</strong>
              </Trans>
            </Box>
            <Box>{t('nesting1')}</Box>
            {/* joinArray concatena gli elementi dell'arrai con quanto definito dopo, in questo caso uno sapzio. joinArrays: ',' inserisce una virgola */}
            <Box>{t('arrayJoinWithInterpolation', { myVar: 'interpolate', joinArrays: ' ' })}</Box>
            <Box>
              {t('arrayOfObjects.0.name')}
              <strong>{t('arrayOfObjects.1.name')}</strong>
            </Box>
            <Button onClick={() => i18n.changeLanguage(i18n.language === 'it' ? 'en' : 'it')}>
              {i18n.language}
            </Button>
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
