// eslint-disable-next-line @typescript-eslint/ban-types
type StorageValue = string | number | object;
type StorageValueType = 'string' | 'number' | 'object';

/** It will delete a key from the local session storage */
export function storageDelete(key: string) {
  window.sessionStorage.removeItem(key);
}

/** It will store a key/value pair in the local session storage */
export function storageWrite(key: string, value: StorageValue, type: StorageValueType) {
  const stringifyFn: { [key in StorageValueType]: () => string } = {
    string: () => value as string,
    number: () => String(value),
    object: () => JSON.stringify(value),
  };

  const stringified = stringifyFn[type]();

  window.sessionStorage.setItem(key, stringified);
}

/** It will read a key from the local session storage */
export function storageRead(key: string, type: StorageValueType) {
  const value: string | null = window.sessionStorage.getItem(key);

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
