import { CompanyLinkType } from '@pagopa/mui-italia';
import { CONFIG } from '../../config/env';

export type LangCode = 'it' | 'en';

export const pagoPALink: CompanyLinkType = {
  href: CONFIG.FOOTER.LINK.PAGOPALINK,
  ariaLabel: 'Link: vai al sito di PagoPA S.p.A.',
};

declare const window: any;

export const LANGUAGES = {
  it: { it: 'Italiano' },
  en: { en: 'Inglese' },
  de: { de: 'Tedesco' },
  fr: { fr: 'Francese' },
  sl: { sl: 'Sloveno' },
};
