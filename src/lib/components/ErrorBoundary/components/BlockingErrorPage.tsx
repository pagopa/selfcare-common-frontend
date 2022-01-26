import { Button, Grid, Typography, Box, SvgIconProps } from '@mui/material';
import { buildAssistanceURI } from '../../../services/assistanceService';
import ErrorIcon from '../../icons/ErrorIcon';

type Props = {
  description?: string;
  assistanceEmail?: string;
  icon?: React.ReactElement<SvgIconProps>;
};

export default ({ description, assistanceEmail, icon }: Props) => (
  <Box sx={{ minHeight: '100vh' }} display="flex">
    <Grid container direction="column" key="0" style={{ textAlign: 'center' }} margin={'auto'}>
      <Grid container item justifyContent="center" mb={5}>
        <Grid item xs={6}>
          {icon ?? <ErrorIcon /> }
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Grid item xs={6}>
          <Typography variant="h2">Spiacenti, qualcosa è andato storto.</Typography>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center" mb={7} mt={1}>
        <Grid item xs={6}>
          <Typography>
            {description ??
              'A causa di un errore del sistema non è possibile completare la procedura.'}
          </Typography>
        </Grid>
      </Grid>
      {assistanceEmail && (
        <Grid container item justifyContent="center">
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ width: '200px', alignSelf: 'center' }}
              onClick={() => window.location.assign(buildAssistanceURI(assistanceEmail))}
            >
              Contatta l&apos;assistenza
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  </Box>
);
