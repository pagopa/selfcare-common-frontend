import { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_TASK_RETRIEVE_CACHED_VALUES } from '../utils/constants';
import useLoading from './useLoading';

/** It will return a method that only at the very first invocation it will call the retrieverService only the first time, storing the obtained values, and returning always cached values */
const useReduxCachedValue = <T extends Record<string, any> | Array<any>, RETRIEVER_ARGS>(
  /** The name of the entity, used just for logging purpose */
  entity: string,
  /** The service that will retrieve the value */
  retrieverService: (retrieverServiceArgs?: RETRIEVER_ARGS) => Promise<T>,
  /** The selector to read the value from redux */
  reduxSelector: (state: any) => T | undefined,
  /** The action to store the new value */
  reduxSetterAction: (value: T, retrieverServiceArgs?: RETRIEVER_ARGS) => PayloadAction<any>,
  /** An optional predicate evaluated when reduxSelector returned some value in order to compare it against the retrieverServiceArgs and evaluate if retrieverService should be called again  */
  selectedValuePredicate2Retrieve?: (value: T, args?: RETRIEVER_ARGS) => boolean,
  /** If true, it will always retrieve and store the new value */
  alwaysRetrieve?: boolean
): ((retrieverServiceArgs?: RETRIEVER_ARGS) => Promise<T>) => {
  const dispatch = useDispatch();
  const entities = useSelector(reduxSelector);
  const setEntities = (value: T, retrieverServiceArgs?: RETRIEVER_ARGS) =>
    dispatch(reduxSetterAction(value, retrieverServiceArgs));

  const setLoading = useLoading(`${LOADING_TASK_RETRIEVE_CACHED_VALUES}_${entity}`);

  return (retrieverServiceArgs?: RETRIEVER_ARGS): Promise<T> => {
    if (
      alwaysRetrieve ||
      !entities ||
      (selectedValuePredicate2Retrieve &&
        selectedValuePredicate2Retrieve(entities, retrieverServiceArgs))
    ) {
      setLoading(true);
      return retrieverService(retrieverServiceArgs)
        .then((e) => {
          setEntities(e, retrieverServiceArgs);
          return e;
        })
        .finally(() => setLoading(false));
    } else {
      return new Promise((resolve) => resolve(entities));
    }
  };
};

export default useReduxCachedValue;
