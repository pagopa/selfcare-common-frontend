import * as React from 'react';
import { Typography, Box, Button, Grid, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

type Props = {
  /** If this component should be displayed or not */
  open: boolean;
  /** The title to show in the popup */
  title: string;
  /** The body to show in the popup */
  message: React.ReactNode;
  /** If defined, it will render a confirm button using this function as behavior */
  onConfirm?: React.MouseEventHandler<HTMLButtonElement> | undefined;
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
};

/** Selfcare's popup */
export default function SessionModal({
  open,
  title,
  message,
  onConfirm,
  onConfirmLabel = 'Riprova',
  handleClose,
  handleExit = handleClose,
  onCloseLabel = 'Annulla',
  height,
  minHeight,
  width = '21.9em',
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
      <Grid container direction="column" sx={{ height, minHeight, width }}>
        <Box mx={3} sx={{ height: '100%' }}>
          <Grid container item mt={4}>
            <Grid item xs={10}>
              <IconButton
                onClick={handleExit}
                style={{ position: 'absolute', top: '20px', right: '16px', zIndex: 100 }}
              >
                <ClearOutlinedIcon />
              </IconButton>
              <Typography variant="h5" sx={{ fontSize: '18px', fontWeight: '600' }}>
                {title}
              </Typography>
            </Grid>
          </Grid>

          <Grid container item>
            <Grid item xs={12} my={3}>
              <Typography component="div" variant="body2">
                {message}
              </Typography>
            </Grid>
          </Grid>

          {onConfirm && (
            <Grid item xs={12} mb={2}>
              <Button
                sx={{ width: '100%' }}
                color="primary"
                variant="contained"
                onClick={onConfirm}
              >
                {onConfirmLabel}
              </Button>
            </Grid>
          )}

          <Grid item xs={12} mb={3} mt={0}>
            <Button onClick={handleClose} sx={{ width: '100%' }} color="primary" variant="outlined">
              {onCloseLabel}
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Dialog>
  );
}
