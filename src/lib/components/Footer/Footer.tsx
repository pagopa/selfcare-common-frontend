import { Footer as MuiItaliaFooter } from '@pagopa/mui-italia/dist/components/Footer/Footer';
import { LinkType } from '@pagopa/mui-italia';
import i18n from '../../locale/locale-utils';
import {
  companyLegalInfo,
  LANGUAGES,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
} from './FooterConfig';

type FooterProps = {
  loggedUser: boolean;
  onExit?: (href: string, linkType: LinkType) => void;
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
      languages={LANGUAGES}
      onLanguageChanged={(language: string) => i18n.changeLanguage(language)}
      currentLangCode="it"
    />
  );
}
