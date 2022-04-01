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
        height: '107px',
        backgroundColor: 'white',
        boxShadow: 'none',
        borderTop: '1px solid #F2F2F2',
        borderBottom: '1px solid #F2F2F2',
      }}
    >
      <Toolbar sx={{ width: { xs: '100%', lg: '90%' }, minHeight: '107px !important' }}>
        <Grid container>
          <Grid container item direction="column" xs={6}>
            <Grid item>
              <Typography
                component="div"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '24px',
                  lineHeight: '36px',
                  textAlign: 'left',
                  color: '#17324D',
                }}
              >
                Self Care
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                component="div"
                sx={{
                  fontWeight: 'normal',
                  fontSize: '14px',
                  lineHeight: '24px',
                  textAlign: 'left',
                  color: '#17324D',
                }}
              >
                Gestisci i tuoi prodotti e servizi PagoPA
              </Typography>
            </Grid>
          </Grid>
          {children}
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
