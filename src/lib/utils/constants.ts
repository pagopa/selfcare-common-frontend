import { useTranslation } from 'react-i18next';

export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';
export const LOADING_TASK_RETRIEVE_CACHED_VALUES = 'RETRIEVE_CACHED_VALUES';

export type UserRole = 'ADMIN' | 'LIMITED';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { t } = useTranslation();

/** The short and long labels used for the roles of selfcare's projects */
export const roleLabels: {
  [key in UserRole]: { shortLabel: string; longLabel: string; description: string };
} = {
  ADMIN: {
    shortLabel: t('common.roles.admin.shortLabelKey'),
    longLabel: t('common.roles.admin.longLabelKey'),
    description: t('common.roles.admin.description'),
  },
  LIMITED: {
    shortLabel: t('common.roles.limited.shortLabelKey'),
    longLabel: t('common.roles.limited.longLabelKey'),
    description: t('common.roles.limited.description'),
  },
};
