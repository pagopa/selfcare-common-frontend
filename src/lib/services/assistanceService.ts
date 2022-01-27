
import isEmpty from 'lodash/isEmpty';
import { CONFIG } from '../config/env';
import { storageRead } from '../utils/storage-utils';
import { STORAGE_KEY_USER } from '../utils/constants';

export const buildAssistanceURI = (assistanceEmail?: string) => {

    const sessionStorageUser = storageRead(STORAGE_KEY_USER, 'object');
    
    if (isEmpty(sessionStorageUser)) {
        return `mailto:${assistanceEmail}`;
    }  else {
        return CONFIG.URL_FE.ASSISTANCE;
    }
};
