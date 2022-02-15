import { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_TASK_RETRIEVE_CACHED_VALUES } from '../utils/constants';
import useLoading from './useLoading';

/** It will return a method that only at the very first invocation it will call the retrieverService only the first time, storing the obtained values, and returning always cached values */
const useReduxCachedValue = <T extends Record<string, any> | Array<any>, RETRIEVER_ARGS>(
  /** The name of the entity, used just for logging purpose */
  entity: string,
  /** The service that will retrieve the value */
  retrieverService: (args?: RETRIEVER_ARGS) => Promise<T>,
  /** The selector to verify if a value already exists */
  reduxSelector: (state: any) => T | undefined,
  /** The action to store the value */
  reduxSetterAction: (value: T) => PayloadAction<any>,
  /** If true, it will always retrieve and store the new value */
  alwaysRetrieve?: boolean
): ((retrieveServiceArgs?: RETRIEVER_ARGS) => Promise<T>) => {
  const dispatch = useDispatch();
  const entities = useSelector(reduxSelector);
  const setEntities = (value: T) => dispatch(reduxSetterAction(value));

  const setLoading = useLoading(`${LOADING_TASK_RETRIEVE_CACHED_VALUES}_${entity}`);

  return (retrieveServiceArgs?: RETRIEVER_ARGS): Promise<T> => {
    if (alwaysRetrieve || !entities) {
      setLoading(true);
      return retrieverService(retrieveServiceArgs)
        .then((e) => {
          setEntities(e);
          return e;
        })
        .finally(() => setLoading(false));
    } else {
      return new Promise((resolve) => resolve(entities));
    }
  };
};

export default useReduxCachedValue;
