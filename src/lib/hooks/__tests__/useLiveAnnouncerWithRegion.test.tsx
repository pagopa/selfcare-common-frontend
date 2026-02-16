import { render, waitFor, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import { useLiveAnnouncerWithRegion } from '../useLiveAnnouncerWithRegion';

// Remove vi.useFakeTimers() or use real timers for this test

const TestComponent = () => {
  const { announce, LiveRegion } = useLiveAnnouncerWithRegion();

  return (
    <div>
      <button onClick={() => announce('Hello world!')}>Announce</button>
      {LiveRegion}
    </div>
  );
};

describe('useLiveAnnouncerWithRegion', () => {
  test('should update the live region', async () => {
    render(<TestComponent />);

    const button = screen.getByText('Announce');
    button.click();

    const region = screen.getByTestId('live-region-announcer');

    await waitFor(() => {
      expect(region).toHaveTextContent('Hello world!');
    });
  });
});