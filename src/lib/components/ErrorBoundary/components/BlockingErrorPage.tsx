import { buildAssistanceURI } from '../../../services/assistanceService';
import EndingPage from '../../EndingPage';
import ErrorIcon from '../../icons/ErrorIcon';

type Props = {
  description?: React.ReactNode;
  assistanceEmail?: string;
};
export default ({ description, assistanceEmail }: Props) => (
  <EndingPage
    icon={<ErrorIcon />}
    title="Spiacenti, qualcosa è andato storto."
    description={
      description ?? 'A causa di un errore del sistema non è possibile completare la procedura.'
    }
    onButtonClick={
      assistanceEmail
        ? () => window.location.assign(buildAssistanceURI(assistanceEmail))
        : undefined
    }
    buttonLabel={"Contatta l'assistenza"}
  />
);
