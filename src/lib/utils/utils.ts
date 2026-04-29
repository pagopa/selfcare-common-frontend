import { isPagoPaUser } from './storage';

export const formatDateAsLongString = (date: Date): string => {
  const ye = new Intl.DateTimeFormat('it', { year: 'numeric' }).format(date);
  const mo = new Intl.DateTimeFormat('it', { month: 'long' }).format(date);
  const da = new Intl.DateTimeFormat('it', { day: '2-digit' }).format(date);

  return `${da} ${mo} ${ye}`;
};

export const specialCharacters: { [key: string]: string } = {
  À: 'A',
  Á: 'A',
  Â: 'A',
  Ã: 'A',
  Ä: 'A',
  Å: 'A',
  Æ: 'AE',
  Ç: 'C',
  È: 'E',
  É: 'E',
  Ê: 'E',
  Ë: 'E',
  Ì: 'I',
  Í: 'I',
  Î: 'I',
  Ï: 'I',
  Ð: 'D',
  Ñ: 'N',
  Ò: 'O',
  Ó: 'O',
  Ô: 'O',
  Õ: 'O',
  Ö: 'O',
  Ø: 'O',
  Ù: 'U',
  Ú: 'U',
  Û: 'U',
  Ü: 'U',
  Ý: 'Y',
  Þ: 'TH',
  ß: 'SS',
  Ā: 'A',
  Ē: 'E',
  Ī: 'I',
  Ō: 'O',
  Ū: 'U',
  Ų: 'U',
  Ĺ: 'L',
  Ŕ: 'R',
  Ŝ: 'S',
  Ţ: 'T',
  Ŵ: 'W',
  Ŷ: 'Y',
  Ź: 'Z',
  Ż: 'Z',
  Ẑ: 'Z',
  Ẓ: 'Z',
  Ẕ: 'E',
  Ğ: 'G',
  İ: 'I',
  Ş: 'S',
  Ț: 'T',
  Ă: 'A',
  Ḩ: 'H',
  Ṧ: 'S',
  ẞ: 'B',
  Ȳ: 'Y',
  Α: 'A',
  Β: 'B',
  Γ: 'G',
  Δ: 'D',
  Ε: 'E',
  Ζ: 'Z',
  Η: 'H',
  Θ: 'TH',
  Ι: 'I',
  Κ: 'K',
  Ǩ: 'K',
  Λ: 'L',
  Μ: 'M',
  Ν: 'N',
  Ξ: 'X',
  Ο: 'O',
  Π: 'P',
  Ρ: 'R',
  Σ: 'S',
  Τ: 'T',
  Υ: 'Y',
  Φ: 'F',
  Χ: 'CH',
  Ψ: 'PS',
  Ω: 'O',
  א: 'A',
  ב: 'B',
  ג: 'G',
  ד: 'D',
  أ: 'A',
  ج: 'J',
  ɐ: 'a',
  ʍ: 'w',
  ɥ: 'h',
  ɲ: 'n',
  Ž: 'Z',
  Œ: 'OE',
  Ǟ: 'A',
  Ǽ: 'AE',
  Ǣ: 'AE',
  Š: 'S',
  ǋ: 'N',
  Ǧ: 'G',
  Ḃ: 'B',
  Ḋ: 'D',
  Ḫ: 'H',
  Ķ: 'K',
  Ḻ: 'L',
  Ḵ: 'K',
  Ṅ: 'N',
  Ṯ: 'T',
  Ɓ: 'B',
  Ƈ: 'C',
  Ɣ: 'G',
  Ɲ: 'N',
  Ƥ: 'P',
  Ƨ: 'S',
  Ƭ: 'T',
  Ʋ: 'V',
  Ƴ: 'Y',
  Ƶ: 'Z',
  Č: 'C',
};

export const specialChar2NormalChar = (char: string) => specialCharacters[char] || char;

export const acceptedVowels = /[aeiouàèìòùáéíóúäëïöüâêîôûæœǝɐɑɒ]/gi;
export const acceptedConsonants = /[bcdfghjklmnpqrstvwxyzñçčšžǩßḃḍḫķḻḳṅṯẓẟẝƁƇƔƝƤƧƬƲƳƵʍʜʎɹɾʃʒʔɲ]/gi;

const PEC_PATTERNS = [/@pec\./i, /@postecert\./i, /@legalmail\./i];

export const isPecEmail = (email: string): boolean =>
  PEC_PATTERNS.some((pattern) => pattern.test(email));

type AppArea = 'imprese' | 'ar_backstage' | 'area_riservata';

const IMPRESE_URL_PREFIXES = [
  'https://imprese.notifichedigitali.it',
  'https://imprese.uat.notifichedigitali.it',
  'https://pnpg.dev.selfcare.pagopa.it',
] as const;

export const getAppArea = (): AppArea => {
  const currentUrl = window.location.origin + window.location.pathname;

  if (IMPRESE_URL_PREFIXES.some((prefix) => currentUrl.startsWith(prefix))) {
    return 'imprese';
  }

  if (isPagoPaUser()) {
    return 'ar_backstage';
  }

  return 'area_riservata';
};
