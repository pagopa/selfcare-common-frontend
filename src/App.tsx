import { Box, Grid } from '@mui/material';
import ErrorBoundary from './lib/components/ErrorBoundary/ErrorBoundary';
import Footer from './lib/components/Footer/Footer';
import Header from './lib/components/Header/Header';
import { LoadingOverlay } from './lib/components/Loading/LoadingOverlay';
import withLogin from './lib/decorators/withLogin';

const App = () => (
  <ErrorBoundary assistanceEmail="assistenza@selfcare.it">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header withSecondHeader={false} />
      <Grid container direction="row" flexGrow={1}>
        <LoadingOverlay />
      </Grid>
      <Footer assistanceEmail="assistenza@selfcare.it" />
    </Box>
  </ErrorBoundary>
);

export default withLogin(App);
