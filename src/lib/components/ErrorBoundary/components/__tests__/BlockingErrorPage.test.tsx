import { fireEvent, render, screen } from '@testing-library/react';
import { buildAssistanceURI } from '../../../../services/assistanceService';
import './../../../../../examples/locale';
import BlockingErrorPage from './../BlockingErrorPage';
import { vi, type Mock } from 'vitest';

vi.mock('i18next-browser-languagedetector');

const oldWindowLocation = global.window.location;

const initialLocation = {
  assign: vi.fn(),
  pathname: '',
  origin: 'MOCKED_ORIGIN',
  search: '',
  hash: '',
  state: undefined,
};

const mockedLocation = Object.assign({}, initialLocation);

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
});

afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

vi.mock('../../../../services/assistanceService', () => ({
  buildAssistanceURI: vi.fn(),
}));

beforeEach(() => {
  (buildAssistanceURI as Mock).mockReturnValue('url');
});

const checkBase = () => {
  screen.getByText('Spiacenti, qualcosa è andato storto.');
};

test('test using assistance', () => {
  render(<BlockingErrorPage assistanceEmail="assistance@selfcare.it" />);
  checkBase();
  const button = screen.getByText("Contatta l'assistenza");

  fireEvent.click(button);

  expect(buildAssistanceURI).toHaveBeenCalledWith('assistance@selfcare.it');
  expect(mockedLocation.assign).toHaveBeenCalledWith('url');
});

test('test not using assistance', () => {
  render(<BlockingErrorPage />);
  checkBase();
  const btnLabel = screen.queryByText("Contatta l'assistenza");
  expect(btnLabel).not.toBeNull();

  expect(buildAssistanceURI).toHaveBeenCalledTimes(0);
});
