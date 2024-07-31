import { User } from '../../model/User';
import { verifyNameMatchWithTaxCode } from './../verifyNameMatchWithTaxCode';

const user: User = {
  name: 'MARIO',
  surname: 'ROSSI',
  uid: 'UID23',
  taxCode: 'RSSMRA88C24A294U',
  email: 'mario.rossi@comunedi.it',
};

test('test: typing a name leaving the taxCode empty, then no errors will be displayed', () => {
  const result = verifyNameMatchWithTaxCode('LUDOVICO', '');

  expect(result).toBeFalsy();
});

test('test: name have only two consonant, so the first vowel will be taken and match with taxCode', () => {
  const result = verifyNameMatchWithTaxCode(user.name, user.taxCode);

  expect(result).toBeFalsy();
});

test('test: name have only one consonant, so the first two vowel will be taken and match with taxCode', () => {
  const result = verifyNameMatchWithTaxCode('UGO', 'RSSGUO88C24A294U');

  expect(result).toBeFalsy();
});

test('test: name have three consonant, all will be taken and match with taxCode', () => {
  const result = verifyNameMatchWithTaxCode('ANTONIO', 'RSSNTN72D11B321K');

  expect(result).toBeFalsy();
});

test("test: name haven't consonants, all will be taken and match with taxCode", () => {
  const result = verifyNameMatchWithTaxCode('IAIA', 'RSSIAI72D11B321K');

  expect(result).toBeFalsy();
});

test('test: name having apostrophe, the apostrophe is not considered a consonant and match with taxCode', () => {
  const result = verifyNameMatchWithTaxCode("D'AN'T'ON'I'O", 'RSSDTN72D11B321K');

  expect(result).toBeFalsy();
});

test('test: name has more than three consonant (4), so will be taken first, third and fourth consonants and match with taxCode', () => {
  const result = verifyNameMatchWithTaxCode('FILIPPO', 'RSSFPP72D11B321K');

  expect(result).toBeFalsy();
});

test('test: name has more than three consonant (4), so will be taken first, third and fourth consonants and NOT match with taxCode because taxCode have first, second and third', () => {
  const result = verifyNameMatchWithTaxCode('FILIPPO', 'RSSFLP72D11B321K');

  expect(result).toBeTruthy();
});

test('test: name NOT match with taxCode', () => {
  const result = verifyNameMatchWithTaxCode('LUCA', user.taxCode);

  expect(result).toBeTruthy();
});

test('test: tax code check with name with two letters', () => {
  const result = verifyNameMatchWithTaxCode('YU', 'MRTYUX80A01H501W');

  expect(result).toBeFalsy();
});

test('test: tax code check with name with ONE letters', () => {
  const result = verifyNameMatchWithTaxCode('Y', 'RSSYXX80A41H501Y');

  expect(result).toBeFalsy();
});

test('test: tax code check with name with accented letters', () => {
  const result = verifyNameMatchWithTaxCode('DÉMÉ', 'NCLDME80A01F205Q');

  expect(result).toBeFalsy();
});

test('test: tax code check with name with accented letters', () => {
  const firstTest = verifyNameMatchWithTaxCode('Ägid', 'FRNGDA80A01F205Q');
  expect(firstTest).toBeFalsy();

  const secondTest = verifyNameMatchWithTaxCode('Žiga', 'FRNZGI80A01F205Q');
  expect(secondTest).toBeFalsy();

  const thirdTest = verifyNameMatchWithTaxCode('Žiganito', 'FRNZNT80A01F205Q');
  expect(thirdTest).toBeFalsy();

  const fourthTest = verifyNameMatchWithTaxCode('Loïç', 'VNILCO80A01F205L');
  expect(fourthTest).toBeFalsy();

  const fifthTest = verifyNameMatchWithTaxCode('Luçǩ', 'VTILCK80A01F205I');
  expect(fifthTest).toBeFalsy();
});
