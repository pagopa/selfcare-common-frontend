/** It allows you to verify that the surname that the user would be entering corresponds or not with the
 * characters given to the surname in the taxcode.
 * It covers the possible cases and return: TRUE, when the three letters of surname in taxCode doesn't match
 * with the surname entered by the user, otherwise FALSE when they match.
 * */

export const verifySurnameMatchWithTaxCode = (surname: string, fiscalCode?: string) => {
  const fiscalCodeSurname = fiscalCode?.substring(0, 3).toUpperCase();

  const consonantsSurname = surname?.match(/[^aeiou]/gi)
    ? surname
        ?.match(/[^aeiou]/gi)
        ?.join('')
        .replace(/\s/g, '')
        .replace(/'/g, '')
        .toUpperCase()
    : '';

  const vowelsSurname = surname?.match(/[aeiou]/gi)
    ? surname
        ?.match(/[aeiou]/gi)
        ?.join('')
        .toUpperCase()
    : '';

  const calculatedSurname = `${consonantsSurname}${vowelsSurname}XX`.substring(0, 3);

  return calculatedSurname === fiscalCodeSurname ? false : fiscalCode;
};
