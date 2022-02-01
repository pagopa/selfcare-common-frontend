import { ApiRequestType, IResponseType, TypeofApiResponse } from '@pagopa/ts-commons/lib/requests';
import { isRight, toError } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { agent } from '@pagopa/ts-commons';
import { AbortableFetch, setFetchTimeout, toFetch } from '@pagopa/ts-commons/lib/fetch';
import { Millisecond } from '@pagopa/ts-commons/lib/units';
import { EnhancedStore } from '@reduxjs/toolkit';
import { CONFIG } from '../config/env';
import { appStateActions } from '../redux/slices/appStateSlice';

/** To show an error popup to inform of the not valid session */
export const onRedirectToLogin = (store: EnhancedStore) =>
  store.dispatch(
    appStateActions.addError({
      id: 'tokenNotValid',
      error: new Error(),
      techDescription: 'token expired or not valid',
      toNotify: false,
      blocking: false,
      displayableTitle: 'Sessione scaduta',
      displayableDescription: 'Stai per essere rediretto alla pagina di login...',
    })
  );

/** Return the implementation of fetch configured with a timeout */
export const buildFetchApi = (timeoutMs: number = 300000): typeof fetchWithTimeout => {
  // Must be an https endpoint so we use an https agent
  const abortableFetch = AbortableFetch(agent.getHttpFetch(process.env));
  const fetchWithTimeout = toFetch(setFetchTimeout(timeoutMs as Millisecond, abortableFetch));
  // tslint:disable-next-line: no-any
  return fetch as any as typeof fetchWithTimeout;
};

/** Extract the response of a @pagopa/openapi-codegen-ts generated client rest invocation having status code successHttpStatus.
If notValidTokenHttpStatus is not null and the returned status is equal to notValidTokenHttpStatus, it will call the onRedirectToLogin function and will schedule the redirect towards logout path.
If notAuthorizedTokenHttpStatus is  not null and the returned status is equal to notAuthorizedTokenHttpStatus, it will throw an Error with message "Operation not allowed".
If emptyResponseHttpStatus is  not null and the returned status is equal to emptyResponseHttpStatus, it will return a promise that resolve to null value.
Other statuses will return will throw a generic error. */
export const extractResponse = async <R>(
  response: t.Validation<
    TypeofApiResponse<ApiRequestType<any, any, any, IResponseType<any, any, any>>>
  >,
  successHttpStatus: number,
  onRedirectToLogin: () => void,
  notValidTokenHttpStatus: number | null = 401,
  notAuthorizedTokenHttpStatus: number | null = 403,
  emptyResponseHttpStatus: number | null = 404
): Promise<R> => {
  if (isRight(response)) {
    if (response.right.status === successHttpStatus) {
      return response.right.value;
    } else if (notValidTokenHttpStatus && response.right.status === notValidTokenHttpStatus) {
      onRedirectToLogin();
      window.setTimeout(() => window.location.assign(CONFIG.URL_FE.LOGOUT), 2000);
      return new Promise(() => null);
    } else if (
      notAuthorizedTokenHttpStatus &&
      response.right.status === notAuthorizedTokenHttpStatus
    ) {
      throw new Error(`Operation not allowed!`);
    } else if (emptyResponseHttpStatus && response.right.status === emptyResponseHttpStatus) {
      return new Promise((resolve) => resolve(null as unknown as R));
    } else {
      console.error(JSON.stringify(response.right));
      throw new Error(
        `Unexpected HTTP status! Expected ${successHttpStatus} obtained ${response.right.status}`
      );
    }
  } else {
    console.error('Something gone wrong while fetching data');
    console.error(JSON.stringify(response.left));
    throw toError(response.left);
  }
};
