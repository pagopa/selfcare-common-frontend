import { Button } from '@mui/material';
import { Fragment, useState } from 'react';
import { FilterModal } from '../lib';

type FilterValueType = {
  id: number;
  label: string;
};

const data: Array<FilterValueType> = [
  {
    id: 1,
    label: 'label1',
  },
  {
    id: 2,
    label: 'label2',
  },
  {
    id: 3,
    label: 'label3',
  },
];

export default () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string>();

  return (
    <Fragment>
      <Button onClick={() => setOpen(true)} variant="contained">
        Open filter modal{selected ? `(${selected})` : ''}
      </Button>
      <FilterModal
        open={open}
        title="Filter Modal Example"
        handleClose={() => setOpen(false)}
        minHeight="17em"
        filterModalConfig={{
          data,
          getLabel: (d) => d.label,
          getValue: (d) => d.id,
          onFilterChange: (v) => setSelected(v),
        }}
      />
    </Fragment>
  );
};
