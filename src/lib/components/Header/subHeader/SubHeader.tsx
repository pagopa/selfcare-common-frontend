import React from 'react';
import { AppBar, Grid, Toolbar, Typography } from '@mui/material';

type Props = {
  children?: React.ReactNode;
};

export default function SubHeader({ children }: Props) {
  return (
    <AppBar
      position="relative"
      sx={{
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: 'none',
        borderTop: '1px solid #F2F2F2',
        borderBottom: '1px solid #F2F2F2',
      }}
    >
      <Toolbar sx={{ width: { xs: '100%', lg: '90%' }, minHeight: '80px !important' }}>
        <Grid container>
          <Grid container item direction="column" xs={6}>
            <Grid item>
              <Typography
                component="div"
                sx={{
                  fontSize: '28px !important',
                  fontWeight: '700 !important',
                  lineHeight: '36px',
                  textAlign: 'left',
                  color: '#17324D',
                }}
              >
                Area riservata
              </Typography>
            </Grid>
          </Grid>
          {children}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
