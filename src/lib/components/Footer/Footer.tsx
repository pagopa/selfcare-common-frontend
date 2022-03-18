import { Box, Grid, Link, Typography } from '@mui/material';
import { Trans, useTranslation } from 'react-i18next';
import { buildAssistanceURI } from '../../services/assistanceService';
import PagoPaIcon from '../icons/PagoPaIcon';

type Props = {
  /** The email to which the assistance button will ask to send an email */
  assistanceEmail?: string;
  onExit?: (exitAction: () => void) => void;
};

/** SelfCare Footer component */
const Footer = ({ assistanceEmail, onExit = (exitAction) => exitAction() }: Props) => {
  const { t } = useTranslation();

  return (
    <Box
      component="footer"
      sx={{
        pt: '32px',
        height: '156px',
        mt: 'auto',
        bgcolor: '#01254C',
        alignItems: 'center',
        boxSizing: 'unset',
        position: 'relative',
      }}
    >
      <Grid container justifyContent={'center'} alignItems={'center'}>
        <Box sx={{ width: '90%', display: 'flex' }}>
          <PagoPaIcon viewBox="0 0 140 33" sx={{ width: '119px' }} />
          <Box sx={{ textAlign: 'right', flexGrow: 1 }} pl={8}>
            <Typography
              component="div"
              sx={{
                fontWeight: 'normal',
                fontSize: '15px',
                lineHeight: '22,82px',
                textAlign: 'left',
                color: 'background.default',
                paddingLeft: '0px',
              }}
            >
              <Trans i18nKey="common.footer.legalInfoText">
                PagoPA S.p.A. - società per azioni con socio unico - capitale sociale di euro
                1,000,000 interamente versato - sede legale in Roma, Piazza Colonna 370, CAP 00187 -
                <br />
                n. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009`
              </Trans>
            </Typography>
          </Box>
        </Box>
      </Grid>
      <Grid
        container
        alignItems={'center'}
        justifyContent={'center'}
        sx={{ position: 'absolute', bottom: '48px' }}
      >
        <Box sx={{ width: '90%', display: 'flex' }}>
          <Typography
            sx={{
              fontWeight: 'normal',
              fontSize: '15px',
              lineHeight: '15px',
              textAlign: 'left',
              padding: '0px',
            }}
            component="div"
          >
            <Link
              onClick={() =>
                onExit(() => window.location.assign('https://www.pagopa.it/it/privacy-policy/'))
              }
              underline="none"
              sx={{
                marginRight: '10px',
                color: '#9BB7CB !important',
                textDecoration: 'none !important',
                cursor: 'pointer',
              }}
            >
              {t('common.footer.privacyPolicyLink')}
            </Link>
            <Link
              onClick={() =>
                onExit(() =>
                  window.location.assign(
                    'https://www.pagopa.it/it/termini-e-condizioni-di-utilizzo-del-sito/'
                  )
                )
              }
              underline="none"
              sx={{
                margin: '10px',
                color: '#9BB7CB !important',
                textDecoration: 'none !important',
                cursor: 'pointer',
              }}
            >
              {t('common.footer.termsAndConditionLink')}
            </Link>
            <Link
              onClick={() =>
                onExit(() =>
                  window.location.assign(
                    'https://www.pagopa.it/static/781646994f1f8ddad2d95af3aaedac3d/Sicurezza-delle-informazioni_PagoPA-S.p.A..pdft'
                  )
                )
              }
              underline="none"
              sx={{
                marginRight: '10px',
                color: '#9BB7CB !important',
                textDecoration: 'none !important',
                cursor: 'pointer',
              }}
            >
              {t('common.footer.informationSecurityLink')}
            </Link>
            {assistanceEmail && (
              <Link
                onClick={() =>
                  onExit(() => window.location.assign(buildAssistanceURI(assistanceEmail)))
                }
                underline="none"
                sx={{
                  margin: '10px',
                  color: '#9BB7CB !important',
                  textDecoration: 'none !important',
                  cursor: 'pointer',
                }}
              >
                {t('common.footer.assistanceLink')}
              </Link>
            )}
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer;
