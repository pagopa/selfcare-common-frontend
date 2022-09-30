/** It allows you to verify that the name that the user would be entering corresponds or not with the
 * characters given to the name in the taxcode.
 * It covers the possible cases and return: TRUE, when the three letters of name in taxCode doesn't match
 * with the name entered by the user, otherwise FALSE when they match.
 * */

// eslint-disable-next-line sonarjs/cognitive-complexity
export const verifyNameMatchWithTaxCode = (name: string, fiscalCode?: string) => {
  const fiscalCodeName = fiscalCode?.substring(3, 6).toLocaleUpperCase();
  const consonantsName = name
    ?.match(/[^aeiou]/gi)
    ?.join('')
    .replace(/\s/g, '')
    .replace("'", '')
    .toLocaleUpperCase();
  if (consonantsName?.length === 3 && fiscalCodeName === consonantsName) {
    return false;
  } else if (consonantsName && consonantsName?.length > 3) {
    const threeNameLetters = consonantsName?.slice(0, 1) + consonantsName?.slice(2, 4);
    if (fiscalCodeName === threeNameLetters) {
      return false;
    }
  } else if (consonantsName && consonantsName?.length === 2) {
    const firstVocalFound = name
      ?.match(/[aeiou]/gi)
      ?.join('')
      .substring(0, 1)
      .toLocaleUpperCase();
    if (firstVocalFound) {
      const threeNameLetters = consonantsName?.concat(firstVocalFound);
      if (fiscalCodeName === threeNameLetters) {
        return false;
      }
    }
  } else if (consonantsName && consonantsName?.length === 1) {
    const firstTwoVocalFound = name
      ?.match(/[aeiou]/gi)
      ?.join('')
      .substring(0, 2)
      .toLocaleUpperCase();
    if (firstTwoVocalFound) {
      const threeNameLetters = consonantsName?.concat(firstTwoVocalFound);
      if (fiscalCodeName === threeNameLetters) {
        return false;
      }
    }
  } else {
    const firstThreeVocalFound = name
      ?.match(/[aeiou]/gi)
      ?.join('')
      .substring(0, 3)
      .toLocaleUpperCase();
    if (fiscalCodeName === firstThreeVocalFound) {
      return false;
    }
  }
  return fiscalCode;
};
