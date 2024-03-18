import { User } from '../model/User';
import { JwtUser } from '../model/JwtUser';
import { storageOpsBuilder } from './storage-utils';

/** An object containing a complete set of operation on the storage regarding the key used to store in the storage the loggedUser token in selfcare projects */
export const storageTokenOps = storageOpsBuilder<string>('token', 'string', true);
/** An object containing a complete set of operation on the storage regarding the key used to store in the storage the loggedUser in selfcare projects */
export const storageUserOps = storageOpsBuilder<User>('user', 'object', true);

function decodeUTF8(binary: string) {
  const bytes = new Uint8Array(binary.length);
  // eslint-disable-next-line functional/no-let
  for (let b = 0; b < bytes.length; ++b) {
    // eslint-disable-next-line functional/immutable-data
    bytes[b] = binary.charCodeAt(b);
  }
  const decoder = new TextDecoder('utf-8');
  return decoder.decode(bytes);
}

/** Decode and then convert the jwt into a JWTUser object */
export const parseJwt = (token: string) => {
  try {
    return JSON.parse(decodeUTF8(atob(token.split('.')[1]))) as JwtUser;
  } catch (e) {
    return null;
  }
};

/** Determines whether the token has expired */
export const isExpiredToken = (token: string) => {
  const jwtUser = parseJwt(token) as JwtUser;
  const tokenExpDate = new Date(Number(jwtUser.exp) * 1000);

  return new Date() >= tokenExpDate;
};
