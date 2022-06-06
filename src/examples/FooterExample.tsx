import Footer from '../lib/components/Footer/Footer';
import { useUnloadEventOnExit } from './../lib/hooks/useUnloadEventInterceptor';

type Props = { isLoggedIn: boolean };

export default function ({ isLoggedIn }: Props) {
  const onExit = useUnloadEventOnExit();
  return <Footer loggedUser={isLoggedIn ? true : false} onExit={onExit} />;
}
