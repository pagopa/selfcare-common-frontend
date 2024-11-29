import React, { CSSProperties, Fragment } from 'react';
import { Alert, Grid, Typography, IconButton, SvgIcon } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

type Props = {
  /** If this component should be displayed or not */
  open: boolean;
  /** The logo to be rendered. As default a confirm logo will be used */
  logo?: React.ElementType;
  /** The color used for the left border */
  leftBorderColor?: string;
  /** The toast title */
  title: string;
  /** The toast body */
  message?: React.ReactNode;
  /** The function to be invoked when closing the toast */
  onCloseToast: () => void;
  /** The toast width */
  width?: string | undefined;
  /** If true, it will not position itself as fixed */
  wrapped?: boolean;
  /** If not wrapped, the pixel from the bottom of the viewport where to place the toast. Default "64px" */
  bottom?: string;
  /** If not wrapped, the pixel from the right side of the viewport where to place the toast. Default "64px" */
  right?: string;
  /** If true show toast close icon */
  showToastCloseIcon?: boolean;
  /** set the color of icon */
  toastColorIcon?: string;
};

const CustomAlert = styled(Alert)({
  '.MuiAlert-icon': { display: 'none' },
});

/** Selfcare's toast */
export default function Toast({
  open,
  title,
  message,
  onCloseToast,
  logo = CheckCircleOutlineIcon,
  leftBorderColor = '#6CC66A',
  width = '376px',
  wrapped = false,
  bottom = '64px',
  right = '64px',
  showToastCloseIcon = false,
  toastColorIcon = '#6CC66A',
}: Props) {
  const positionStyle: CSSProperties = !wrapped
    ? { position: 'fixed', bottom, right, zIndex: 500 }
    : { marginTop: 2 };

  return (
    <Fragment>
      {open && (
        <CustomAlert
          className="userToast"
          variant="outlined"
          sx={{
            ...positionStyle,
            width: { width },
            backgroundColor: 'white',
            borderLeft: `4px solid ${leftBorderColor} !important`,
            borderRadius: '5px',
            boxShadow: '0px 0px 45px rgba(0, 0, 0, 0.1) ',
            border: 'none',
            padding: '16px',
          }}
        >
          <Grid container>
            <Grid item xs={1} display="flex" alignItems="center" justifyContent="center" mr={2}>
              <SvgIcon
                fontSize="small"
                component={logo}
                sx={{ color: toastColorIcon, width: '140px' }}
              />
            </Grid>
            <Grid
              container
              item
              xs={showToastCloseIcon ? 9 : 10}
              display="flex"
              justifyContent="center"
              direction="column"
            >
              <Typography sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightMedium' }}>
                {title}
              </Typography>
              {message && <Typography sx={{ fontSize: 'fontSize' }}>{message}</Typography>}
            </Grid>
            {showToastCloseIcon && (
              <Grid item xs={1}>
                <IconButton onClick={onCloseToast}>
                  <CloseIcon sx={{ fontSize: 'big' }} />
                </IconButton>
              </Grid>
            )}
          </Grid>
        </CustomAlert>
      )}
    </Fragment>
  );
}
