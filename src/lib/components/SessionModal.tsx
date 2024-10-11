import * as React from 'react';
import { Typography, Box, Button, Grid, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { withTranslation } from 'react-i18next';
import { TFunction } from 'i18next';

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
  /** Introduced to manage the presence of test environments in the products, if defined, it will render as many buttons as there are test environments for the product */
  productEnvironments?: Array<{
    environment: string;
    url: string;
  }>;
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
  showCloseIcon?: boolean;
  /** If false not show the close button, default true */
  showCloseButton?: boolean;
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
  productEnvironments,
  handleClose,
  handleExit = handleClose,
  onCloseLabel = t('common.sessionModal.closeButton'),
  height,
  minHeight,
  width = '100%',
  showCloseIcon = false,
  showCloseButton = true,
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
      <Grid container sx={{ height, minHeight, width, maxWidth: '100%' }} px={4}>
        <Grid item xs={12} mt={4}>
          {showCloseIcon && (
            <IconButton
              onClick={handleExit}
              style={{ position: 'absolute', top: '20px', right: '16px', zIndex: 100 }}
            >
              <ClearOutlinedIcon />
            </IconButton>
          )}
          <Typography sx={{ fontSize: '24px', fontWeight: '700', wordBreak: 'break-word' }}>
            {title}
          </Typography>
        </Grid>

        <Box width="100%">
          <Grid item xs={12} mt={2} mb={3}>
            <Typography variant="body1">{message as string}</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            display="flex"
            justifyContent={productEnvironments ? 'space-between' : 'flex-end'}
            flexWrap={'wrap-reverse'}
          >
            {showCloseButton && (
              <Box mb={3} mt={0}>
                <Button onClick={handleClose} color="primary" variant="outlined">
                  {onCloseLabel}
                </Button>
              </Box>
            )}
            {onConfirm && (
              <Box mb={3} display="flex" flexDirection="row-reverse">
                <Button
                  sx={{ marginLeft: 2 }}
                  color="primary"
                  variant="contained"
                  onClick={onConfirm}
                  disabled={!onConfirmEnabled}
                >
                  {onConfirmLabel}
                </Button>
                {productEnvironments &&
                  productEnvironments.map((p) => (
                    <Box ml={2} key={p.environment}>
                      <Button
                        value={p.environment}
                        color="primary"
                        variant="contained"
                        onClick={onConfirm}
                      >
                        {p.environment
                          .toLowerCase()
                          .replace(/\b[a-z]/g, p.environment.charAt(0).toUpperCase())}
                      </Button>
                    </Box>
                  ))}
              </Box>
            )}
          </Grid>
        </Box>
      </Grid>
    </Dialog>
  );
}
export default withTranslation()(SessionModal);
