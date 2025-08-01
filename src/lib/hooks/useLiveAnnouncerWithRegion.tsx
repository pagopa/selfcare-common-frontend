import { useCallback, useEffect, useRef, useState } from 'react';

export const useLiveAnnouncerWithRegion = () => {
  const [message, setMessage] = useState('');
  const timeoutRef = useRef<number | null>(null);

  const announce = useCallback((msg: string) => {
    setMessage('');
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    // eslint-disable-next-line functional/immutable-data
    timeoutRef.current = window.setTimeout(() => {
      setMessage(msg);
    }, 100);
  }, []);

  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    []
  );

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
