import { Footer as MuiItaliaFooter } from '@pagopa/mui-italia/dist/components/Footer/Footer';
import i18n from '../../locale/locale-utils';
import { CONFIG } from '../../config/env';
import {
  companyLegalInfo,
  LANGUAGES,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
} from './FooterConfig';

type FooterProps = {
  loggedUser: boolean;
  onExit?: (exitAction: () => void) => void;
};

export default function Footer({ loggedUser, onExit }: FooterProps) {
  return (
    <MuiItaliaFooter
      companyLink={pagoPALink}
      postLoginLinks={postLoginLinks}
      preLoginLinks={preLoginLinks}
      legalInfo={companyLegalInfo}
      loggedUser={loggedUser}
      onExit={onExit}
      languages={LANGUAGES as any}
      onLanguageChanged={(language: string) => i18n.changeLanguage(language)}
      currentLangCode="it"
      productsJsonUrl={CONFIG.JSON_URL.PRODUCTS}
    />
  );
}
