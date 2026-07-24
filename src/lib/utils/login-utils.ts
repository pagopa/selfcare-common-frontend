const ON_SUCCESS_PARAM = 'onSuccess';

/** Where the user is right now, in the form the login FE expects in order to bring them back */
const currentDestination = () => globalThis.location.pathname + globalThis.location.search;

/**
 * Adds to a login/logout URL the `onSuccess` param that the login FE reads to send the user back to
 * the page they came from. It is resolved when the redirect happens, so it also covers a session
 * expiring in the middle of the navigation, and not only the entry point of the application.
 * A destination already present in the URL wins: applications building it on their own keep working
 * and the param is never duplicated.
 */
export const withOnSuccess = (url: string): string => {
  const queryStart = url.indexOf('?');
  const query = queryStart === -1 ? '' : url.slice(queryStart + 1);
  const destination = currentDestination();

  if (!destination || new URLSearchParams(query).has(ON_SUCCESS_PARAM)) {
    return url;
  }

  return `${url}${queryStart === -1 ? '?' : '&'}${ON_SUCCESS_PARAM}=${encodeURIComponent(
    destination
  )}`;
};
