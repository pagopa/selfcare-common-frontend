import { expect, test } from 'vitest';
import { CONFIG } from '../../config/env';
import { User } from '../../model/User';
import { storageUserOps } from '../../utils/storage';
import { buildAssistanceURI } from './../assistanceService';

test('test logged', () => {
  const user: User = {
    name: 'NAME',
    surname: 'SURNAME',
    uid: 'UID',
    taxCode: 'AAAAAA00A00A000A',
    email: 'a@a.aa',
  };

  storageUserOps.write(user);

  const result = buildAssistanceURI('assistance@selfcare.it');

  expect(result).toBe(CONFIG.URL_FE.ASSISTANCE);
});

test('test not logged', () => {
  storageUserOps.delete();

  const result = buildAssistanceURI('assistance@selfcare.it');

  expect(result).toBe('mailto:assistance@selfcare.it');
});
