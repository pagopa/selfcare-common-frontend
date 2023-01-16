export const verifyChecksumMatchWithTaxCode = (fiscalCode: string) => {
  const charactersArray = [...fiscalCode];

  const onlyEvenFiscalCodeElements = charactersArray.filter((_c, i) => i % 2 !== 0);
  const onlyOddFiscalCodeElements = charactersArray.filter((_c, i) => i % 2 === 0);

  // eslint-disable-next-line functional/immutable-data
  const insertedCheckSum = onlyEvenFiscalCodeElements.pop();

  const sumOfEvenCharactersConverted = evenCharactersConverter2Numbers(onlyEvenFiscalCodeElements);
  const sumOfOddCharactersConverted = oddCharactersConverter2Numbers(onlyOddFiscalCodeElements);

  const number2Convert2Checksum = (sumOfEvenCharactersConverted + sumOfOddCharactersConverted) % 26;

  const resultingChecksumFromConversion = number2ChecksumConverter(number2Convert2Checksum);

  return resultingChecksumFromConversion !== insertedCheckSum;
};

const evenCharactersConverter2Numbers = (evenCharacters: Array<string>) => {
  const conversionMap = {
    '0': 0,
    '1': 1,
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    A: 0,
    B: 1,
    C: 2,
    D: 3,
    E: 4,
    F: 5,
    G: 6,
    H: 7,
    I: 8,
    J: 9,
    K: 10,
    L: 11,
    M: 12,
    N: 13,
    O: 14,
    P: 15,
    Q: 16,
    R: 17,
    S: 18,
    T: 19,
    U: 20,
    V: 21,
    W: 22,
    X: 23,
    Y: 24,
    Z: 25,
  };
  const convertedEven = evenCharacters.map((c) => conversionMap[c as keyof typeof conversionMap]);
  return convertedEven.reduce((pv, cv) => pv + cv, 0);
};

const oddCharactersConverter2Numbers = (oddCharacters: Array<string>) => {
  const conversionMap = {
    '0': 1,
    '1': 0,
    '2': 5,
    '3': 7,
    '4': 9,
    '5': 13,
    '6': 15,
    '7': 17,
    '8': 19,
    '9': 21,
    A: 1,
    B: 0,
    C: 5,
    D: 7,
    E: 9,
    F: 13,
    G: 15,
    H: 17,
    I: 19,
    J: 21,
    K: 2,
    L: 4,
    M: 18,
    N: 20,
    O: 11,
    P: 3,
    Q: 6,
    R: 8,
    S: 12,
    T: 14,
    U: 16,
    V: 10,
    W: 22,
    X: 25,
    Y: 24,
    Z: 23,
  };
  const convertedOdd = oddCharacters.map((c) => conversionMap[c as keyof typeof conversionMap]);
  return convertedOdd.reduce((pv, cv) => pv + cv, 0);
};

const number2ChecksumConverter = (remainder: number) => {
  const conversionMap = {
    0: 'A',
    1: 'B',
    2: 'C',
    3: 'D',
    4: 'E',
    5: 'F',
    6: 'G',
    7: 'H',
    8: 'I',
    9: 'J',
    10: 'K',
    11: 'L',
    12: 'M',
    13: 'N',
    14: 'O',
    15: 'P',
    16: 'Q',
    17: 'R',
    18: 'S',
    19: 'T',
    20: 'U',
    21: 'V',
    22: 'W',
    23: 'X',
    24: 'Y',
    25: 'Z',
  };
  return conversionMap[remainder as keyof typeof conversionMap];
};
