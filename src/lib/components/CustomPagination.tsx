import { Grid, Pagination } from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
import React from 'react';
import { Page } from '../model/Page';
import { PageRequest } from '../model/PageRequest';

function defaultLabelDisplayedRows(from: number, to: number, count: number) {
  // eslint-disable-next-line sonarjs/no-nested-template-literals
  return `${from}-${to} di ${count !== -1 ? count : `più di ${to}`}`;
}

const getLabelDisplayedRowsTo = (count: number, page: number, size: number) => {
  if (count === -1) {
    return (page + 1) * size;
  }

  return size === -1 ? count : Math.min(count, (page + 1) * size);
};

type Props = {
  /** The actual page */
  page: Page;
  /** The actual sort applied */
  sort?: string;
  /** The function to be invoked if the user change page */
  onPageRequest: (r: PageRequest) => void;
};

/** Selfcare custom table available pages component */
export default function CustomPagination({ page, onPageRequest, sort }: Props) {
  const count = page.totalElements;
  const from = count === 0 ? 0 : page.number * page.size + 1;
  const to = getLabelDisplayedRowsTo(count, page.number, page.size);

  return (
    <React.Fragment>
      <Grid container sx={{ padding: '0 10px' }}>
        <Grid item xs={6} display="flex" justifyContent="start" alignItems={'center'}>
          {defaultLabelDisplayedRows(from, to, count)}
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="end" alignItems={'center'}>
          {page.totalElements > page.size && (
            <Pagination
              sx={{ display: 'flex' }}
              color="primary"
              // variant="outlined"
              shape="rounded"
              page={page.number + 1}
              count={page.totalPages}
              renderItem={(props2) => <PaginationItem {...props2} sx={{ border: 'none' }} />}
              onChange={(_event: React.ChangeEvent<unknown>, value: number) => (
                onPageRequest({
                  page: value - 1,
                  size: page.size,
                  sort,
                }),
                window.scrollTo(0, 0)
              )}
            />
          )}
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
