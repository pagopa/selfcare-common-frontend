import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { CONFIG } from '../../config/env';
// import PagoPaMiniIcon from '../icons/PagoPaMiniIcon';
import SubHeader from './subHeader/SubHeader';

type HeaderProps = {
  /** if true, it will render an other toolbar under the Header */
  withSecondHeader: boolean;
  /** The function to be invoked when pressing the rendered logout button, if not defined it will redirect to the logout page, if setted to null it will no render the logout button. It's possible to modify the logout path changing the value in CONFIG.logout inside the index.tsx file */
  onExitAction?: (() => void) | null;
  /** If withSecondHeader is true, this component will be rendered at the end of the secondary toolbar */
  subHeaderChild?: React.ReactNode;
};

/** SelfCare Header component */
const Header = ({
  withSecondHeader,
  onExitAction = () => window.location.assign(CONFIG.URL_FE.LOGOUT),
  subHeaderChild,
}: HeaderProps) => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <AppBar
        position="relative"
        sx={{
          alignItems: 'center',
          height: '48px',
          backgroundColor: 'white',
          boxShadow: 'none',
        }}
      >
        <Toolbar sx={{ width: { xs: '100%', lg: '90%', minHeight: '48px !important' } }}>
          {/* <PagoPaMiniIcon viewBox="0 0 80 22" sx={{ width: '80px' }} /> */}
          <Typography sx={{ fontSize: '14px !important', fontWeight: '700' }}>
            PagoPA S.p.A
          </Typography>
          {onExitAction !== null ? (
            <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
              <Button
                variant="outlined"
                sx={{
                  width: '88px',
                  color: '#0073E6',
                  height: '32px',
                  border: 'none',
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: 'transparent', border: 'none' },
                }}
                onClick={onExitAction}
              >
                <Typography sx={{ fontSize: '14px', fontWeight: '700', color: '#0073E6' }}>
                  {t('common.header.exitButton')}
                </Typography>
              </Button>
            </Box>
          ) : (
            ''
          )}
        </Toolbar>
      </AppBar>
      {withSecondHeader === true ? <SubHeader>{subHeaderChild}</SubHeader> : ''}
    </Fragment>
  );
};

export default Header;
