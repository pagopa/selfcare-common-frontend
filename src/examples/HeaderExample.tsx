import { PartyEntity, ProductSwitchItem } from '@pagopa/mui-italia';
import Header from '../lib/components/Header/Header';

const cdnPath = 'https://assets.cdn.io.italia.it/logos/organizations/';
type ProductEntity = ProductSwitchItem;
export const productsList: Array<ProductEntity> = [
  {
    id: '0',
    title: `Piattaforma Notifiche`,
    productUrl: '#piattaforma-notifiche',
    linkType: 'external',
  },
  {
    id: '1',
    title: `App IO`,
    productUrl: '#app-io',
    linkType: 'internal',
  },
  {
    id: '2',
    title: `Interoperabilità`,
    productUrl: '#interoperabilità',
    linkType: 'internal',
  },
];
export const partyList: Array<PartyEntity> = [
  {
    id: '0',
    name: `Commissario straordinario per la realizzazione di
    approdi temporanei e di interventi complementari per la
    salvaguardia di Venezia e della sua laguna e ulteriori
    interventi per la salvaguardia della laguna di Venezia`,
    productRole: 'Referente amministrativo',
    logoUrl: `${cdnPath}1199250158.png`,
  },
  {
    id: '1',
    logoUrl: `${cdnPath}2438750586.png`,
    name: 'Comune di Roma',
    productRole: 'Referente amministrativo',
  },
  {
    id: '2',
    logoUrl: `${cdnPath}162210348.png`,
    name: 'Comune di Parma',
    productRole: 'Referente amministrativo',
  },
  {
    id: '3',
    logoUrl: `${cdnPath}82003830161.png`,
    name: 'Comune di Sotto il Monte Giovanni XXIII',
    productRole: 'Referente amministrativo',
  },
  {
    id: '4',
    logoUrl: `${cdnPath}172960361.png`,
    name: 'Comune di Castelfranco Emilia',
    productRole: 'Referente amministrativo',
  },
  {
    id: '5',
    logoUrl: `${cdnPath}82001510492.png`,
    name: "Comune di Campo nell'Elba",
    productRole: 'Referente amministrativo',
  },
  {
    id: '6',
    logoUrl: `${cdnPath}117100537.png`,
    name: 'Comune di Castiglione della Pescaia',
    productRole: 'Referente amministrativo',
  },
  {
    id: '7',
    logoUrl: `${cdnPath}142680669.png`,
    name: 'Comune di Pescasseroli',
  },
  {
    id: '8',
    logoUrl: `${cdnPath}81000410688.png`,
    name: 'Comune di San Valentino in Abruzzo Citeriore',
  },
  {
    id: '9',
    logoUrl: `${cdnPath}189800204.png`,
    name: 'Comune di Mantova',
    productRole: 'Referente amministrativo',
  },
  {
    id: '10',
    logoUrl: `${cdnPath}82002590105.png`,
    name: 'Comune di Ne',
    productRole: 'Referente amministrativo',
  },
  {
    id: '11',
    logoUrl: `${cdnPath}74260845.png`,
    name: 'Comune di Agrigento',
    productRole: 'Referente amministrativo',
  },
  {
    id: '12',
    logoUrl: `${cdnPath}80001950403.png`,
    name: 'Comune di Castrocaro Terme e Terra del Sole',
    productRole: 'Referente amministrativo',
  },
  {
    id: '13',
    logoUrl: undefined,
    name: 'Ente senza stemma',
    productRole: 'Referente amministrativo',
  },
];

export default function HeaderExample() {
  return (
    <Header
      withSecondHeader={true}
      productsList={productsList}
      partyList={partyList}
      loggedUser={{
        id: '',
        name: undefined,
        surname: undefined,
        email: undefined,
      }}
      assistanceEmail="assistance@selfcare.it"
      enableLogin={true}
    />
  );
}
