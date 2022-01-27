import { render, screen } from '@testing-library/react';
import { buildAssistanceURI } from '../../../services/assistanceService';
import Footer from './../Footer';

jest.mock('../../../services/assistanceService', () => ({
    buildAssistanceURI: jest.fn()
}));

const checkBaseLink = () => {
    screen.getByText('Privacy Policy')
    screen.getByText('Termini e condizioni d’uso del sito')
    screen.getByText('Sicurezza delle informazioni')
}

test('test using assistance', () => {
    render(<Footer assistanceEmail='assistance@selfcare.it'/>);
    checkBaseLink() 
    screen.getByText('Assistenza')

    expect(buildAssistanceURI).toBeCalledWith('assistance@selfcare.it')
});

test('test not using assistance', () => {
    render(<Footer />);
    checkBaseLink() 
    expect(screen.queryByText('Assistenza')).toBeNull();

    expect(buildAssistanceURI).toBeCalledTimes(0)
});
