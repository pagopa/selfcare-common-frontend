export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';
export const LOADING_TASK_RETRIEVE_CACHED_VALUES = 'RETRIEVE_CACHED_VALUES';

export type UserRole = 'ADMIN' | 'LIMITED';

/** The short and long labels used for the roles of selfcare's projects */
export const roleLabels: {
  [key in UserRole]: { shortLabelKey: string; longLabelKey: string; descriptionKey: string };
} = {
  ADMIN: {
    shortLabelKey: 'common.roles.admin.shortLabel',
    longLabelKey: 'common.roles.admin.longLabel',
    descriptionKey: 'common.roles.admin.description',
  },
  LIMITED: {
    shortLabelKey: 'common.roles.limited.shortLabel',
    longLabelKey: 'common.roles.limited.longLabel',
    descriptionKey: 'common.roles.limited.description',
  },
};
