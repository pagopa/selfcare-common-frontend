import { ArrowBack } from '@mui/icons-material';
import { Box, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
type Props = {
  goBack: () => void;
  backLinkTextDecoration?: string;
  backLinkFontWeight?: string;
  backLinkFontSize?: string;
};

export default function BackComponent({
  goBack,
  backLinkTextDecoration,
  backLinkFontWeight,
  backLinkFontSize,
}: Props) {
  const { t } = useTranslation();
  return (
    <Box mr={2}>
      <Link
        sx={{
          cursor: 'pointer',
          ml: '16px',
          textDecoration: backLinkTextDecoration,
          fontWeight: backLinkFontWeight,
          fontSize: backLinkFontSize,
          display: 'flex',
        }}
        onClick={goBack}
      >
        <ArrowBack color="primary" fontSize="small" sx={{ marginTop: '3px', mr: '8px' }} />
        {t('common.backComponent.label')}
      </Link>
    </Box>
  );
}
