import { productId2ProductTitle } from '../productId2ProductTitle';

test('test: given prod-pn as id, expected the correct product title', () => {
  const result = productId2ProductTitle('prod-pn');
  expect(result).toBe('SEND - Servizio Notifiche Digitali');
});

test('test: given prod-io as id, expected the correct product title', () => {
  const result = productId2ProductTitle('prod-io');
  expect(result).toBe('IO');
});

test('test: given prod-pagopa as id, expected the correct product title', () => {
  const result = productId2ProductTitle('prod-pagopa');
  expect(result).toBe('Piattaforma pagoPA');
});

test('test: given prod-interop as id, expected the correct product title', () => {
  const result = productId2ProductTitle('prod-interop');
  expect(result).toBe('Interoperabilità');
});

test('test: given prod-idpay as id, expected the correct product title', () => {
  const result = productId2ProductTitle('prod-idpay');
  expect(result).toBe('IDPay');
});

test('test: given prod-cgn as id, expected the correct product title', () => {
  const result = productId2ProductTitle('prod-cgn');
  expect(result).toBe('Carta Giovani');
});

test('test: given prod-io-sign as id, expected the correct product title', () => {
  const result = productId2ProductTitle('prod-io-sign');
  expect(result).toBe('Firma con IO');
});

test('test: given prod-fd as id, expected the correct product title', () => {
  const result = productId2ProductTitle('prod-fd');
  expect(result).toBe('Fideiussioni Digitali');
});
