import { useRef } from 'react';
import { PageRequest } from '../model/PageRequest';
import { PageResource } from '../model/PageResource';

const toPageResource = <T>(
  content: Array<T>,
  page: number,
  size: number,
  totalElements: number
): PageResource<T> => ({
  content,
  page: {
    number: page,
    size,
    totalElements,
    totalPages: size > 0 ? Math.ceil(totalElements / size) : 0,
  },
});

const extractPageRequest = <T extends Record<string, any>>(
  data: Array<T>,
  pageRequest: PageRequest
): PageResource<T> => {
  const firstIndex = pageRequest.page * pageRequest.size;
  return toPageResource(
    firstIndex < data.length && pageRequest.size > 0
      ? data.slice(firstIndex, firstIndex + pageRequest.size)
      : [],
    pageRequest.page,
    pageRequest.size,
    data.length
  );
};

const applySort = <T extends Record<string, any>>(data: Array<T>, sort: string) => {
  const sortConfiguration: Array<{ key: string; asc: boolean }> = sort.split(' ').map((order) => {
    const [key, direction] = order.split(',');
    return { key, asc: direction === 'asc' };
  });
  // eslint-disable-next-line functional/immutable-data
  data.sort((a, b) => {
    for (const order of sortConfiguration) {
      const compare: number = `${a[order.key]}`.localeCompare(`${b[order.key]}`);
      if (compare !== 0) {
        return compare * (order.asc ? 1 : -1);
      }
    }
    return 0;
  });
};

/**
 * Custom hook used to simulate paginated resources when the external service doesn't implement it, caching values when filter doesn't change and serving them a page at time.
 * Cached values are stored using useRef, so they are local to the component using this hook.
 * The sorting actually is applied using string representation
 */
const useFakePagination = <T extends Record<string, any>>(
  fetch: () => Promise<Array<T>>
): ((pageRequest: PageRequest, filterChanged: boolean) => Promise<PageResource<T>>) => {
  const cachedData = useRef<Array<T>>();
  const cachedDataSort = useRef<string>();

  const checkAndApplySort = (sort?: string) => {
    if (sort && cachedDataSort.current !== sort) {
      applySort(cachedData.current as Array<T>, sort);
      // eslint-disable-next-line functional/immutable-data
      cachedDataSort.current = sort;
    }
  };

  return (pageRequest: PageRequest, filterChanged: boolean): Promise<PageResource<T>> => {
    if (!filterChanged && cachedData.current) {
      checkAndApplySort(pageRequest.sort);
      return new Promise((resolve) =>
        resolve(extractPageRequest(cachedData.current as Array<T>, pageRequest))
      );
    } else {
      return fetch().then((results) => {
        // eslint-disable-next-line functional/immutable-data
        cachedData.current = results;
        checkAndApplySort(pageRequest.sort);
        return extractPageRequest(cachedData.current, pageRequest);
      });
    }
  };
};

export default useFakePagination;
