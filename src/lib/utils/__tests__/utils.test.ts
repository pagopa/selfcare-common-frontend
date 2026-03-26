import { expect } from 'vitest';
import { isPecEmail } from '../utils';

test('returns true for known PEC domains', () => {
  expect(isPecEmail('mario@pec.it')).toBe(true);
  expect(isPecEmail('mario@postecert.it')).toBe(true);
  expect(isPecEmail('mario@legalmail.it')).toBe(true);
  expect(isPecEmail('mario@pec.namirial.it')).toBe(true);
  expect(isPecEmail('mario@pec.libero.it')).toBe(true);
});

test('returns false for regular emails', () => {
  expect(isPecEmail('mario@gmail.com')).toBe(false);
  expect(isPecEmail('mario@company.it')).toBe(false);
  expect(isPecEmail('mario@outlook.com')).toBe(false);
});
