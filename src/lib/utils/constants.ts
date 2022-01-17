import { UserRole } from '../model/Party';

export const STORAGE_KEY_USER = 'user';
export const STORAGE_KEY_TOKEN = 'token';

export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';

export const roleLabels: { [key in UserRole]: { shortLabel: string; longLabel: string } } = {
  ADMIN: { shortLabel: 'Ref. Amministrativo', longLabel: 'Referente Amministrativo' },
  LIMITED: { shortLabel: 'Ref. Operativo', longLabel: 'Referente Operativo' },
};
