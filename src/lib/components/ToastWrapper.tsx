import { Fragment, ReactNode } from 'react';
import { Box } from '@mui/material';

type Props = {
  children: Array<ReactNode>;
  /** The pixel from the bottom of the viewport where to place the toast. Default "64px" */
  bottom?: string;
  /** The pixel from the right side of the viewport where to place the toast. Default "64px" */
  right?: string;
};

/** To stack multiple Toast component. Each Toast should have the prop wrapped setted to true */
export default function ToastWrapper({ children, bottom = '64px', right = '64px' }: Props) {
  return (
    <Fragment>
      (
      <Box
        sx={{
          position: 'fixed',
          bottom: { bottom },
          right: { right },
          zIndex: 100,
        }}
      >
        {children.slice().reverse()}
      </Box>
    </Fragment>
  );
}
