import { UserRole } from '../model/Party';

export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';
export const LOADING_TASK_RETRIEVE_CACHED_VALUES = 'RETRIEVE_CACHED_VALUES';

/** The short and long labels used for the roles of selfcare's projects */
export const roleLabels: {
  [key in UserRole]: { shortLabel: string; longLabel: string; description: string };
} = {
  ADMIN: {
    shortLabel: 'Ref. Amministrativo',
    longLabel: 'Referente Amministrativo',
    description: 'Gestisce i prodotti e gli utenti attivi',
  },
  LIMITED: {
    shortLabel: 'Ref. Operativo',
    longLabel: 'Referente Operativo',
    description: 'Operatore prodotto',
  },
};
