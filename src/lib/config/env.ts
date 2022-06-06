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

  CONSENT: {
    COOKIE_GROUP_ANALYTICS: 'C0004',
  },

  JSON_URL: {
    PRODUCTS: 'https://dev.selfcare.pagopa.it/assets/products.json',
  },

  TEST: {
    JWT: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjliMTdjZTcwLWY3OWYtNDJkOS04YjBlLTRlN2ViNGQ4ODA3NCIsImxldmVsIjoiTDIiLCJpYXQiOjE2NDkzMjQ5NjYsImF1ZCI6Imh0dHBzOi8vYXBpLmRldi5zZWxmY2FyZS5wYWdvcGEuaXQiLCJpc3MiOiJTUElEIiwianRpIjoiMDFHMDFQVkdNR1hDR1IyMTdZWTZFTUNYNk4ifQ.Deq53Tt1Lohp54H6e83-ZaUVMuRahGRDVW7awKl9czZ5UC8Nb6-PPP4hLz7Ut3lq_DjVy7sUpMVjHhGBi2g-Xya95apRlwOwl5Evu-MJzoLTjSKMRK7Nz5qEhJoA3tgOU3094VNuz_-AyIyOptD--wXZH15furowqGdvzH2lFWN2SK7mqwnuCw8zHsPiDtmUD2LxWIGP7TUo5wYHggwD332Gzi85fWJAFlwY0K0mtUE6JiAcZmtTNSnlksqPlrRa1AfwGrgs8Wi9kxS7eL1YhcBIi3b6Y3qPg5sLvM77L8RCdPRmGt1nViGDFSmcBldhtk82XW2IjJwyiJb5kgrMcQ',
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
    },
  },
};
