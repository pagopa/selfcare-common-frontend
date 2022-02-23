import { storageOpsBuilder } from './storage-utils';

/** An object containing a complete set of operation on the storage regarding the key used to store in the storage the loggedUser token in selfcare projects */
export const storageTokenOps = storageOpsBuilder('token', 'string', true);
/** An object containing a complete set of operation on the storage regarding the key used to store in the storage the loggedUser in selfcare projects */
export const storageUserOps = storageOpsBuilder('user', 'object', true);
