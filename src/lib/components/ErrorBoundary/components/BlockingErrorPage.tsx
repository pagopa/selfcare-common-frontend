import { useTranslation } from 'react-i18next';
import { buildAssistanceURI } from '../../../services/assistanceService';
import EndingPage from '../../EndingPage';
import ErrorIcon from '../../icons/ErrorIcon';

type Props = {
  description?: React.ReactNode;
  assistanceEmail?: string;
  minHeight?: '52vh' | '100vh';
};
export default ({ description, assistanceEmail, minHeight = '100vh' }: Props) => {
  const { t } = useTranslation();
  return (
    <EndingPage
      minHeight={minHeight}
      icon={<ErrorIcon />}
      title={t('common.blockingErrorPage.title')}
      description={description ?? t('common.blockingErrorPage.description')}
      onButtonClick={
        assistanceEmail
          ? () => window.location.assign(buildAssistanceURI(assistanceEmail))
          : undefined
      }
      buttonLabel={t('common.blockingErrorPage.buttonLabel')}
    />
  );
};
