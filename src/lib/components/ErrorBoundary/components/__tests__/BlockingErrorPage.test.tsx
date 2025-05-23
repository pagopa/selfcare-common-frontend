import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { buildAssistanceURI } from '../../../../services/assistanceService';
import './../../../../../examples/locale';
import BlockingErrorPage from './../BlockingErrorPage';

jest.mock('i18next-browser-languagedetector');

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

jest.mock('../../../../services/assistanceService', () => ({
  buildAssistanceURI: jest.fn(),
}));

beforeEach(() => {
  (buildAssistanceURI as jest.Mock).mockReturnValue('url');
});

const checkBase = () => {
  screen.getByText('Spiacenti, qualcosa è andato storto.');
};

test('test using assistance', () => {
  render(<BlockingErrorPage assistanceEmail="assistance@selfcare.it" />);
  checkBase();
  const button = screen.getByText("Contatta l'assistenza");

  fireEvent.click(button);

  expect(buildAssistanceURI).toBeCalledWith('assistance@selfcare.it');
  expect(mockedLocation.assign).toBeCalledWith('url');
});

test('test not using assistance', () => {
  render(<BlockingErrorPage />);
  checkBase();
  const btnLabel = screen.queryByText("Contatta l'assistenza");
  expect(btnLabel).not.toBeNull();

  expect(buildAssistanceURI).toBeCalledTimes(0);
});
