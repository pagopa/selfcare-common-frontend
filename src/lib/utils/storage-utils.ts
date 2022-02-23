// eslint-disable-next-line @typescript-eslint/ban-types
type StorageValue = string | number | object;
type StorageValueType = 'string' | 'number' | 'object';

/** It will delete a key from the local session storage */
export function storageDelete(key: string, local?: boolean) {
  const storage: Storage = local ? window.localStorage : window.sessionStorage;
  storage.removeItem(key);
}

/** It will store a key/value pair in the local session storage */
export function storageWrite(
  key: string,
  value: StorageValue,
  type: StorageValueType,
  local?: boolean
) {
  const stringifyFn: { [key in StorageValueType]: () => string } = {
    string: () => value as string,
    number: () => String(value),
    object: () => JSON.stringify(value),
  };

  const stringified = stringifyFn[type]();

  const storage: Storage = local ? window.localStorage : window.sessionStorage;
  storage.setItem(key, stringified);
}

/** It will read a key from the local session storage */
export function storageRead(key: string, type: StorageValueType, local?: boolean) {
  const storage: Storage = local ? window.localStorage : window.sessionStorage;
  const value: string | null = storage.getItem(key);

  if (value === null) {
    return;
  }

  const parseFn = {
    string: () => value,
    number: () => Number(value),
    object: () => JSON.parse(value),
  };

  return parseFn[type]();
}
