/** It allows you to verify that the surname that the user would be entering corresponds or not with the
 * characters given to the surname in the taxcode.
 * It covers the possible cases and return: TRUE, when the three letters of surname in taxCode doesn't match
 * with the surname entered by the user, otherwise FALSE when they match.
 * */

export const verifySurnameMatchWithTaxCode = (surname: string, fiscalCode?: string) => {
  const fiscalCodeSurname = fiscalCode?.substring(0, 3).toLocaleUpperCase();
  const consonantsSurname = surname
    .match(/[^aeiou]/gi)
    ?.join('')
    .replace(/\s/g, '')
    .toLocaleUpperCase();
  if (consonantsSurname && consonantsSurname?.length >= 3) {
    const threeSurnameLetters = consonantsSurname?.substring(0, 3);
    return fiscalCodeSurname !== threeSurnameLetters;
  } else {
    const firstVocalFound = surname
      .match(/[aeiou]/gi)
      ?.join('')
      .substring(0, 1)
      .toLocaleUpperCase();
    if (firstVocalFound) {
      const threeSurnameLetters = consonantsSurname?.concat(firstVocalFound);
      return fiscalCodeSurname !== threeSurnameLetters;
    }
  }
  return fiscalCode;
};
