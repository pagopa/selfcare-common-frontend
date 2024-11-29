/** It allows you to verify that the name that the user would be entering corresponds or not with the
 * characters given to the name in the taxcode.
 * It covers the possible cases and return: TRUE, when the three letters of name in taxCode doesn't match
 * with the name entered by the user, otherwise FALSE when they match.
 * */

import { acceptedConsonants, acceptedVowels, specialChar2NormalChar } from './utils';

export const verifyNameMatchWithTaxCode = (name: string, fiscalCode?: string) => {
  const fiscalCodeName = fiscalCode?.substring(3, 6).toUpperCase();

  const consonantsName = name?.match(acceptedConsonants)
    ? name
        ?.toUpperCase()
        ?.match(acceptedConsonants)
        ?.map(specialChar2NormalChar)
        ?.join('')
        .replace(/\s/g, '')
        .replace(/'/g, '')
        .replace(/-/g, '')
    : '';

  const fiscalCodeConsonantName =
    consonantsName && consonantsName.length >= 4
      ? `${consonantsName?.slice(0, 1)}${consonantsName?.slice(2, 4)}`
      : consonantsName;

  const vowelsName = name?.match(acceptedVowels)
    ? name?.toUpperCase()?.match(acceptedVowels)?.map(specialChar2NormalChar).join('')
    : '';

  const expectedFiscalCodeName = `${fiscalCodeConsonantName}${vowelsName}XX`.substring(0, 3);

  return fiscalCodeName && fiscalCodeName !== expectedFiscalCodeName;
};
