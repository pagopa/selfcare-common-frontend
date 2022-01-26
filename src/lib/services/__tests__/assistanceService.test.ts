import { CONFIG } from "../../config/env";
import { User } from "../../model/User";
import { STORAGE_KEY_USER } from "../../utils/constants";
import { storageDelete, storageWrite } from "../../utils/storage-utils";
import { buildAssistanceURI } from './../assistanceService';

test('test logged', () => {
    const user: User = {
        name: 'NAME',
        surname: 'SURNAME',
        uid: 'UID',
        taxCode: 'AAAAAA00A00A000A',
        email: 'a@a.aa',
      };
    
      storageWrite(STORAGE_KEY_USER, user, 'object');

      const result = buildAssistanceURI('assistance@selfcare.it')

      expect(result).toBe(CONFIG.URL_FE.ASSISTANCE);
});

test('test not logged', () => {

    storageDelete(STORAGE_KEY_USER);
    
    const result = buildAssistanceURI('assistance@selfcare.it')

    expect(result).toBe('mailto:assistance@selfcare.it');
});
