import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useLiveAnnouncerWithRegion } from '../useLiveAnnouncerWithRegion';

jest.useFakeTimers();

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
