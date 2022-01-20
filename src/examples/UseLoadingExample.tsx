import { Button } from '@mui/material';
import useLoading from '../lib/hooks/useLoading';

export default () => {
  const setLoading = useLoading('PROVA');

  const testLoading = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Button onClick={testLoading} variant="contained">
      Test loading
    </Button>
  );
};
