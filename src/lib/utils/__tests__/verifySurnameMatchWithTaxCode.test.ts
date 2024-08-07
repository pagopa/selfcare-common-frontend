import { User } from '../../model/User';
import { verifySurnameMatchWithTaxCode } from './../verifySurnameMatchWithTaxCode';

const user: User = {
  name: 'MARIO',
  surname: 'ROSSI',
  uid: 'UID23',
  taxCode: 'RSSMRA88C24A294U',
  email: 'mario.rossi@comunedi.it',
};

test('test: typing a surname leaving the taxCode empty, then no errors will be displayed', () => {
  const result = verifySurnameMatchWithTaxCode('BIANCHINI', '');

  expect(result).toBeFalsy();
});

test('test: surname have only two consonants, first vocal it will be taken and NOT match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode('ROSI', 'RSIMRA88C24A294U');

  expect(result).toBeTruthy();
});

test('test: surname have only three consonants, it will be taken and match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode(user.surname, user.taxCode);

  expect(result).toBeFalsy();
});

test('test: surname have more than three consonants (4), first 3 will be taken and match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode('BIANCHINI', 'BNCMRA99D23B442K');

  expect(result).toBeFalsy();
});

test('test: surname having apostrophe, the apostrophe is not considered a consonant and match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode("D'ALE'SSA'ND'RO", 'DLSMRA72D11B321K');

  expect(result).toBeFalsy();
});

test('test: surname have one consonant, first 2 vowels will be taken and match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode('UGO', 'GUOMRA99D23B442K');

  expect(result).toBeFalsy();
});

test("test: surname haven't consonants, first 3 vowels will be taken and match with taxCode", () => {
  const result = verifySurnameMatchWithTaxCode('IAIA', 'IAIMRA99D23B442K');

  expect(result).toBeFalsy();
});

test('test: surname NOT match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode('BIANCHI', user.taxCode);

  expect(result).toBeTruthy();
});

test('test: surname have only two consonants, first vocal it will be taken and NOT match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode('ROSI', user.taxCode);

  expect(result).toBeTruthy();
});

test('test: tax code check with surname with two letters', () => {
  const result = verifySurnameMatchWithTaxCode('LY', 'LYXRSS80A01H501K');

  expect(result).toBeFalsy();
});

test('test: tax code check with surname with one letter', () => {
  const result = verifySurnameMatchWithTaxCode('L', 'LXXTRS80A41H501L');

  expect(result).toBeFalsy();
});

test('test: tax code check with name with ONE letters', () => {
  const result = verifySurnameMatchWithTaxCode('DÉMÉ', 'DMENCL80A01F205Q');

  expect(result).toBeFalsy();
});

test('test: tax code check with some names with accented letters', () => {
  const firstTest = verifySurnameMatchWithTaxCode('Ägid', 'GDAFRN80A01F205Q');
  expect(firstTest).toBeFalsy();

  const secondTest = verifySurnameMatchWithTaxCode('Žiga', 'ZGIFRN80A01F205Q');
  expect(secondTest).toBeFalsy();

  const thirdTest = verifySurnameMatchWithTaxCode('Žiganito', 'ZGNFRN80A01F205Q');
  expect(thirdTest).toBeFalsy();

  const fourthTest = verifySurnameMatchWithTaxCode('Deščak', 'DSCFRN80A01F205Q');
  expect(fourthTest).toBeFalsy();

  const fifthTest = verifySurnameMatchWithTaxCode('Kèrbašič', 'KRBMLN80A01F205N');
  expect(fifthTest).toBeFalsy();
});
