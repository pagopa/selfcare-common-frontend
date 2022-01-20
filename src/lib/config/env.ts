import * as env from 'env-var';

export const CONFIG = {
  URL_FE: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
  },

  MOCKS: {
    MOCK_USER: env.get('REACT_APP_MOCK_USER').default('false').asBool(),
  },
};
