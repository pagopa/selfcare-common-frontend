import { PayloadAction } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { LOADING_TASK_RETRIEVE_CACHED_VALUES } from '../utils/constants';
import useLoading from './useLoading';

/** @see {useReduxCachedValue} when RETRIEVED_VALUE === STORED_VALUE */
const useReduxCachedValue = <RETRIEVED_VALUE, RETRIEVER_ARGS>(
  entity: string,
  retrieverService: (retrieverServiceArgs: RETRIEVER_ARGS) => Promise<RETRIEVED_VALUE>,
  reduxSelector: (state: any) => RETRIEVED_VALUE | undefined,
  reduxSetterAction: (
    value: RETRIEVED_VALUE,
    retrieverServiceArgs: RETRIEVER_ARGS
  ) => PayloadAction<any>,
  selectedValuePredicate2Retrieve?: (value: RETRIEVED_VALUE, args: RETRIEVER_ARGS) => boolean,
  alwaysRetrieve?: boolean
): ((retrieverServiceArgs: RETRIEVER_ARGS) => Promise<RETRIEVED_VALUE>) =>
  useReduxCachedValueTranscoded(
    entity,
    retrieverService,
    reduxSelector,
    reduxSetterAction,
    (value) => value,
    selectedValuePredicate2Retrieve,
    alwaysRetrieve
  );

/** It will return a method that will call the retrieverService only when there are not storing values, or a condition on them is not more verified */
export const useReduxCachedValueTranscoded = <RETRIEVED_VALUE, STORED_VALUE, RETRIEVER_ARGS>(
  /** The name of the entity, used just for logging purpose */
  entity: string,
  /** The service that will retrieve the value */
  retrieverService: (retrieverServiceArgs: RETRIEVER_ARGS) => Promise<RETRIEVED_VALUE>,
  /** The selector to read the value from redux */
  reduxSelector: (state: any) => STORED_VALUE | undefined,
  /** The action to store the new value */
  reduxSetterAction: (
    value: RETRIEVED_VALUE,
    retrieverServiceArgs: RETRIEVER_ARGS
  ) => PayloadAction<STORED_VALUE>,
  /** A function called to transform STORED_VALUE into RETRIEVED_VALUE and called when hitting the cache */
  selectedValue2RetrievedValue: (value: STORED_VALUE) => RETRIEVED_VALUE,
  /** An optional predicate evaluated when reduxSelector returned some value in order to compare it against the retrieverServiceArgs and evaluate if retrieverService should be called again  */
  selectedValuePredicate2Retrieve?: (value: STORED_VALUE, args: RETRIEVER_ARGS) => boolean,
  /** If true, it will always retrieve and store the new value */
  alwaysRetrieve?: boolean
): ((retrieverServiceArgs: RETRIEVER_ARGS) => Promise<RETRIEVED_VALUE>) => {
  const dispatch = useDispatch();
  const entities = useSelector(reduxSelector);
  const setEntities = (value: RETRIEVED_VALUE, retrieverServiceArgs: RETRIEVER_ARGS) =>
    dispatch(reduxSetterAction(value, retrieverServiceArgs));

  const setLoading = useLoading(`${LOADING_TASK_RETRIEVE_CACHED_VALUES}_${entity}`);

  return (retrieverServiceArgs: RETRIEVER_ARGS): Promise<RETRIEVED_VALUE> => {
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
      return new Promise((resolve) => resolve(selectedValue2RetrievedValue(entities)));
    }
  };
};

export default useReduxCachedValue;
