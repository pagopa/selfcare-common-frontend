import { Box, Button } from '@mui/material';
import { useState } from 'react';
import Footer from '../lib/components/Footer/Footer';
import { useUnloadEventOnExit } from './../lib/hooks/useUnloadEventInterceptor';

export default function () {
  const [userIsLogged, setUserIsLogged] = useState(true);
  const onExit = useUnloadEventOnExit();
  return (
    <>
      <Box my={4}>
        <Button variant="contained" onClick={() => setUserIsLogged(!userIsLogged)}>
          Switch Footer
        </Button>
      </Box>
      <Footer loggedUser={userIsLogged} onExit={onExit} />
    </>
  );
}
