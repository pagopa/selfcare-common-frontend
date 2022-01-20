import { Grid } from '@mui/material';
import { Fragment } from 'react';
import { CustomAvatar } from '../lib';

export default () => (
  <Fragment>
    <Grid item xs={3}>
      <Grid container direction="row">
        <CustomAvatar /> Organization with no logo
      </Grid>
    </Grid>
    <Grid item xs={3}>
      <Grid container direction="row">
        <CustomAvatar customSrc="https://dev.selfcare.pagopa.it/auth/icons/icon-384x384.png" />
        Organization with a logo
      </Grid>
    </Grid>
  </Fragment>
);
