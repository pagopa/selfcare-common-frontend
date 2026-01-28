import * as env from 'env-var';

export const CONFIG = {
  URL_FE: {
    LOGIN_GOOGLE: '/auth/google',
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    LOGOUT_GOOGLE: '/auth/logout/google',
    LOGIN_ADMIN_GOOGLE: env.get('REACT_APP_GOOGLE_LOGIN_URL').asString() || '',
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

  CONSENT: {
    COOKIE_GROUP_ANALYTICS: 'C0002',
  },

  TEST: {
    JWT: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmYW1pbHlfbmFtZSI6Im1vY2tlZCIsImZpc2NhbF9udW1iZXIiOiIyMjMzNDQ1Njc4NiIsIm5hbWUiOiJ1c2VyIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjUwNTRwZWM2LTIyMzMyLTQ1ZDUtOWJkZi0yYmg5NzRhN2MxYzgiLCJsZXZlbCI6IkwyIiwiaWF0IjoxNzEwNzU4Njk0LCJleHAiOjE3MDgyNTMxODl9.qGqULn7A29daBAvc34azOgL5PhLt6Srge0PxopPj_DA',
  },

  FOOTER: {
    LINK: {
      PAGOPALINK: 'https://www.pagopa.it/',
      PRIVACYPOLICY: env.get('REACT_APP_URL_PRIVACY_DISCLAIMER').asString(),
      TERMSANDCONDITIONS: env.get('REACT_APP_URL_TERMS_AND_CONDITIONS').asString(),
      PROTECTIONOFPERSONALDATA:
        'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8',
      ABOUTUS: 'https://www.pagopa.it/it/societa/chi-siamo/',
      MEDIA: 'https://www.pagopa.it/it/',
      WORKWITHUS: 'https://www.pagopa.it/it/lavora-con-noi/',
      CERTIFICATIONS: 'https://www.pagopa.it/it/certificazioni/',
      INFORMATIONSECURITY:
        'https://www.pagopa.it/it/politiche-per-la-sicurezza-delle-informazioni/',
      TRANSPARENTCOMPANY: 'https://pagopa.portaleamministrazionetrasparente.it/',
      DISCLOSUREPOLICY: 'https://www.pagopa.it/it/responsible-disclosure-policy/',
      MODEL231:
        'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.html',
      LINKEDIN: 'https://www.linkedin.com/company/pagopa/',
      TWITTER: 'https://twitter.com/pagopa',
      INSTAGRAM: 'https://www.instagram.com/pagopaspa/',
      MEDIUM: 'https://medium.com/pagopa-spa',
      ACCESSIBILITY: 'https://form.agid.gov.it/view/87f46790-9798-11f0-b583-8b5f76942354',
      // PNRR:'' TODO
    },
  },

  HEADER: {
    LINK: {
      ROOTLINK: 'https://www.pagopa.it/',
      PRODUCTURL: '/dashboard',
    },
  },
};
