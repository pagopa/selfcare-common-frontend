/** It will resolve the path variables in path using the provided map */
export const resolvePathVariables = (path: string, pathVariables: { [key: string]: string }) =>
  Object.keys(pathVariables).reduce(
    (result, key) => result.replace(`:${key}`, pathVariables[key]),
    path
  );
