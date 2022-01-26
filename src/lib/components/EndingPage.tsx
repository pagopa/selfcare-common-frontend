import { Button, Grid, Typography, Box, SvgIconProps } from '@mui/material';
import CheckIllustration from './icons/CheckIllustration';

type Props = {
  /** The ending page icon */
  icon?: React.ReactElement<SvgIconProps>;
  /** The ending page title */
  title: string;
  /** The ending page description */
  description: string;
  /** The ending page button label if any */
  buttonLabel?:string;
  /** if defined it will show a button that will performe this action on click */
  onButtonClick?: () => void;
};

/** Selfcare's Ending Page */
export default ({ description, onButtonClick, icon = <CheckIllustration />, title, buttonLabel }: Props) => (
  <Box sx={{ minHeight: '100vh' }} display="flex">
    <Grid container direction="column" key="0" style={{ textAlign: 'center' }} margin={'auto'}>
      <Grid container item justifyContent="center" mb={5}>
        <Grid item xs={6}>
          {icon}
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Grid item xs={6}>
          <Typography variant="h2">{title}</Typography>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center" mb={7} mt={1}>
        <Grid item xs={6}>
          <Typography>
            {description}
          </Typography>
        </Grid>
      </Grid>
      {onButtonClick && (
        <Grid container item justifyContent="center">
          <Grid item xs={4}>
            <Button
              variant="contained"
              sx={{ width: '200px', alignSelf: 'center' }}
              onClick={onButtonClick}
            >
              {buttonLabel}
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  </Box>
);
