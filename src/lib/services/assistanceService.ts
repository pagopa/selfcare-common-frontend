
import isEmpty from 'lodash/isEmpty';
import { CONFIG } from '../config/env';
import { storageRead } from '../utils/storage-utils';
import { STORAGE_KEY_USER } from '../utils/constants';
import { trackEvent } from './analyticsService';

export const buildAssistanceURI = (assistanceEmail?: string) => {

    const sessionStorageUser = storageRead(STORAGE_KEY_USER, 'object');
    
    if (isEmpty(sessionStorageUser)) {
        trackEvent('CUSTOMER_CARE_MAILTO', { event_name: 'CUSTOMER_CARE_MAILTO' });
        return `mailto:${assistanceEmail}`;
    }  else {
        return CONFIG.URL_FE.ASSISTANCE;
    }
};
