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

type Props = {
 role?: string;
}

export const useLiveAnnouncerWithRegion = ({role}: Readonly<Props>) => {
  const [message, setMessage] = useState('');

  const announce = (msg: string) => setMessage(msg);

  const LiveRegion = (
    <div
      aria-live="polite"
      aria-atomic="true"
      data-testid="live-region-announcer"
      style={visuallyHiddenStyle}
      role={role}
    >
      {message}
    </div>
  );

  return { announce, LiveRegion };
};
