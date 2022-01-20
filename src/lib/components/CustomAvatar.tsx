import React from 'react';
import { Avatar } from '@mui/material';

type Props = {
  /** The id attribute added to the element */
  id?: string;
  /** The logo src */
  customSrc?: string | undefined;
  /** The alt text showed instead of the image */
  customAlt?: string | undefined;
  /** Logo width */
  customWidth?: string | undefined;
  /** Logo height */
  customHeight?: string | undefined;
  /** If true it will not display the component */
  loading?: boolean;
};

/** Avatar to use to load Organization logo */
export default function CustomAvatar({
  customAlt,
  customSrc,
  customWidth,
  customHeight,
  id,
  loading,
}: Props) {
  return (
    <React.Fragment>
      <Avatar
        id={id}
        alt={customAlt}
        src={customSrc}
        sx={{
          width: customWidth,
          height: customHeight,
          display: !loading ? undefined : 'none',
          color: 'palette.background.default',
          backgroundColor: '#CCD4DC',
        }}
      />
    </React.Fragment>
  );
}
