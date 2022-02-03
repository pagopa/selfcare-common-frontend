import mixpanel from 'mixpanel-browser';
import { CONFIG } from '../config/env';

export const GENERIC_EVENT = 'GENERIC_EVENT';

// eslint-disable-next-line functional/no-let
let init = false;

export const initAnalytics = (): void => {
  if (CONFIG.ANALYTCS.ENABLE) {
    init = true;
    if (CONFIG.ANALYTCS.MOCK) {
      // eslint-disable-next-line no-console
      console.log('Mixpanel events mock on console log.');
    } else {
      mixpanel.init(CONFIG.ANALYTCS.TOKEN, {
        api_host: CONFIG.ANALYTCS.API_HOST,
        persistence: CONFIG.ANALYTCS.PERSISTENCE as 'cookie' | 'localStorage',
        ip: CONFIG.ANALYTCS.LOG_IP,
        property_blacklist: CONFIG.ANALYTCS.PROPERTY_BLACKLIST,
        debug: CONFIG.ANALYTCS.DEBUG,
      });
    }
  }
};

export const trackEvent = (event_name: string, properties?: any): void => {
  if (CONFIG.ANALYTCS.ENABLE && init) {
    if (CONFIG.ANALYTCS.MOCK) {
      // eslint-disable-next-line no-console
      console.log(event_name, properties);
    } else {
      try {
        mixpanel.track(event_name, {
          ...CONFIG.ANALYTCS.ADDITIONAL_PROPERTIES,
          ...properties,
          ...CONFIG.ANALYTCS.ADDITIONAL_PROPERTIES_IMPORTANT,
        });
      } catch (reason) {
        console.error('Something gone wrong while sending data to mixpanel:', reason);
        // eslint-disable-next-line no-console
        console.log(event_name, properties);
      }
    }
  } else if (event_name === GENERIC_EVENT) {
    console.error(properties);
  }
};
