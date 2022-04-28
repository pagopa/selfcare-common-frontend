export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';
export const LOADING_TASK_RETRIEVE_CACHED_VALUES = 'RETRIEVE_CACHED_VALUES';

export type UserRole = 'ADMIN' | 'LIMITED';

/** The short and long labels used for the roles of selfcare's projects */
export const roleLabels: {
  [key in UserRole]: { shortLabel: string; longLabel: string; description: string };
} = {
  ADMIN: {
    shortLabel: 'common.roles.admin.shortLabelKey',
    longLabel: 'common.roles.admin.longLabelKey',
    description: 'common.roles.admin.description',
  },
  LIMITED: {
    shortLabel: 'common.roles.limited.shortLabelKey',
    longLabel: 'common.roles.limited.longLabelKey',
    description: 'common.roles.limited.description',
  },
};
