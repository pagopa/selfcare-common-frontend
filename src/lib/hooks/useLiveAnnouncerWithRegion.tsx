import { useCallback, useState } from 'react';

export const useLiveAnnouncerWithRegion = () => {
  const [message, setMessage] = useState('');

  const announce = useCallback((msg: string) => {
    setMessage('');
    setTimeout(() => {
      setMessage(msg);
    }, 100);
  }, []);

  const LiveRegion = (
    <div
      aria-live="polite"
      aria-atomic="true"
      data-testid="live-region-announcer"
      style={{
        position: 'absolute',
        left: '-9999px',
        height: '1px',
        width: '1px',
        overflow: 'hidden',
      }}
    >
      {message}
    </div>
  );

  return { announce, LiveRegion };
};
