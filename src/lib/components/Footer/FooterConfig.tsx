import { PreLoginFooterLinksType, FooterLinksType, CompanyLinkType } from '@pagopa/mui-italia';

export type LangCode = 'it' | 'en';

export const companyLegalInfo = (
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
const protectionOfPersonalData =
  'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8';
const privacyPolicy = 'https://www.pagopa.it/it/privacy-policy/';
// const accessibility = '';  TODO

export const postLoginLinks: Array<FooterLinksType> = [
  {
    label: 'Privacy policy',
    href: privacyPolicy,
    ariaLabel: 'Vai al link: Privacy policy',
    linkType: 'internal',
  },
  {
    label: 'Diritto alla protezione dei dati personali',
    href: protectionOfPersonalData,
    ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
    linkType: 'internal',
  },
  {
    label: 'Termini e condizioni',
    href: termsAndConditionHref,
    ariaLabel: 'Vai al link: Termini e condizioni',
    linkType: 'internal',
  },
  // TODO
  // {
  //   label: 'Accessibilità',
  //   href: accessibility,
  //   ariaLabel: 'Vai al link: Accessibilità',
  //   linkType: 'internal',
  // },
];

export const preLoginLinks: PreLoginFooterLinksType = {
  // First column
  aboutUs: {
    title: undefined,
    links: [
      // TODO
      // {
      //   label: 'Chi siamo',
      //   href: '#chi-siamo',
      //   ariaLabel: 'Vai al link: Chi siamo',
      //   linkType: 'internal',
      // },
      // TODO
      // {
      //   label: 'PNRR',
      //   href: '#pnrr',
      //   ariaLabel: 'Vai al link: PNRR',
      //   linkType: 'internal',
      // },
      {
        label: 'Media',
        href: 'https://www.pagopa.it/it/',
        ariaLabel: 'Vai al link: Media',
        linkType: 'internal',
      },
      {
        label: 'Lavora con noi',
        href: 'https://www.pagopa.it/it/lavora-con-noi/',
        ariaLabel: 'Vai al link: Lavora con noi',
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
        href: privacyPolicy,
        ariaLabel: 'Vai al link: Privacy Policy',
        linkType: 'internal',
      },
      {
        label: 'Certificazioni',
        href: 'https://www.pagopa.it/static/10ffe3b3d90ecad83d1bbebea0512188/Certificato-SGSI-PagoPA-2020.pdf',
        ariaLabel: 'Vai al link: Certificazioni',
        linkType: 'internal',
      },
      {
        label: 'Sicurezza delle informazioni',
        href: 'https://www.pagopa.it/static/781646994f1f8ddad2d95af3aaedac3d/Sicurezza-delle-informazioni_PagoPA-S.p.A..pdf',
        ariaLabel: 'Vai al link: Sicurezza delle informazioni',
        linkType: 'internal',
      },
      {
        label: 'Diritto alla protezione dei dati personali',
        href: protectionOfPersonalData,
        ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
        linkType: 'internal',
      },
      // TODO
      // {
      //   label: 'Preferenze Cookie',
      //   href: '#preferenze-cookie',
      //   ariaLabel: 'Vai al link: Preferenze Cookie',
      //   linkType: 'internal',
      // },
      {
        label: 'Termini e Condizioni',
        href: termsAndConditionHref,
        ariaLabel: 'Vai al link: Termini e Condizioni',
        linkType: 'internal',
      },
      {
        label: 'Società trasparente',
        href: 'https://pagopa.portaleamministrazionetrasparente.it/',
        ariaLabel: 'Vai al link: Società trasparente',
        linkType: 'internal',
      },
      {
        label: 'Responsible Disclosure Policy',
        href: 'https://www.pagopa.it/it/responsible-disclosure-policy/',
        ariaLabel: 'Vai al link: Responsible Disclosure Policy',
        linkType: 'internal',
      },
      {
        label: 'Modello 321',
        href: 'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.html',
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
        href: 'https://www.instagram.com/pagopaspa/',
        ariaLabel: 'Link: vai al sito Instagram di PagoPA S.p.A.',
      },
      {
        icon: 'medium',
        title: 'Medium',
        href: 'https://medium.com/pagopa-spa',
        ariaLabel: 'Link: vai al sito Medium di PagoPA S.p.A.',
      },
    ],
    links: [
      // TODO
      // {
      //   label: 'Accessibilità',
      //   href: accessibility,
      //   ariaLabel: 'Vai al link: Accessibilità',
      //   linkType: 'internal',
      // },
    ],
  },
};

export const LANGUAGES = {
  it: { it: 'Italiano' },
};
