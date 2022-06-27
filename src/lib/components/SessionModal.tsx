import * as React from 'react';
import { Typography, Box, Button, Grid, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { TFunction, withTranslation } from 'react-i18next';

type Props = {
  /** If this component should be displayed or not */
  open: boolean;
  /** The title to show in the popup */
  title: string;
  /** The body to show in the popup */
  message: React.ReactNode;
  /** If defined, it will render a confirm button using this function as behavior */
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  /** If the confirm button should be enabled. Default true */
  onConfirmEnabled?: boolean;
  /** The confirm label text */
  onConfirmLabel?: string;
  /** The function invoked when clicking on close button or in the showed X icon */
  handleClose: React.MouseEventHandler<HTMLButtonElement> | undefined;
  /** If defined, it allow to set a different behavior when clicking on X icon */
  handleExit?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  /** Close button text */
  onCloseLabel?: string;
  /** The popup height */
  height?: string;
  /** The popup minHeight */
  minHeight?: string;
  /** The popup width */
  width?: string;
  t: TFunction<'translation', undefined>;
  /** If true show modal close icon */
  showModalCloseIcon?: boolean;
};

/** Selfcare's popup */
function SessionModal({
  t,
  open,
  title,
  message,
  onConfirm,
  onConfirmEnabled = true,
  onConfirmLabel = t('common.sessionModal.confirmButton'),
  handleClose,
  handleExit = handleClose,
  onCloseLabel = t('common.sessionModal.closeButton'),
  height,
  minHeight,
  width = '33.3em',
  showModalCloseIcon = true,
}: Props) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <Grid container sx={{ height, minHeight, width }} px={4}>
        <Grid item xs={12} mt={4}>
          {showModalCloseIcon && (
            <IconButton
              onClick={handleExit}
              style={{ position: 'absolute', top: '20px', right: '16px', zIndex: 100 }}
            >
              <ClearOutlinedIcon />
            </IconButton>
          )}
          <Typography sx={{ fontSize: '24px', fontWeight: '600' }}>{title}</Typography>
        </Grid>

        <Box width="100%">
          <Grid item xs={12} my={3}>
            <Typography sx={{ fontSize: '18px', fontWeight: '400' }}>{message}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Box mb={3} mt={0}>
                <Button onClick={handleClose} color="primary" variant="outlined">
                  {onCloseLabel}
                </Button>
              </Box>
              {onConfirm && (
                <Box mb={3} ml={2}>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={onConfirm}
                    disabled={!onConfirmEnabled}
                  >
                    {onConfirmLabel}
                  </Button>
                </Box>
              )}
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Dialog>
  );
}
export default withTranslation()(SessionModal);
