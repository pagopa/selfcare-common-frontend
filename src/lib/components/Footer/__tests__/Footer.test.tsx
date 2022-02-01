import { fireEvent, render, screen } from '@testing-library/react';
import { buildAssistanceURI } from '../../../services/assistanceService';
import Footer from './../Footer';

const oldWindowLocation = global.window.location;

const initialLocation = {
  assign: jest.fn(),
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

jest.mock('../../../services/assistanceService', () => ({
  buildAssistanceURI: jest.fn(),
}));

const checkBaseLink = () => {
  screen.getByText('Privacy Policy');
  screen.getByText('Termini e condizioni d’uso del sito');
  screen.getByText('Sicurezza delle informazioni');
};

test('test using assistance', () => {
  render(<Footer assistanceEmail="assistance@selfcare.it" />);
  checkBaseLink();
  fireEvent.click(screen.getByText('Assistenza'));

  expect(buildAssistanceURI).toBeCalledWith('assistance@selfcare.it');
});

test('test not using assistance', () => {
  render(<Footer />);
  checkBaseLink();
  expect(screen.queryByText('Assistenza')).toBeNull();

  expect(buildAssistanceURI).toBeCalledTimes(0);
});
