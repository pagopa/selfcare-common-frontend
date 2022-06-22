import React, { CSSProperties, Fragment } from 'react';
import { Alert, Grid, SvgIcon, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import ConfirmIcon from './icons/ConfirmIcon';

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
  message: React.ReactNode;
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
  logo = ConfirmIcon,
  leftBorderColor = '#6CC66A',
  width = '376px',
  wrapped = false,
  bottom = '64px',
  right = '64px',
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
          }}
        >
          <Grid container>
            <Grid item xs={2}>
              <SvgIcon
                component={logo}
                viewBox="0 0 80 24"
                sx={{ width: '80px', height: '37px', marginLeft: '13px' }}
              />
            </Grid>
            <Grid item xs={8}>
              <Typography pt={1} pb={1} sx={{ fontSize: '15px !important', fontWeight: '600' }}>
                {title}
              </Typography>
              <Typography component="div">{message}</Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={onCloseToast}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </CustomAlert>
      )}
    </Fragment>
  );
}
