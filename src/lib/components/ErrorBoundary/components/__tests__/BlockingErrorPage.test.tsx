import { fireEvent, render, screen } from '@testing-library/react';
import { buildAssistanceURI } from '../../../../services/assistanceService';
import BlockingErrorPage from './../BlockingErrorPage';

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
    buildAssistanceURI: jest.fn()
}));

beforeEach(() => {
    (buildAssistanceURI as jest.Mock).mockReturnValue('url')
})

const checkBase = () => {
    screen.getByText('Spiacenti, qualcosa è andato storto.')
}

test('test using assistance', () => {
    render(<BlockingErrorPage assistanceEmail='assistance@selfcare.it'/>);
    checkBase() 
    const button = screen.getByText("Contatta l'assistenza")

    fireEvent.click(button);

    expect(buildAssistanceURI).toBeCalledWith('assistance@selfcare.it')
    expect(mockedLocation.assign).toBeCalledWith('url')
});

test('test not using assistance', () => {
    render(<BlockingErrorPage />);
    checkBase() 
    expect(screen.queryByText("Contatta l'assistenza")).toBeNull();

    expect(buildAssistanceURI).toBeCalledTimes(0)
});
