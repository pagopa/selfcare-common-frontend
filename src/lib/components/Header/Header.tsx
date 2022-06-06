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
  /** If true, it will render an other toolbar under the Header */
  withSecondHeader: boolean;
  /** The list of products in header */
  productsList: Array<ProductEntity>;
  /** The party id selected */
  selectedPartyId?: string;
  /** The product id selected */
  selectedProductId?: string;
  /** The parties list */
  partyList?: Array<PartyEntity>;
  /** The logged user or false if there is not a valid session */
  loggedUser: JwtUser | false;
  /** The email to which the assistance button will ask to send an email, if the user is not logged in, otherwise it will be redirect to the assistance form */
  assistanceEmail?: string;
  /** The function invoked when the user click on a product */
  onSelectedProduct?: (product: ProductSwitchItem) => void;
  /** The function invoked when the user click on a party from the switch  */
  onSelectedParty?: (party: PartySwitchItem) => void;
  /** The function to be invoked when pressing the rendered logout button, if not defined it will redirect to the logout page, if setted to null it will no render the logout button. It's possible to modify the logout path changing the value in CONFIG.logout inside the index.tsx file */
  onExit: (exitAction: () => void) => void;
  /** If false hides login button  */
  enableLogin?: boolean;
  /** The users actions inside the user dropdown. It's visible only if enableLogin and enableDropdown are true */
  userActions?: Array<UserAction>;
  /** If true the user dropdown in headerAccount component is visible. It's visible only if enableLogin is true */
  enableDropdown?: boolean;
  /** If true it concatenates selfcareProduct with productsList */
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
  userActions = [],
  enableDropdown = false,
  addSelfcareProduct = true,
  onExit,
  onSelectedProduct,
  onSelectedParty,
}: HeaderProps) => (
  <Fragment>
    <HeaderAccount
      rootLink={rootLink}
      loggedUser={loggedUser}
      onAssistanceClick={() =>
        onExit(() => window.location.assign(buildAssistanceURI(assistanceEmail)))
      }
      onLogin={() => window.location.assign(CONFIG.URL_FE.LOGIN)}
      onLogout={() => window.location.assign(CONFIG.URL_FE.LOGOUT)}
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
