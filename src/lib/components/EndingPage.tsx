import { Button, Grid, Typography, Box, SvgIconProps } from '@mui/material';

type Props = {
  /** The ending page icon */
  icon?: React.ReactElement<SvgIconProps>;
  /** The ending page title */
  title: React.ReactNode;
  /** The ending page description */
  description: React.ReactNode;
  /** The ending page button label if any */
  buttonLabel?: React.ReactNode;
  /** if defined it will show a button that will performe this action on click */
  onButtonClick?: () => void;
  /** Set the variant of the title */
  variantTitle?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | undefined;
  /** Set the variant of the description */
  variantDescription?:
    | 'button'
    | 'caption'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'inherit'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'overline'
    | undefined;
};

/** Selfcare's Ending Page */
export default ({
  description,
  onButtonClick,
  icon,
  title,
  buttonLabel,
  variantTitle,
  variantDescription,
}: Props) => (
  <Box sx={{ minHeight: '100vh' }} display="flex" flexGrow={1}>
    <Grid container direction="column" key="0" style={{ textAlign: 'center' }} margin={'auto'}>
      <Grid container item justifyContent="center" mb={3}>
        <Grid item xs={6}>
          {icon}
        </Grid>
      </Grid>
      <Grid container item justifyContent="center">
        <Grid item xs={6}>
          <Typography variant={variantTitle}>{title}</Typography>
        </Grid>
      </Grid>
      <Grid container item justifyContent="center" mb={4} mt={1}>
        <Grid item xs={6}>
          <Typography variant={variantDescription}>{description}</Typography>
        </Grid>
      </Grid>
      {onButtonClick && (
        <Grid container item justifyContent="center">
          <Grid item xs={4}>
            <Button variant="contained" sx={{ alignSelf: 'center' }} onClick={onButtonClick}>
              {buttonLabel}
            </Button>
          </Grid>
        </Grid>
      )}
    </Grid>
  </Box>
);
