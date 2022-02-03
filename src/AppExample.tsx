import { Box, Grid } from '@mui/material';
import CustomAvatarExample from './examples/CustomAvatarExample';
import CustomPaginationExample from './examples/CustomPaginationExample';
import FilterModalExample from './examples/FilterModalExample';
import SessionModalExample from './examples/SessionModalExample';
import ToastExample from './examples/ToastExample';
import UseErrorDispatcherExample from './examples/UseErrorDispatcherExample';
import UseLoadingExample from './examples/UseLoadingExample';
import UseUserNotifyExample from './examples/UseUserNotifyExample';
import UseUnloadEventInterceptorExample from './examples/UseUnloadEventInterceptorExample';
import { TitleBox } from './lib';
import ErrorBoundary from './lib/components/ErrorBoundary/ErrorBoundary';
import Footer from './lib/components/Footer/Footer';
import Header from './lib/components/Header/Header';
import LoadingOverlay from './lib/components/Loading/LoadingOverlay';
import UnloadEventHandler from './lib/components/UnloadEventHandler';
import UserNotifyHandle from './lib/components/UserNotifyHandle';
import withLogin from './lib/decorators/withLogin';
import { useUnloadEventLogout, useUnloadEventOnExit } from './lib/hooks/useUnloadEventInterceptor';
import AnalyticsExample from './examples/AnalyticsExample';

const AppExample = () => {
  const onLogout = useUnloadEventLogout();
  const onExit = useUnloadEventOnExit();
  return (
    <ErrorBoundary assistanceEmail="assistenza@selfcare.it">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <Header withSecondHeader={false} onExitAction={onLogout} />
        <UserNotifyHandle />
        <LoadingOverlay />
        <UnloadEventHandler />

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

          <Grid item xs={3}>
            <UseUnloadEventInterceptorExample />
          </Grid>

          <Grid item xs={2}>
            <AnalyticsExample />
          </Grid>
        </Grid>
        <Footer assistanceEmail="assistenza@selfcare.it" onExit={onExit} />
      </Box>
    </ErrorBoundary>
  );
};

export default withLogin(AppExample);
