// import React from 'react'
// import { Box } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { ReactNode } from 'react';

type Props = {
  /** The title to show (can be a string or JSX) */
  title: ReactNode;
  /** The subtitle to show (can be a string or JSX) */
  subTitle?: ReactNode;
  /** The margin top of the title */
  mtTitle?: number;
  /** The margin bottom of the title */
  mbTitle?: number;
  /** The margin bottom of the subtitle */
  mbSubTitle?: number;
  /** The variant of the Typografy used for the title */
  variantTitle?: Variant;
  /** The variant of the Typografy used for the subtitle */
  variantSubTitle?: Variant;
  /** The variant of the title font size */
  titleFontSize?: string;
  /** The variant of the subtitle font size */
  subTitleFontSize?: string;
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
  titleFontSize,
  subTitleFontSize = '18px',
}: Props) {
  return (
    <Grid container mt={mtTitle}>
      <Grid item xs={12} mb={mbTitle}>
        <Typography variant={variantTitle} sx={{ fontSize: titleFontSize }}>
          {title}
        </Typography>
      </Grid>
      {subTitle && (
        <Grid item xs={12} mb={mbSubTitle}>
          <Typography variant={variantSubTitle} sx={{ fontSize: subTitleFontSize }}>
            {subTitle}
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
