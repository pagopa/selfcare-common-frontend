import { useTranslation } from 'react-i18next';
import { buildAssistanceURI } from '../../../services/assistanceService';
import EndingPage from '../../EndingPage';
import ErrorIcon from '../../icons/ErrorIcon';

type Props = {
  description?: string;
  assistanceEmail?: string;
};
export default ({ description, assistanceEmail }: Props) => {
  const { t } = useTranslation();
  return (
    <EndingPage
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
