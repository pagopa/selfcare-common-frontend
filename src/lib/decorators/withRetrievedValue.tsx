import { useEffect, useState } from 'react';
import useErrorDispatcher from '../hooks/useErrorDispatcher';
import { AppError } from '../redux/slices/appStateSlice';

/** Decorator to retrieve a value and serve it once ready to the decorated component */
export default function withRetrievedValue<
  ENTITY_TYPE extends Record<string, any>,
  PROP_NAME extends string,
  PROPS extends Record<PROP_NAME, ENTITY_TYPE>
>(
  propEntityName: PROP_NAME,
  getRetrieverService: () => () => Promise<ENTITY_TYPE>,
  WrappedComponent: React.ComponentType<PROPS>,
  onError?: (appError: AppError) => void
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

    return (
      value !== undefined && (
        <WrappedComponent {...(props as PROPS)} {...{ [propEntityName]: value }} />
      )
    );
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentWithParties.displayName = `withRetrieve${propEntityName}(${displayName})`;

  return ComponentWithParties as React.ComponentType<Omit<PROPS, PROP_NAME>>;
}
