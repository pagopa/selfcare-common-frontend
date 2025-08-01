import '@testing-library/jest-dom';
import { act, render, screen } from '@testing-library/react';
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
  it('should update the live region with the message after a delay', () => {
    render(<TestComponent />);

    const button = screen.getByText('Announce');
    act(() => {
      button.click();
    });

    const region = screen.getByTestId('live-region-announcer');
    expect(region).toHaveTextContent('');

    act(() => {
      jest.advanceTimersByTime(100);
    });

    expect(region).toHaveTextContent('Hello world!');
  });
});
