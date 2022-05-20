import { JwtUser } from '@pagopa/mui-italia';
import { fireEvent, render, screen } from '@testing-library/react';
import { ProductEntity } from '../../../model/Mui-italia-model';
import { buildAssistanceURI } from '../../../services/assistanceService';
import Header from './../Header';

const oldWindowLocation = global.window.location;

const productsList: Array<ProductEntity> = [
  {
    id: '0',
    title: `Area Riservata`,
    productUrl: '#area-riservata',
    linkType: 'external',
  },
  {
    id: '1',
    title: `Piattaforma Notifiche`,
    productUrl: '#piattaforma-notifiche',
    linkType: 'external',
  },
  {
    id: '2',
    title: `App IO`,
    productUrl: '#app-io',
    linkType: 'internal',
  },
  {
    id: '3',
    title: `Interoperabilità`,
    productUrl: '#interoperabilità',
    linkType: 'internal',
  },
];

const initialLocation = {
  assign: jest.fn(),
  pathname: '',
  origin: 'MOCKED_ORIGIN',
  search: '',
  hash: '',
  state: undefined,
};

const mockedLocation = Object.assign({}, initialLocation);

const user: JwtUser = {
  id: '1',
  name: 'Ermenegildo',
  surname: 'Zegna',
  email: 'mario.rossi@gmail.com',
};

beforeAll(() => {
  Object.defineProperty(window, 'location', { value: mockedLocation });
});

afterAll(() => {
  Object.defineProperty(window, 'location', { value: oldWindowLocation });
});

jest.mock('../../../services/assistanceService', () => ({
  buildAssistanceURI: jest.fn(),
}));

test('test using assistance', () => {
  render(
    <Header
      enableLogin={true}
      withSecondHeader={false}
      productsList={productsList}
      loggedUser={user}
      assistanceEmail="assistance@selfcare.it"
    />
  );
  fireEvent.click(screen.getByText('Assistenza'));

  expect(buildAssistanceURI).toBeCalledWith('assistance@selfcare.it');
});

test('test not using assistance', () => {
  render(
    <Header
      withSecondHeader={false}
      productsList={productsList}
      loggedUser={false}
      enableLogin={false}
    />
  );
  expect(screen.queryByText('Assistenza')).toBeNull();

  expect(buildAssistanceURI).toBeCalledTimes(0);
});
