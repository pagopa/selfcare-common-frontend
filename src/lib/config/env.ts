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
    JWT: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF84Njo3NDoxZTozNTphZTphNjpkODo0YjpkYzplOTpmYzo4ZTphMDozNTo2ODpiNSJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjUwOTZlNGM2LTI1YTEtNDVkNS05YmRmLTJmYjk3NGE3YzFjOCIsImxldmVsIjoiTDIiLCJpYXQiOjE2NzQ4MTQxODAsImF1ZCI6ImFwaS5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiU1BJRCIsImp0aSI6IjAxR1FTQjhLSDNCSks4QkFTRDE4MlZKSDhEIn0.JOfxEC3o8Wor0l430Fq68mWVl4h-NUpFlFuSf6Xgxmu-wqeQyUjRKIfl3M9J0H_8ihxyNMEu5u3PqqQBubGx1mjy24uEsoRPFdLQxlGnpMAM-15SFv8ShDWvMaTSz8hO6vCRJxUtNQgX7SplIG7ZlBBSt7ihwioW1CsKWFISuG0tHwe797NWwaMJlRnzW3R7BIrsGU1eJeue2QqYUnKXZIwYQh21E3EssCNFrusATEuJT_opGaTMzSHpUZxI6cCG2pOE8Cmm0Z75Q2HAM2eoi1_Mx8llZvuk1oVhgDGsACpNRb9Vyxt6jAPUEh3DlkGpLqS8AUD1vRQydzNifiSb4A',
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
      ACCESSIBILITY: 'https://form.agid.gov.it/view/7aa810f2-bc15-40d1-b996-6eaa658439c3/',
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
