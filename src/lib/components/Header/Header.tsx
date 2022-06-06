import { Fragment } from 'react';
import { HeaderProduct } from '@pagopa/mui-italia/dist/components/HeaderProduct/HeaderProduct';
import { HeaderAccount } from '@pagopa/mui-italia/dist/components/HeaderAccount/HeaderAccount';
import {
  RootLinkType,
  JwtUser,
  UserAction,
  ProductSwitchItem,
  ProductEntity,
} from '@pagopa/mui-italia';
import { PartySwitchItem } from '@pagopa/mui-italia/dist/components/PartySwitch';
import { CONFIG } from '../../config/env';
import { buildAssistanceURI } from '../../services/assistanceService';

type PartyEntity = PartySwitchItem;
type HeaderProps = {
  /** if true, it will render an other toolbar under the Header */
  withSecondHeader: boolean;
  /** If withSecondHeader is true, this component will be rendered at the end of the secondary toolbar */
  productsList: Array<ProductEntity>;
  /** the party selected */
  selectedPartyId?: string;
  /** the product id selected */
  selectedProductId?: string;
  /** the parties list */
  partyList?: Array<PartyEntity>;
  /** shows if there is a logged user */
  loggedUser: JwtUser | false;
  /** the email to which the assistance button will ask to send an email */
  assistanceEmail?: string;
  /** the function to be invoked when the product was selected  */
  onSelectedProduct?: (product: ProductSwitchItem) => void;
  /** the function to be invoked when the party was selected  */
  onSelectedParty?: (party: PartySwitchItem) => void;
  /** the function to be invoked to redirect the user to the assistance page  */
  onAssistanceClick?: (exitAction: () => void) => void;
  /** The function to be invoked when pressing the rendered logout button, if not defined it will redirect to the logout page, if setted to null it will no render the logout button. It's possible to modify the logout path changing the value in CONFIG.logout inside the index.tsx file */
  onExitAction?: () => void;
  /** the function to be invoked when the user login  */
  onLogin?: () => void;
  enableLogin?: boolean;
  userActions?: Array<UserAction>;
  enableDropdown?: boolean;
  addSelfcareProduct?: boolean;
};

const selfcareProduct: ProductEntity = {
  id: 'prod-selfcare',
  title: 'Area Riservata',
  productUrl: CONFIG.HEADER.LINK.PRODUCTURL,
  linkType: 'internal',
};
const rootLink: RootLinkType = {
  label: 'PagoPA S.p.A.',
  href: CONFIG.HEADER.LINK.ROOTLINK,
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
  title: 'Sito di PagoPA S.p.A.',
};

/** SelfCare Header component */
const Header = ({
  withSecondHeader,
  productsList,
  selectedPartyId,
  selectedProductId = selfcareProduct.id,
  partyList,
  loggedUser,
  assistanceEmail,
  enableLogin,
  userActions,
  enableDropdown,
  addSelfcareProduct,
  onExitAction = () => window.location.assign(CONFIG.URL_FE.LOGOUT),
  onLogin,
  onSelectedProduct,
  onSelectedParty,
  onAssistanceClick = (exitAction) => exitAction(),
}: HeaderProps) => (
  <Fragment>
    <HeaderAccount
      rootLink={rootLink}
      loggedUser={loggedUser}
      onAssistanceClick={() =>
        onAssistanceClick(() => window.location.assign(buildAssistanceURI(assistanceEmail)))
      }
      onLogin={onLogin}
      onLogout={onExitAction}
      enableLogin={enableLogin}
      userActions={userActions}
      enableDropdown={enableDropdown}
    />
    {withSecondHeader === true ? (
      <HeaderProduct
        productId={selectedProductId}
        productsList={addSelfcareProduct ? [selfcareProduct].concat(productsList) : productsList}
        partyId={selectedPartyId}
        partyList={partyList}
        onSelectedProduct={onSelectedProduct}
        onSelectedParty={onSelectedParty}
      />
    ) : (
      ''
    )}
  </Fragment>
);

export default Header;
