import { useEffect } from 'react';

export const useFocus = (
  elementRef: React.RefObject<any>,
  dependencies: any = []
): void => {
  useEffect(() => {
      if (elementRef.current) {
        elementRef.current.focus();
      }
  }, [dependencies]);
};