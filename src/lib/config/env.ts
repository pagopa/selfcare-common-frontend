import * as env from 'env-var';

export const CONFIG = {
  URL_FE: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    ASSISTANCE: '/assistenza',
  },

  MOCKS: {
    MOCK_USER: env.get('REACT_APP_MOCK_USER').default('false').asBool(),
  },

  ANALYTCS: {
    ENABLE: env.get('REACT_APP_ANALYTICS_ENABLE').default('false').asBool(),
    MOCK: env.get('REACT_APP_ANALYTICS_MOCK').default('false').asBool(),
    DEBUG: env.get('REACT_APP_ANALYTICS_DEBUG').default('false').asBool(),
    TOKEN: env.get('REACT_APP_MIXPANEL_TOKEN').default('').asString(),
    API_HOST: 'https://api-eu.mixpanel.com',
    PERSISTENCE: 'localStorage',
    LOG_IP: false,
    PROPERTY_BLACKLIST: ['$current_url', '$initial_referrer', '$referrer'],
    ADDITIONAL_PROPERTIES: {},
    ADDITIONAL_PROPERTIES_IMPORTANT: {},
  },
};
