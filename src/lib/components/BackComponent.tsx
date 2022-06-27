import { ArrowBack } from '@mui/icons-material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
type Props = {
  goBack?: () => void;
};

export default function BackComponent({ goBack }: Props) {
  const { t } = useTranslation();
  return (
    <ButtonNaked
      size="small"
      component="button"
      onClick={goBack}
      startIcon={<ArrowBack />}
      sx={{ color: 'primary.main' }}
      weight="default"
    >
      {t('common.backComponent.label')}
    </ButtonNaked>
  );
}
