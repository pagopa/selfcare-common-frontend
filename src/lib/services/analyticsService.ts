import mixpanel from 'mixpanel-browser';
import { CONFIG } from '../config/env';
import { AppError } from '../redux/slices/appStateSlice';

// eslint-disable-next-line functional/no-let
let init = false;

/** To call in order to start the analytics service, otherwise no event will be sent */
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

/** To notify an error through the analytics tool */
export const trackAppError = (error: AppError): void => {
  if (CONFIG.ANALYTCS.ENABLE && init) {
    trackEvent('GENERIC_ERROR', error);
  } else {
    console.error(error);
  }
};

/** To notify an event through the analytics tool */
export const trackEvent = (event_name: string, properties?: any, callback?: () => void): void => {
  if (CONFIG.ANALYTCS.ENABLE && init) {
    if (CONFIG.ANALYTCS.MOCK) {
      // eslint-disable-next-line no-console
      console.log(event_name, properties);
      if (callback) {
        callback();
      }
    } else {
      trackEventThroughAnalyticTool(event_name, properties, callback);
    }
  } else {
    if (callback) {
      callback();
    }
  }
};

const trackEventThroughAnalyticTool = (
  event_name: string,
  properties?: any,
  callback?: () => void
): void => {
  // eslint-disable-next-line functional/no-let
  let called = false;
  const wrappedCallback = callback
    ? () => {
        try {
          called = true;
          callback();
        } catch (reason) {
          console.error(
            `Something gone wrong while calling trackEvent ${event_name} callback`,
            reason
          );
        }
      }
    : undefined;
  try {
    const prova = mixpanel;
    mixpanel.track(
      event_name,
      {
        ...CONFIG.ANALYTCS.ADDITIONAL_PROPERTIES,
        ...properties,
        ...CONFIG.ANALYTCS.ADDITIONAL_PROPERTIES_IMPORTANT,
      },
      wrappedCallback ? { send_immediately: true } : undefined,
      wrappedCallback
    );
  } catch (reason) {
    console.error('Something gone wrong while sending data to mixpanel:', reason);
    // eslint-disable-next-line no-console
    console.log(event_name, properties);

    if (wrappedCallback && !called) {
      wrappedCallback();
    }
  }
};
