import { User } from '../../model/User';
import { verifyChecksumMatchWithTaxCode } from '../verifyChecksumMatchWithTaxCode';

const user: User = {
  name: 'MARIO',
  surname: 'ROSSI',
  uid: 'UID23',
  taxCode: 'MRARSS80A01A794I',
  email: 'mario.rossi@comunedi.it',
};

test('test: taxcode checksum is correct, so the function return false (not error)', () => {
  const result = verifyChecksumMatchWithTaxCode(user.taxCode);

  expect(result).toBeFalsy();
});

test('test: taxcode checksum is correct but typed checksum is lowercase, so the function also return false (not error)', () => {
  const result = verifyChecksumMatchWithTaxCode('MRARSS80A01A794i');

  expect(result).toBeFalsy();
});

test('test: taxcode checksum is incorrect, so the function return true (error)', () => {
  const result = verifyChecksumMatchWithTaxCode('MRARSS80A01A794V');

  expect(result).toBeTruthy();
});
