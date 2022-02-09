import { UserRole } from '../model/Party';

/** The key used to store in the session storage the loggedUser in selfcare projects */
export const STORAGE_KEY_USER = 'user';
/** The key used to store in the session storage the logged user token in selfcare projects */
export const STORAGE_KEY_TOKEN = 'token';

export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';

/** The short and long labels used for the roles of selfcare's projects */
export const roleLabels: { [key in UserRole]: { shortLabel: string; longLabel: string; description:string } } = {
  ADMIN: { shortLabel: 'Ref. Amministrativo', longLabel: 'Referente Amministrativo',description:'Gestisce i prodotti e gli utenti attivi' },
  LIMITED: { shortLabel: 'Ref. Operativo', longLabel: 'Referente Operativo', description:'Operatore prodotto' },
};
