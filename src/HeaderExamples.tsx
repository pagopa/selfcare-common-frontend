import { Header, useUnloadEventLogout } from './lib';

type LinkType = 'internal' | 'external';
type ProductSwitchItem = {
  id: string;
  title: string;
  productUrl: string;
  linkType: LinkType;
};
type ProductEntity = ProductSwitchItem;
export const productsList: Array<ProductEntity> = [
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
export default function HeaderExamples() {
  const onLogout = useUnloadEventLogout();

  return <Header withSecondHeader={true} onExitAction={onLogout} productsList={productsList} />;
}
