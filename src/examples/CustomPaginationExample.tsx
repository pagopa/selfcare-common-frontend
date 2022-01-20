import { useState } from 'react';
import { CustomPagination } from '../lib';
import { PageRequest } from '../lib/model/PageRequest';

export default () => {
  const [page, setPage] = useState<PageRequest>({ page: 1, size: 10 });
  return (
    <CustomPagination
      page={{ number: page.page, size: page.size, totalPages: 5, totalElements: 45 }}
      onPageRequest={(p) => setPage(p)}
    />
  );
};
