import { ReactNode, useEffect, useState } from 'react';
import useErrorDispatcher from '../hooks/useErrorDispatcher';
import { AppError } from '../model/AppError';

/** Decorator to retrieve a value and serve it once ready to the decorated component */
export default function withRetrievedValue<
  ENTITY_TYPE extends Record<string, any>,
  PROP_NAME extends string,
  PROPS extends Record<PROP_NAME, ENTITY_TYPE>
>(
  /** The name of the prop to which serve the value when available */
  propEntityName: PROP_NAME,
  /** A function that will return an other function to retrieve the expected value. This for allow the use of custom hook  */
  getRetrieverService: () => () => Promise<ENTITY_TYPE>,
  /** The component to decore */
  WrappedComponent: React.ComponentType<PROPS>,
  /** What to do in case of error. As default, it will use the feature ErrorBoundary */
  onError?: (appError: AppError) => void,
  /** A component to show while waiting for the value */
  onLoading?: ReactNode
) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithParties = (props: PROPS) => {
    const [value, setValue] = useState<ENTITY_TYPE>();
    const cachedRetrieve = getRetrieverService();

    const addError = useErrorDispatcher();

    const doRetrieve = (): void => {
      cachedRetrieve()
        .then((v) => setValue(v))
        .catch((reason) =>
          (onError ?? addError)({
            id: `RETRIEVE_VALUE_${propEntityName}`,
            blocking: false,
            techDescription: `Something gone wrong while retrieving ${propEntityName}`,
            toNotify: true,
            error: reason,
            onRetry: doRetrieve,
          })
        );
    };

    useEffect(() => {
      if (!value) {
        doRetrieve();
      }
    }, []);

    return value !== undefined ? (
      <WrappedComponent {...(props as PROPS)} {...{ [propEntityName]: value }} />
    ) : (
      onLoading ?? <></>
    );
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentWithParties.displayName = `withRetrieve${propEntityName}(${displayName})`;

  return ComponentWithParties as React.ComponentType<Omit<PROPS, PROP_NAME>>;
}
