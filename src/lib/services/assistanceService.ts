import isEmpty from 'lodash/isEmpty';
import { CONFIG } from '../config/env';
import { storageUserOps } from '../utils/storage';
import { trackEvent } from './analyticsService';

export const buildAssistanceURI = (assistanceEmail?: string) => {
  const sessionStorageUser = storageUserOps.read();

  if (isEmpty(sessionStorageUser)) {
    trackEvent('CUSTOMER_CARE_MAILTO');
    return `mailto:${assistanceEmail}`;
  } else {
    return CONFIG.URL_FE.ASSISTANCE;
  }
};
