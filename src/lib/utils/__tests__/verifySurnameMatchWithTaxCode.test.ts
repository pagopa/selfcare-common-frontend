import { User } from '../../model/User';
import { verifySurnameMatchWithTaxCode } from './../verifySurnameMatchWithTaxCode';

const user: User = {
  name: 'MARIO',
  surname: 'ROSSI',
  uid: 'UID23',
  taxCode: 'RSSMRA88C24A294U',
  email: 'mario.rossi@comunedi.it',
};

test('test: surname have only two consonants, first vocal it will be taken and match with taxCode', () => {
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

test('test: surname NOT match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode('BIANCHI', user.taxCode);

  expect(result).toBeTruthy();
});

test('test: surname have only two consonants, first vocal it will be taken and NOT match with taxCode', () => {
  const result = verifySurnameMatchWithTaxCode('ROSI', user.taxCode);

  expect(result).toBeTruthy();
});
