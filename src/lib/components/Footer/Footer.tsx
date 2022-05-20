import { Footer as MuiItaliaFooter } from '@pagopa/mui-italia/dist/components/Footer/Footer';
import i18n from '../../locale/locale-utils';
import {
  CompanyLinkType,
  FooterLinksType,
  LangCode,
  LinkType,
  PreLoginFooterLinksType,
} from '../../model/Mui-italia-model';

type FooterProps = {
  loggedUser: boolean;
  onExit?: (href: string, linkType: LinkType) => void;
  onLanguageChanged?: (newLang: LangCode) => void;
};

const companyLegalInfo = (
  <>
    <strong>PagoPA S.p.A.</strong> — società per azioni con socio unico - capitale sociale di euro
    1,000,000 interamente versato - sede legale in Roma, Piazza Colonna 370,
    <br />
    CAP 00187 - n. di iscrizione a Registro Imprese di Roma, CF e P.IVA 15376371009
  </>
);

export const pagoPALink: CompanyLinkType = {
  href: 'https://www.pagopa.it/',
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
};
const termsAndConditionHref = 'https://www.pagopa.it/it/termini-e-condizioni-di-utilizzo-del-sito/';

const postLoginLinks: Array<FooterLinksType> = [
  {
    label: 'Privacy policy',
    href: 'https://www.pagopa.it/it/privacy-policy/',
    ariaLabel: 'Vai al link: Privacy policy',
    linkType: 'internal',
  },
  {
    label: 'Diritto alla protezione dei dati personali',
    href: '#diritto-allaprotezionedipersonalidati', // TODO
    ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
    linkType: 'internal',
  },
  {
    label: 'Termini e condizioni',
    href: termsAndConditionHref,
    ariaLabel: 'Vai al link: Termini e condizioni',
    linkType: 'internal',
  },
  {
    label: 'Accessibilità',
    href: '#accessibility', // TODO
    ariaLabel: 'Vai al link: Accessibilità',
    linkType: 'internal',
  },
];

const preLoginLinks: PreLoginFooterLinksType = {
  // First column
  aboutUs: {
    title: undefined,
    links: [
      {
        label: 'Chi siamo',
        href: '#chi-siamo', // TODO
        ariaLabel: 'Vai al link: Chi siamo',
        linkType: 'internal',
      },
      {
        label: 'PNRR',
        href: '#pnrr', // TODO
        ariaLabel: 'Vai al link: PNRR',
        linkType: 'internal',
      },
      {
        label: 'Media',
        href: '#media', // TODO
        ariaLabel: 'Vai al link: Media',
        linkType: 'internal',
      },
      {
        label: 'Lavora con noi',
        href: '#lavora-con-noi', // TODO
        ariaLabel: 'Vai al link: Lavora con noi',
        linkType: 'internal',
      },
    ],
  },
  // Second column
  productsAndServices: {
    title: 'Prodotti e Servizi',
    links: [
      {
        label: 'App IO',
        href: '#app-io', // TODO
        ariaLabel: 'Vai al link: App IO',
        linkType: 'internal',
      },
      {
        label: 'Piattaforma pagoPA',
        href: '#piattaforma-pagoPA', // TODO
        ariaLabel: 'Vai al link: Piattaforma pagoPA',
        linkType: 'internal',
      },
      {
        label: 'Centro stella',
        href: '#centro-stella', // TODO
        ariaLabel: 'Vai al link: Centro stella',
        linkType: 'internal',
      },
      {
        label: 'Check IBAN',
        href: '#check-iban', // TODO
        ariaLabel: 'Vai al link: Check IBAN',
        linkType: 'internal',
      },
      {
        label: 'Piattaforma Notifiche Digitali',
        href: '#pn-digitali', // TODO
        ariaLabel: 'Vai al link: Piattaforma Notifiche Digitali',
        linkType: 'internal',
      },
      {
        label: 'Piattaforma Digitale Nazionale Dati',
        href: '#pdnd', // TODO
        ariaLabel: 'Vai al link: Piattaforma Digitale Nazionale Dati',
        linkType: 'internal',
      },
      {
        label: 'Interoperabilità',
        href: '#interoperabilita', // TODO
        ariaLabel: 'Vai al link: Interoperabilità',
        linkType: 'internal',
      },
      {
        label: 'Self Care',
        href: '#self-care', // TODO
        ariaLabel: 'Vai al link: Self Care',
        linkType: 'internal',
      },
    ],
  },
  // Third column
  resources: {
    title: 'Risorse',
    links: [
      {
        label: 'Privacy Policy',
        href: '#privacy-policy', // TODO
        ariaLabel: 'Vai al link: Privacy Policy',
        linkType: 'internal',
      },
      {
        label: 'Certificazioni',
        href: '#certificazioni', // TODO
        ariaLabel: 'Vai al link: Certificazioni',
        linkType: 'internal',
      },
      {
        label: 'Sicurezza delle informazioni',
        href: 'https://www.pagopa.it/static/781646994f1f8ddad2d95af3aaedac3d/Sicurezza-delle-informazioni_PagoPA-S.p.A..pdft',
        ariaLabel: 'Vai al link: Sicurezza delle informazioni',
        linkType: 'internal',
      },
      {
        label: 'Diritto alla protezione dei dati personali',
        href: '#diritto-alla-protezione-dei-dati-personali', // TODO
        ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
        linkType: 'internal',
      },
      {
        label: 'Preferenze Cookie',
        href: '#preferenze-cookie', // TODO
        ariaLabel: 'Vai al link: Preferenze Cookie',
        linkType: 'internal',
      },
      {
        label: 'Termini e Condizioni',
        href: termsAndConditionHref,
        ariaLabel: 'Vai al link: Termini e Condizioni',
        linkType: 'internal',
      },
      {
        label: 'Società trasparente',
        href: '#societa-trasparente', // TODO
        ariaLabel: 'Vai al link: Società trasparente',
        linkType: 'internal',
      },
      {
        label: 'Responsible Disclosure Policy',
        href: '#responsible-disclosure-policy', // TODO
        ariaLabel: 'Vai al link: Responsible Disclosure Policy',
        linkType: 'internal',
      },
      {
        label: 'Modello 321',
        href: '#modello-321', // TODO
        ariaLabel: 'Vai al link: Modello 321',
        linkType: 'internal',
      },
    ],
  },
  // Fourth column
  followUs: {
    title: 'Seguici su',
    socialLinks: [
      {
        icon: 'linkedin',
        title: 'LinkedIn',
        href: 'https://www.linkedin.com/company/pagopa/',
        ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
      },
      {
        title: 'Twitter',
        icon: 'twitter',
        href: 'https://twitter.com/pagopa',
        ariaLabel: 'Link: vai al sito Twitter di PagoPA S.p.A.',
      },
      {
        icon: 'instagram',
        title: 'Instagram',
        href: 'https://www.instagram.com/pagopa/',
        ariaLabel: 'Link: vai al sito Instagram di PagoPA S.p.A.',
      },
      {
        icon: 'medium',
        title: 'Medium',
        href: 'https://medium.com/pagopa',
        ariaLabel: 'Link: vai al sito Medium di PagoPA S.p.A.',
      },
    ],
    links: [
      {
        label: 'Accessibilità',
        href: '#accessibilità', // TODO
        ariaLabel: 'Vai al link: Accessibilità',
        linkType: 'internal',
      },
    ],
  },
};

const LANGUAGES = {
  it: { it: 'Italiano', en: 'Inglese' },
  en: { it: 'Italian', en: 'English' },
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
