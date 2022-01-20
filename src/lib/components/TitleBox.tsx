// import React from 'react'
// import { Box } from '@mui/material';
import { GridSize, Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

type Props = {
  /** The title to show */
  title: string;
  /** The subtitle to show */
  subTitle?: string;
  /** The margin top of the title */
  mtTitle?: number;
  /** The margin bottom of the title */
  mbTitle?: GridSize;
  /** The margin bottom of the subtitle */
  mbSubTitle?: number;
  /** The variant of the Typografy used for the title */
  variantTitle?: Variant;
  /** The variant of the Typografy used for the subtitle */
  variantSubTitle?: Variant;
};

/** Selfcare's page title */
export default function TitleBox({
  title,
  subTitle,
  mbTitle = 2,
  mtTitle,
  mbSubTitle,
  variantTitle = 'h1',
  variantSubTitle = 'h5',
}: Props) {
  return (
    <Grid container mt={mtTitle}>
      <Grid item xs={12} mb={mbTitle}>
        <Typography variant={variantTitle}>{title}</Typography>
      </Grid>
      <Grid item xs={12} mb={mbSubTitle}>
        <Typography variant={variantSubTitle} sx={{ fontSize: '18px' }}>
          {subTitle}
        </Typography>
      </Grid>
    </Grid>
  );
}
