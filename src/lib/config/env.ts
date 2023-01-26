import * as env from 'env-var';

export const CONFIG = {
  URL_FE: {
    LOGIN_GOOGLE: '/auth/google',
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

  CONSENT: {
    COOKIE_GROUP_ANALYTICS: 'C0002',
  },

  TEST: {
    JWT: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6InBlcmljbGVyb3NzaUBtYXJ0aW5pLW1henphLml0IiwiZmFtaWx5X25hbWUiOiJTaWx2ZXN0cmkiLCJmaXNjYWxfbnVtYmVyIjoiU0xWRFBFNzlSNDNHMzk3WCIsIm5hbWUiOiJFZGlwbyIsImZyb21fYWEiOmZhbHNlLCJ1aWQiOiJkMGFhY2M2MS1lNmM4LTQ3MTEtOTI3ZS02NDE4ZjAxYjEzMGIiLCJsZXZlbCI6IkwyIiwiaWF0IjoxNjQwMjU1NjgzLCJhdWQiOiJhcGkuZGV2LnNlbGZjYXJlLnBhZ29wYS5pdCIsImlzcyI6IlNQSUQiLCJqdGkiOiIwMUZRS0RQWjE1R1Q0U1RDUUFFNUVYQlZWTSJ9.b8O3FljhtCQEyl-ZnG33UjhdJSwpxIn3qiUZhZkU1qpVvmO84ju7k3ccZv3wk4LYvT-DFiqNZaUIODZEI9GnQ5hH_5FiWpxPD1gecMSJ2w-_8vdcDyWyG109zl3Rp9G6wtl6CJchOHlk4cKEL7zHYjPzAfy9JX1Wqjqmb6gb-FfnkQEufoVrbwmAIpqIotcHEQv5ttnXJ8I6Qgc0rtFWLJRNOB1RgnLsOY-_GkXe-7jSLnuRSEI-6zC1OdX3F70bn7vYOOy7VwicqNJYcKIU4gS4tu9Ixaw6nGjcjsH8BF1EYC_hrSVuw-pBqD4hBSEnmGkkUKDJuKtu1vNgiCT9Ow',
  },

  FOOTER: {
    LINK: {
      PAGOPALINK: 'https://www.pagopa.it/',
      PRIVACYPOLICY: 'https://www.pagopa.it/it/privacy-policy/',
      TERMSANDCONDITIONS: 'https://www.pagopa.it/it/termini-e-condizioni-di-utilizzo-del-sito/',
      PROTECTIONOFPERSONALDATA:
        'https://privacyportal-de.onetrust.com/webform/77f17844-04c3-4969-a11d-462ee77acbe1/9ab6533d-be4a-482e-929a-0d8d2ab29df8',
      ABOUTUS: 'https://www.pagopa.it/it/societa/chi-siamo/',
      MEDIA: 'https://www.pagopa.it/it/',
      WORKWITHUS: 'https://www.pagopa.it/it/lavora-con-noi/',
      CERTIFICATIONS:
        'https://www.pagopa.it/static/10ffe3b3d90ecad83d1bbebea0512188/Certificato-SGSI-PagoPA-2020.pdf',
      INFORMATIONSECURITY:
        'https://www.pagopa.it/static/781646994f1f8ddad2d95af3aaedac3d/Sicurezza-delle-informazioni_PagoPA-S.p.A..pdf',
      TRANSPARENTCOMPANY: 'https://pagopa.portaleamministrazionetrasparente.it/',
      DISCLOSUREPOLICY: 'https://www.pagopa.it/it/responsible-disclosure-policy/',
      MODEL321:
        'https://pagopa.portaleamministrazionetrasparente.it/pagina746_altri-contenuti.html',
      LINKEDIN: 'https://www.linkedin.com/company/pagopa/',
      TWITTER: 'https://twitter.com/pagopa',
      INSTAGRAM: 'https://www.instagram.com/pagopaspa/',
      MEDIUM: 'https://medium.com/pagopa-spa',
      // ACCESSIBILITY:'' TODO
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
