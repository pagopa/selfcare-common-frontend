import { PayloadActionCreator } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_TASK_RETRIEVE_CACHED_VALUES } from '../utils/constants';
import useLoading from './useLoading';

/** It will return a method that only at the very first invocation it will call the retrieverService only the first time, storing the obtained values, and returning always cached values */
const useReduxCachedValue = <T extends Record<string, any> | Array<any>>(
  entity: string,
  retrieverService: () => Promise<T>,
  reduxSelector: (state: any) => T,
  reduxSetterAction: PayloadActionCreator<T>,
  alwaysRetrieve?: boolean
): (() => Promise<T>) => {
  const dispatch = useDispatch();
  const entities = useSelector(reduxSelector);
  const setEntities = (value: T) => dispatch(reduxSetterAction(value));

  const setLoading = useLoading(`${LOADING_TASK_RETRIEVE_CACHED_VALUES}_${entity}`);

  return (): Promise<T> => {
    if (alwaysRetrieve || !entities) {
      setLoading(true);
      return retrieverService()
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
