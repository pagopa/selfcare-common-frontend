import { CompanyLinkType } from '@pagopa/mui-italia';
import { CONFIG } from '../../config/env';

export const pagoPALink: CompanyLinkType = {
  href: CONFIG.FOOTER.LINK.PAGOPALINK,
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
};

declare const window: any;

export const LANGUAGES = {
  it: {
    it: 'Italiano',
    en: 'Inglese',
    fr: 'Francese',
    de: 'Tedesco',
    sl: 'Sloveno',
  },
  en: {
    it: 'Italian',
    en: 'English',
    fr: 'French',
    de: 'German',
    sl: 'Slovene',
  },
  fr: {
    it: 'Italien',
    en: 'Anglais',
    fr: 'Français',
    de: 'Allemand',
    sl: 'Slovène',
  },
  de: {
    it: 'Italienisch',
    en: 'Englisch',
    fr: 'Französisch',
    de: 'Deutsch',
    sl: 'Slowenisch',
  },
  sl: {
    it: 'Italienisch',
    en: 'Angleščina',
    fr: 'Französisch',
    de: 'Nemščina',
    sl: 'Slovenski',
  },
};
