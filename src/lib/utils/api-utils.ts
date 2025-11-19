import { agent } from '@pagopa/ts-commons';
import { AbortableFetch, setFetchTimeout, toFetch } from '@pagopa/ts-commons/lib/fetch';
import { ApiRequestType, IResponseType, TypeofApiResponse } from '@pagopa/ts-commons/lib/requests';
import { Millisecond } from '@pagopa/ts-commons/lib/units';
import { EnhancedStore } from '@reduxjs/toolkit';
import { isRight, toError } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { CONFIG } from '../config/env';
import { appStateActions } from '../redux/slices/appStateSlice';
import { isPagoPaUser } from './storage';

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
export const buildFetchApi = (
  timeoutMs: number = 300000
): ((input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>) => {
  // Must be an https endpoint so we use an https agent
  const abortableFetch = AbortableFetch(agent.getHttpFetch(process.env));
  const fetchWithTimeout = toFetch(setFetchTimeout(timeoutMs as Millisecond, abortableFetch));
  // tslint:disable-next-line: no-any
  return fetchWithTimeout as (
    input: RequestInfo | URL,
    init?: RequestInit | undefined
  ) => Promise<Response>;
};

const LOGIN_URL = isPagoPaUser ? CONFIG.URL_FE.LOGIN_ADMIN_GOOGLE : CONFIG.URL_FE.LOGOUT;

/** Extract the response of a @pagopa/openapi-codegen-ts generated client rest invocation having status code successHttpStatus.
If notValidTokenHttpStatus is not null and the returned status is equal to notValidTokenHttpStatus, it will call the onRedirectToLogin function and will schedule the redirect towards logout path.
If notAuthorizedTokenHttpStatus is  not null and the returned status is equal to notAuthorizedTokenHttpStatus, it will throw an Error with message "Operation not allowed".
If emptyResponseHttpStatus is  not null and the returned status is equal to emptyResponseHttpStatus, it will return a promise that resolve to null value.
Other statuses will return will throw a generic error. */
export const extractResponse = async <R>(
  response: t.Validation<
    TypeofApiResponse<ApiRequestType<any, any, any, IResponseType<any, any, any>>>
  >,
  successHttpStatus: number | Array<number>,
  onRedirectToLogin: () => void,
  notValidTokenHttpStatus: number | null = 401,
  notAuthorizedTokenHttpStatus: number | null = 403,
  emptyResponseHttpStatus: number | null = 404
): Promise<R> => {
  const successCodes = Array.isArray(successHttpStatus) ? successHttpStatus : [successHttpStatus];
  if (isRight(response)) {
    if (successCodes.includes(response.right.status)) {
      return response.right.value;
    } else if (notValidTokenHttpStatus && response.right.status === notValidTokenHttpStatus) {
      onRedirectToLogin();
      window.setTimeout(() => window.location.assign(LOGIN_URL), 2000);
      return new Promise(() => null);
    } else if (
      notAuthorizedTokenHttpStatus &&
      response.right.status === notAuthorizedTokenHttpStatus
    ) {
      const error = new Error(`Operation not allowed!`);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      error.httpStatus = response.right.status;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      error.httpBody = response.right.value;
      throw error;
    } else if (emptyResponseHttpStatus && response.right.status === emptyResponseHttpStatus) {
      return Promise.resolve(null as unknown as R);
    } else {
      console.error(JSON.stringify(response.right));
      const error = new Error(
        `Unexpected HTTP status! Expected ${successHttpStatus} obtained ${response.right.status}`
      );
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      error.httpStatus = response.right.status;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line functional/immutable-data
      error.httpBody = response.right.value;
      throw error;
    }
  } else {
    console.error('Something gone wrong while fetching data');
    console.error(JSON.stringify(response.left));

    throw toError(response.left);
  }
};
