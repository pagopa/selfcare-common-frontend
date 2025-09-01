import { useState } from 'react';

const visuallyHiddenStyle: React.CSSProperties = {
  border: 0,
  clip: 'rect(0  0  0 0)',
  height: '1px',
  margin: '-1px',
  overflow: 'hidden',
  padding: 0,
  position: 'absolute',
  whiteSpace: 'nowrap',
  width: '1px',
};

export const useLiveAnnouncerWithRegion = () => {
  const [message, setMessage] = useState('');

  const announce = (msg: string) => setMessage(msg);

  const LiveRegion = (
    <div
      aria-live="polite"
      aria-atomic="true"
      data-testid="live-region-announcer"
      style={visuallyHiddenStyle}
    >
      {message}
    </div>
  );

  return { announce, LiveRegion };
};
