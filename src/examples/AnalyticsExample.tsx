import { Button } from '@mui/material';
import { initAnalytics, trackEvent } from '../lib/services/analyticsService';

export default () => (
  <>
    <div>
      <Button onClick={initAnalytics} variant="contained">
        init
      </Button>
      <Button
        onClick={() => trackEvent('PROVA', { PROP1: 'VAL1', PROP2: 'VAL2' })}
        variant="contained"
      >
        track sample data
      </Button>
    </div>
  </>
);
