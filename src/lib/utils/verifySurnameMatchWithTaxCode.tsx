/** It allows you to verify that the surname that the user would be entering corresponds or not with the
 * characters given to the surname in the taxcode.
 * It covers the possible cases and return: TRUE, when the three letters of surname in taxCode doesn't match
 * with the surname entered by the user, otherwise FALSE when they match.
 * */

import { acceptedConsonants, acceptedVowels, specialChar2NormalChar } from './utils';

export const verifySurnameMatchWithTaxCode = (surname: string, fiscalCode?: string) => {
  const fiscalCodeSurname = fiscalCode?.substring(0, 3).toUpperCase();

  const vowelsSurname = fiscalCodeSurname?.match(acceptedVowels)
    ? surname?.toUpperCase().match(acceptedVowels)?.map(specialChar2NormalChar).join('')
    : '';

  const consonantsSurname = fiscalCodeSurname?.match(acceptedConsonants)
    ? surname?.toUpperCase().match(acceptedConsonants)?.map(specialChar2NormalChar).join('')
    : '';

  const expectedFiscalCodeSurname = `${consonantsSurname}${vowelsSurname}XX`.substring(0, 3);

  return fiscalCodeSurname && fiscalCodeSurname !== expectedFiscalCodeSurname;
};
