import { SupervisedUserCircle } from '@mui/icons-material';
import { Box, Button, Grid } from '@mui/material';
import { useState } from 'react';
import AnalyticsExample from './examples/AnalyticsExample';
import CustomAlertExample from './examples/CustomAlertExample';
import CustomAvatarExample from './examples/CustomAvatarExample';
import CustomPaginationExample from './examples/CustomPaginationExample';
import FilterModalExample from './examples/FilterModalExample';
import FooterExample from './examples/FooterExample';
import HeaderExample from './examples/HeaderExample';
import SessionModalExample from './examples/SessionModalExample';
import ToastExample from './examples/ToastExample';
import TranslationTextExample from './examples/TranslationTextExample';
import UseErrorDispatcherExample from './examples/UseErrorDispatcherExample';
import UseLoadingExample from './examples/UseLoadingExample';
import UseUnloadEventInterceptorExample from './examples/UseUnloadEventInterceptorExample';
import UseUserNotifyExample from './examples/UseUserNotifyExample';
import { NavigationBar, TitleBox } from './lib';
import ErrorBoundary from './lib/components/ErrorBoundary/ErrorBoundary';
import LoadingOverlay from './lib/components/Loading/LoadingOverlay';
import UnloadEventHandler from './lib/components/UnloadEventHandler';
import UserNotifyHandle from './lib/components/UserNotifyHandle';
import './lib/consentManagementConfigure';
import withLogin from './lib/decorators/withLogin';
import { useUnloadEventOnExit } from './lib/hooks/useUnloadEventInterceptor';

const AppExample = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const onExit = useUnloadEventOnExit();
  return (
    <ErrorBoundary minHeight="100vh" assistanceEmail="assistenza@selfcare.it">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <HeaderExample isLoggedIn={isLoggedIn} onExit={onExit} />
        <UserNotifyHandle />
        <LoadingOverlay />
        <UnloadEventHandler />
        <NavigationBar
          showBackComponent={false}
          // eslint-disable-next-line no-console
          goBack={() => console.log('Go back')}
          paths={[
            {
              icon: SupervisedUserCircle,
              description: 'Link1',
              onClick: () => {},
            },
            {
              description: 'Link managed with the introduction of dots at the end of text ______',
            },
          ]}
        />
        <TitleBox title="Title example" subTitle="Subtitle example" />

        <Grid container direction="row">
          <CustomAvatarExample />

          <Grid item xs={6}>
            <CustomPaginationExample />
          </Grid>
        </Grid>

        <Grid container direction="row" flexGrow={1} spacing={1} mt={1}>
          <Grid item xs={2}>
            <Button
              variant={!isLoggedIn ? 'contained' : 'outlined'}
              size="small"
              onClick={() => {
                setIsLoggedIn(!isLoggedIn);
              }}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </Grid>
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
          <Grid item xs={2}>
            <TranslationTextExample />
          </Grid>
        </Grid>
        <Grid>
          <CustomAlertExample />
        </Grid>
        <FooterExample isLoggedIn={isLoggedIn} />
      </Box>
    </ErrorBoundary>
  );
};

export default withLogin(AppExample);
