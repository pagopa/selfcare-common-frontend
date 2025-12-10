import { Modal, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import MDSpinner from 'react-md-spinner';

type Props = {
  open: boolean;
  loadingMessage?: string;
};

/** A component which render an overlay loading */
export default function LoadingOverlayComponent({
  open,
  loadingMessage = 'Caricamento in corso'
}: Props) {
  const theme = useTheme();

  return (
    <Modal
      open={open}
      sx={{ outline: 0, zIndex: 1500 }}
      aria-labelledby="loading-modal-title"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: '100px',
          outline: 0,
        }}
        role="status"
        aria-live="assertive"
        aria-atomic="true"
        aria-busy="true"
      >
        <span
          id="loading-modal-title"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0,0,0,0)',
            whiteSpace: 'nowrap',
            border: '0'
          }}
        >
          {loadingMessage}
        </span>
        <MDSpinner singleColor={theme.palette.primary.main} role="loadingSpinner" />
      </Box>
    </Modal>
  );
}