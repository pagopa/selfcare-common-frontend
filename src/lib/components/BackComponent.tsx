import { ArrowBack } from '@mui/icons-material';
import { ButtonNaked } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
type Props = {
  goBack?: () => void;
  backLabel?: string;
};

export default function BackComponent({ goBack, backLabel }: Props) {
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
      {backLabel ? backLabel : t('common.backComponent.label')}
    </ButtonNaked>
  );
}
