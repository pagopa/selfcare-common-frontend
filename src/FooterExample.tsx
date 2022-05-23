import { Box, Button } from '@mui/material';
import { useState } from 'react';
import Footer from './lib/components/Footer/Footer';

export default function () {
  const [userIsLogged, setUserIsLogged] = useState(true);
  return (
    <>
      <Box my={4}>
        <Button variant="contained" onClick={() => setUserIsLogged(!userIsLogged)}>
          Switch Footer
        </Button>
      </Box>
      <Footer loggedUser={userIsLogged} />
    </>
  );
}
