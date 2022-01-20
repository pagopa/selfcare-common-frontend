import React, { Fragment } from 'react';
import { Alert, Grid, SvgIcon, Typography, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { ReactComponent as confirmLogo } from '../assets/confirmUserUpdate.svg';

type Props = {
  /** If this component should be displayed or not */
  open: boolean;
  /** The logo to be rendered. As default a confirm logo will be used */
  logo?: React.ElementType;
  /** The logo to be rendered. As default a confirm logo will be used */
  leftBorderColor?: string;
  /** The toast title */
  title: string;
  /** The toast body */
  message: React.ReactNode;
  /** The function to be invoked when closing the toast */
  onCloseToast: () => void;
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
  logo = confirmLogo,
  leftBorderColor = '#00CF86',
}: Props) {
  return (
    <Fragment>
      {open && (
        <CustomAlert
          className="userToast"
          variant="outlined"
          sx={{
            position: 'fixed',
            bottom: '64px',
            right: '64px',
            zIndex: 100,
            width: '376px',
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
              <Typography pt={1} pb={1} sx={{ fontSize: '15px', fontWeight: '600' }}>
                {title}
              </Typography>
              <Typography>{message}</Typography>
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
