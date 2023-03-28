/** It allows you to verify that the name that the user would be entering corresponds or not with the
 * characters given to the name in the taxcode.
 * It covers the possible cases and return: TRUE, when the three letters of name in taxCode doesn't match
 * with the name entered by the user, otherwise FALSE when they match.
 * */

export const verifyNameMatchWithTaxCode = (name: string, fiscalCode?: string) => {
  const fiscalCodeName = fiscalCode?.substring(3, 6).toUpperCase();

  const consonantsName = name?.match(/[^aeiou]/gi)
    ? name
        ?.match(/[^aeiou]/gi)
        ?.join('')
        .replace(/\s/g, '')
        .replace(/'/g, '')
        .toUpperCase()
    : '';

  const consonantsNameFiltered =
    consonantsName && consonantsName.length >= 4
      ? `${consonantsName?.slice(0, 1)}${consonantsName?.slice(2, 4)}`
      : consonantsName;

  const vowelsName = name?.match(/[aeiou]/gi)
    ? name
        ?.match(/[aeiou]/gi)
        ?.join('')
        .toUpperCase()
    : '';

  const calculatedName = `${consonantsNameFiltered}${vowelsName}XX`.substring(0, 3);

  return calculatedName === fiscalCodeName ? false : fiscalCode;
};
