import { PreLoginFooterLinksType, FooterLinksType, CompanyLinkType } from '@pagopa/mui-italia';
import { CONFIG } from '../../config/env';

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
  href: CONFIG.FOOTER.LINK.PAGOPALINK,
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
};

declare const window: any;

export const postLoginLinks: Array<FooterLinksType> = [
  {
    label: 'Privacy policy',
    href: CONFIG.FOOTER.LINK.PRIVACYPOLICY,
    ariaLabel: 'Vai al link: Privacy policy',
    linkType: 'internal',
  },
  {
    label: 'Diritto alla protezione dei dati personali',
    href: CONFIG.FOOTER.LINK.PROTECTIONOFPERSONALDATA,
    ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
    linkType: 'internal',
  },
  {
    label: 'Termini e condizioni',
    href: CONFIG.FOOTER.LINK.TERMSANDCONDITIONS,
    ariaLabel: 'Vai al link: Termini e condizioni',
    linkType: 'internal',
  },
  // TODO
  // {
  //   label: 'Accessibilità',
  //   href: CONFIG.FOOTER.LINK.ACCESSIBILITY,
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
      //   label: 'PNRR',
      //   href: 'CONFIG.FOOTER.LINK.PNRR',
      //   ariaLabel: 'Vai al link: PNRR',
      //   linkType: 'internal',
      // },
      {
        label: 'PagoPA S.p.A.',
        href: CONFIG.FOOTER.LINK.ABOUTUS,
        ariaLabel: 'Vai al link: Chi siamo',
        linkType: 'internal',
      },
      {
        label: 'Media',
        href: CONFIG.FOOTER.LINK.MEDIA,
        ariaLabel: 'Vai al link: Media',
        linkType: 'internal',
      },
      {
        label: 'Lavora con noi',
        href: CONFIG.FOOTER.LINK.WORKWITHUS,
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
        href: CONFIG.FOOTER.LINK.PRIVACYPOLICY,
        ariaLabel: 'Vai al link: Privacy Policy',
        linkType: 'internal',
      },
      {
        label: 'Certificazioni',
        href: CONFIG.FOOTER.LINK.CERTIFICATIONS,
        ariaLabel: 'Vai al link: Certificazioni',
        linkType: 'internal',
      },
      {
        label: 'Sicurezza delle informazioni',
        href: CONFIG.FOOTER.LINK.INFORMATIONSECURITY,
        ariaLabel: 'Vai al link: Sicurezza delle informazioni',
        linkType: 'internal',
      },
      {
        label: 'Diritto alla protezione dei dati personali',
        href: CONFIG.FOOTER.LINK.PROTECTIONOFPERSONALDATA,
        ariaLabel: 'Vai al link: Diritto alla protezione dei dati personali',
        linkType: 'internal',
      },
      {
        label: 'Preferenze Cookie',
        onClick: () => window.OneTrust.ToggleInfoDisplay(),
        ariaLabel: 'Vai al link: Preferenze Cookie',
        linkType: 'internal',
      },
      {
        label: 'Termini e Condizioni',
        href: CONFIG.FOOTER.LINK.TERMSANDCONDITIONS,
        ariaLabel: 'Vai al link: Termini e Condizioni',
        linkType: 'internal',
      },
      {
        label: 'Società trasparente',
        href: CONFIG.FOOTER.LINK.TRANSPARENTCOMPANY,
        ariaLabel: 'Vai al link: Società trasparente',
        linkType: 'internal',
      },
      {
        label: 'Responsible Disclosure Policy',
        href: CONFIG.FOOTER.LINK.DISCLOSUREPOLICY,
        ariaLabel: 'Vai al link: Responsible Disclosure Policy',
        linkType: 'internal',
      },
      {
        label: 'Modello 321',
        href: CONFIG.FOOTER.LINK.MODEL321,
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
        href: CONFIG.FOOTER.LINK.LINKEDIN,
        ariaLabel: 'Link: vai al sito LinkedIn di PagoPA S.p.A.',
      },
      {
        title: 'Twitter',
        icon: 'twitter',
        href: CONFIG.FOOTER.LINK.TWITTER,
        ariaLabel: 'Link: vai al sito Twitter di PagoPA S.p.A.',
      },
      {
        icon: 'instagram',
        title: 'Instagram',
        href: CONFIG.FOOTER.LINK.INSTAGRAM,
        ariaLabel: 'Link: vai al sito Instagram di PagoPA S.p.A.',
      },
      {
        icon: 'medium',
        title: 'Medium',
        href: CONFIG.FOOTER.LINK.MEDIUM,
        ariaLabel: 'Link: vai al sito Medium di PagoPA S.p.A.',
      },
    ],
    links: [
      // TODO
      // {
      //   label: 'Accessibilità',
      //   href: CONFIG.FOOTER.LINK.ACCESSIBILITY,
      //   ariaLabel: 'Vai al link: Accessibilità',
      //   linkType: 'internal',
      // },
    ],
  },
};

export const LANGUAGES = {
  it: { it: 'Italiano' },
};
