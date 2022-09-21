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
    COOKIE_GROUP_ANALYTICS: 'C0002',
  },

  TEST: {
    JWT: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF9kZjplNjoxOTplYToxZTpjZTplNjo3Yjo3MDo0MjoyYzphMjpjZDo4Yjo1MjowYiJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjUwOTZlNGM2LTI1YTEtNDVkNS05YmRmLTJmYjk3NGE3YzFjOCIsImxldmVsIjoiTDIiLCJpYXQiOjE2NTMwNDA1MzQsImF1ZCI6ImFwaS5kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwiaXNzIjoiU1BJRCIsImp0aSI6IjAxRzNHRTlOQ1ZSVldEUjlHVERGU0MxQjZWIn0.gMnrecCaAZb5F-NRjMcPCM2eJcEIP89Hv6KWbz3PCIAcVb9g9tBl_c_llv90P_yQn50F8N9nhcaD3MrKpeKkdVSFkYrkZQycpz0vSUpxrriS85UN48iHM_dGDZaZm7zo1Funb6eRVx7M49e_bJRPIzBqF8SuwVhYN05KwivZyGHiVtBL4UmC-4A2kGQTCCOp4ECYMNFjEIetfRbpy3-FmWgQzArj9wAxG0x_Qd2YI3AI8RvVH4jeoc77K_bHxBe_mRj73BQPT1wHAFW8ztBaTD2o2V2br4qgozHqOvx1C_dvXYjvKVCNHgcsa_aKaY0cuYaBMkwfTfknHMMcVGuSzQ',
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
