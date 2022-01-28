import { Box, Grid } from '@mui/material';
import CustomAvatarExample from './examples/CustomAvatarExample';
import CustomPaginationExample from './examples/CustomPaginationExample';
import FilterModalExample from './examples/FilterModalExample';
import SessionModalExample from './examples/SessionModalExample';
import ToastExample from './examples/ToastExample';
import UseErrorDispatcherExample from './examples/UseErrorDispatcherExample';
import UseLoadingExample from './examples/UseLoadingExample';
import UseUserNotifyExample from './examples/UseUserNotifyExample';
import { TitleBox } from './lib';
import ErrorBoundary from './lib/components/ErrorBoundary/ErrorBoundary';
import Footer from './lib/components/Footer/Footer';
import Header from './lib/components/Header/Header';
import LoadingOverlay from './lib/components/Loading/LoadingOverlay';
import UserNotifyHandle from './lib/components/UserNotifyHandle';
import withLogin from './lib/decorators/withLogin';

const AppExample = () => (
  <ErrorBoundary assistanceEmail="assistenza@selfcare.it">
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <Header withSecondHeader={false} />
      <UserNotifyHandle />
      <LoadingOverlay />

      <TitleBox title="Title example" subTitle="Subtitle example" />

      <Grid container direction="row">
        <CustomAvatarExample />

        <Grid item xs={6}>
          <CustomPaginationExample />
        </Grid>
      </Grid>

      <Grid container direction="row" flexGrow={1} spacing={1} mt={1}>
        <Grid item xs={1}>
          <UseLoadingExample />
        </Grid>

        <Grid item xs={8}>
          <UseErrorDispatcherExample />
        </Grid>

        <Grid item xs={1}>
          <FilterModalExample />
        </Grid>

        <Grid item xs={1}>
          <SessionModalExample />
        </Grid>

        <Grid item xs={1}>
          <ToastExample />
        </Grid>

        <Grid item xs={4}>
          <UseUserNotifyExample />
        </Grid>
      </Grid>
      <Footer assistanceEmail="assistenza@selfcare.it" />
    </Box>
  </ErrorBoundary>
);

export default withLogin(AppExample);
