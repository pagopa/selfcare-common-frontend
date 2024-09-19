import { Alert } from '@mui/material';
import { useTranslation } from 'react-i18next';

type AlertProps = {
  /** The text to display in the alert */
  text?: string;
  /** The severity level of the alert */
  severity?: 'error' | 'info' | 'success' | 'warning';
  /** The visual style of the alert */
  variant?: 'filled' | 'outlined' | 'standard';
  /** Additional custom styles */
  sx?: object;
};

export default function CustomAlert({
  text,
  severity = 'info',
  variant = 'standard',
  sx,
  ...rest
}: AlertProps) {
  const { t } = useTranslation();

  return (
    <Alert role="alert" severity={severity} variant={variant} sx={sx} {...rest}>
      {text || t('common.customAlert.message')}
    </Alert>
  );
}
