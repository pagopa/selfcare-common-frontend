import { Modal, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import MDSpinner from 'react-md-spinner';

type Props = {
  open: boolean;
};

/** A component which render an overlay loading */
export default function LoadingOverlayComponent({ open }: Props) {
  const theme = useTheme();

  return (
    <Modal open={open} sx={{ outline: 0, zIndex: 1500 }}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100px',
          outline: 0,
        }}
      >
        <MDSpinner singleColor={theme.palette.primary.main} role="loadingSpinner" />
      </Box>
    </Modal>
  );
}
