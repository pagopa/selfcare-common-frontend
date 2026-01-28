import {
  HeaderAccount,
  HeaderProduct,
  JwtUser,
  ProductEntity,
  ProductSwitchItem,
  RootLinkType,
  UserAction,
} from '@pagopa/mui-italia';
import { PartySwitchItem } from '@pagopa/mui-italia/dist/components/PartySwitch';
import { Fragment, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { CONFIG } from '../../config/env';
import { buildAssistanceURI } from '../../services/assistanceService';
import { isPagoPaUser } from '../../utils/storage';

type PartyEntity = PartySwitchItem;
type HeaderProps = {
  /** If true, it will render an other toolbar under the Header */
  withSecondHeader: boolean;
  /** The list of products in header */
  productsList?: Array<ProductEntity>;
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
  onExit?: (exitAction: () => void) => void;
  /** If false hides login button  */
  enableLogin?: boolean;
  /** The users actions inside the user dropdown. It's visible only if enableLogin and enableDropdown are true */
  userActions?: Array<UserAction>;
  /** If true the user dropdown in headerAccount component is visible. It's visible only if enableLogin is true */
  enableDropdown?: boolean;
  /** If true it concatenates selfcareProduct with productsList */
  addSelfcareProduct?: boolean;
  /* The number of characters beyond which the multiLine is applied in component PartyAccountItemButton */
  maxCharactersNumberMultiLineButton?: number;
  /* The number of characters beyond which the multiLine is applied in component PartyAccountItem */
  maxCharactersNumberMultiLineItem?: number;
  /** If false hides assistance button */
  enableAssistanceButton?: boolean;
  /** A callback function that controls the visibility of the documentation button and handles user clicks on the documentation button. */
  onDocumentationClick?: () => void;
  /** A callback function that handles user clicks on the logout button. */
  onLogoutClick?: () => void;
  /** An optional fixed list of parties to be shown in the party switcher */
  fixedParty?: PartyEntity;
};

const SELFCARE_PRODUCT: ProductEntity = {
  id: 'prod-selfcare',
  title: 'Area Riservata',
  productUrl: CONFIG.HEADER.LINK.PRODUCTURL,
  linkType: 'internal',
};

const BACKSTAGE_PRODUCT: ProductEntity = {
  id: 'prod-selfcare-backstage',
  title: 'Area Riservata Backstage',
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
  productsList = [],
  selectedPartyId,
  selectedProductId,
  partyList = [],
  loggedUser,
  assistanceEmail,
  enableLogin = true,
  userActions = [],
  enableDropdown = false,
  addSelfcareProduct = true,
  onExit = (exitAction) => exitAction(),
  onSelectedProduct,
  onSelectedParty,
  maxCharactersNumberMultiLineButton,
  maxCharactersNumberMultiLineItem,
  enableAssistanceButton = true,
  onDocumentationClick,
  onLogoutClick,
  fixedParty,
}: HeaderProps) => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // Logic Derivation
  const isAdminPage = pathname.includes('/admin');
  const productToRender = isAdminPage ? BACKSTAGE_PRODUCT : SELFCARE_PRODUCT;

  const renderedPartyList = fixedParty ? [fixedParty] : partyList;
  const renderedPartyId = fixedParty ? fixedParty.id : selectedPartyId;

  // Memoize the product list
  const fullProductList = useMemo(
    () => (addSelfcareProduct ? [productToRender, ...productsList] : productsList),
    [addSelfcareProduct, productToRender, productsList]
  );

  return (
    <Fragment>
      <header>
        <HeaderAccount
          rootLink={rootLink}
          loggedUser={loggedUser}
          onAssistanceClick={() =>
            onExit(() => window.location.assign(buildAssistanceURI(assistanceEmail)))
          }
          onLogin={() => onExit(() => window.location.assign(CONFIG.URL_FE.LOGIN))}
          onLogout={
            onLogoutClick ?? (() => onExit(() => window.location.assign(CONFIG.URL_FE.LOGOUT)))
          }
          enableLogin={enableLogin}
          userActions={userActions}
          enableDropdown={enableDropdown}
          enableAssistanceButton={enableAssistanceButton}
          onDocumentationClick={onDocumentationClick}
        />
      </header>
      {withSecondHeader === true ? (
        <nav>
          <HeaderProduct
            productId={selectedProductId || productToRender.id}
            productsList={fullProductList}
            partyId={renderedPartyId}
            partyList={renderedPartyList}
            onSelectedProduct={onSelectedProduct}
            onSelectedParty={onSelectedParty}
            maxCharactersNumberMultiLineButton={maxCharactersNumberMultiLineButton}
            maxCharactersNumberMultiLineItem={maxCharactersNumberMultiLineItem}
            {...(isPagoPaUser &&
              !isAdminPage && {
                chipLabel: t('common.header.chipLabel'),
                chipColor: 'primary' as const,
                chipSize: 'medium' as const,
              })}
          />
        </nav>
      ) : (
        ''
      )}
    </Fragment>
  );
};

export default Header;
