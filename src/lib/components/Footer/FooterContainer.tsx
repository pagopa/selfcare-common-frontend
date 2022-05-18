import { Footer } from '@pagopa/mui-italia/dist/components/Footer/Footer';
import {
  CompanyLinkType,
  FooterLinksType,
  LangCode,
  LangLabels,
  LinkType,
  PreLoginFooterLinksType,
} from '../../model/Mui-italia-model';

type Languages = Record<LangCode, LangLabels>;

type FooterContainerProps = {
  companyLink: CompanyLinkType;
  postLoginLinks: Array<FooterLinksType>;
  preLoginLinks: PreLoginFooterLinksType;
  legalInfo: JSX.Element | Array<JSX.Element>;
  loggedUser: boolean;
  onExit?: (href: string, linkType: LinkType) => void;
  languages: Languages;
  onLanguageChanged: (newLang: LangCode) => void;
};

export default function FooterContainer({
  companyLink,
  postLoginLinks,
  preLoginLinks,
  legalInfo,
  loggedUser,
  onExit,
  languages,
  onLanguageChanged,
}: FooterContainerProps) {
  return (
    <div>
      <Footer
        companyLink={companyLink}
        postLoginLinks={postLoginLinks}
        preLoginLinks={preLoginLinks}
        legalInfo={legalInfo}
        loggedUser={loggedUser}
        onExit={onExit}
        languages={languages}
        onLanguageChanged={onLanguageChanged}
      />
    </div>
  );
}
