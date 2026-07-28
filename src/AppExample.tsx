import { SupervisedUserCircle } from '@mui/icons-material';
import { Box, Button, Container, Paper, Stack, Typography } from '@mui/material';
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

// Small helper so every demo block looks the same:
// a labeled card with consistent padding.
const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <Paper variant="outlined" sx={{ p: 2 }}>
    <Typography variant="overline" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
      {title}
    </Typography>
    <Box>{children}</Box>
  </Paper>
);

const AppExample = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const onExit = useUnloadEventOnExit();

  return (
    <ErrorBoundary minHeight="100vh" assistanceEmail="assistenza@selfcare.it">
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
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

        <Container maxWidth="lg" sx={{ flexGrow: 1, py: 3 }}>
          <Stack spacing={3}>
            {/* Auth toggle — kept out of a card since it drives the rest of the page */}
            <Box>
              <Button
                variant={!isLoggedIn ? 'contained' : 'outlined'}
                size="small"
                onClick={() => setIsLoggedIn(!isLoggedIn)}
              >
                {isLoggedIn ? 'Logout' : 'Login'}
              </Button>
            </Box>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Section title="Avatar">
                  <CustomAvatarExample />
                </Section>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Section title="Pagination">
                  <CustomPaginationExample />
                </Section>
              </Box>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} flexWrap="wrap" useFlexGap>
              <Section title="Loading">
                <UseLoadingExample />
              </Section>
              <Section title="Filter modal">
                <FilterModalExample />
              </Section>
              <Section title="Session modal">
                <SessionModalExample />
              </Section>
              <Section title="Toast">
                <ToastExample />
              </Section>
            </Stack>

            <Section title="Error dispatcher">
              <UseErrorDispatcherExample />
            </Section>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Section title="User notify">
                  <UseUserNotifyExample />
                </Section>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Section title="Unload event interceptor">
                  <UseUnloadEventInterceptorExample />
                </Section>
              </Box>
            </Stack>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Box sx={{ flex: 1 }}>
                <Section title="Analytics">
                  <AnalyticsExample />
                </Section>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Section title="Translation text">
                  <TranslationTextExample />
                </Section>
              </Box>
            </Stack>

            <Section title="Custom alert">
              <CustomAlertExample />
            </Section>
          </Stack>
        </Container>

        <FooterExample isLoggedIn={isLoggedIn} />
      </Box>
    </ErrorBoundary>
  );
};

export default withLogin(AppExample);