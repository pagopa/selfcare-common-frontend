import { useEffect, useState } from 'react';
import { PageRequest } from '../../model/PageRequest';
import { PageResource } from '../../model/PageResource';
import useFakePagination from '../useFakePagination';
import { fetchTestData } from '../../../examples/services/testService';
import { fireEvent, waitFor, render, screen } from '@testing-library/react';

type CustomType = {
  prop1: string;
  prop2: number;
};

let spyFetch: () => Promise<Array<CustomType>>;

beforeEach(() => {
  spyFetch = vi.fn(fetchTestData);
});

const renderApp = () => {
  const Component = () => {
    const fakePaginatedFetch = useFakePagination(spyFetch);
    const [data, setData] = useState<PageResource<CustomType>>();
    const [pageRequest, setPageRequest] = useState<PageRequest>({ page: 0, size: 1 });

    useEffect(() => {
      if (pageRequest) {
        fakePaginatedFetch(pageRequest, false).then((data) => setData(data));
      }
    }, [pageRequest]);

    return (
      <div>
        <input
          id="page"
          onChange={(e) =>
            setPageRequest({ ...pageRequest, page: Number.parseInt(e.target.value) })
          }
        />
        <input
          id="size"
          onChange={(e) =>
            setPageRequest({ ...pageRequest, size: Number.parseInt(e.target.value) })
          }
        />
        <input
          id="sort"
          onChange={(e) => setPageRequest({ ...pageRequest, sort: e.target.value })}
        />

        {data && (
          <div>{`page:${data.page.number},size:${data.page.size},totalElements:${data.page.totalElements},totalPages:${data.page.totalPages}`}</div>
        )}

        {data && data.content.length > 0
          ? data.content.map((o, index) => (
              <div key={o.prop1}>{`(${index + 1})${o.prop1}_${o.prop2}`}</div>
            ))
          : 'no data'}
      </div>
    );
  };

  render(<Component />);
};

const getInput = (id: string): HTMLInputElement => document.getElementById(id) as HTMLInputElement;
const changeInput = async (input: HTMLInputElement, value: string) => {
  fireEvent.change(input, { target: { value } });
  await waitFor(() => expect(input.value).toBe(value));
};

test('test', async () => {
  renderApp();

  const pageInput = getInput('page');
  const sizeInput = getInput('size');
  const sortInput = getInput('sort');

  await waitFor(() => screen.getByText('page:0,size:1,totalElements:3,totalPages:3'));
  await waitFor(() => screen.getByText('(1)z_5'));
  expect(screen.queryByText('(2)b_200')).toBeNull();
  expect(screen.queryByText('(3)g_25')).toBeNull();

  await changeInput(sizeInput, '5');

  await waitFor(() => screen.getByText('page:0,size:5,totalElements:3,totalPages:1'));
  await waitFor(() => screen.getByText('(1)z_5'));
  await waitFor(() => screen.getByText('(2)b_200'));
  await waitFor(() => screen.getByText('(3)g_25'));

  await changeInput(sizeInput, '1');
  await changeInput(pageInput, '1');

  await waitFor(() => screen.getByText('page:1,size:1,totalElements:3,totalPages:3'));
  await waitFor(() => screen.getByText('(1)b_200'));

  await changeInput(pageInput, '2');

  await waitFor(() => screen.getByText('page:2,size:1,totalElements:3,totalPages:3'));
  await waitFor(() => screen.getByText('(1)g_25'));

  await changeInput(sortInput, 'prop1,asc');

  await waitFor(() => screen.getByText('page:2,size:1,totalElements:3,totalPages:3'));
  await waitFor(() => screen.getByText('(1)z_5'));

  await changeInput(sizeInput, '2');
  await changeInput(pageInput, '1');

  await waitFor(() => screen.getByText('page:1,size:2,totalElements:3,totalPages:2'));
  await waitFor(() => screen.getByText('(1)z_5'));

  await changeInput(sortInput, 'prop1,desc');

  await waitFor(() => screen.getByText('page:1,size:2,totalElements:3,totalPages:2'));
  await waitFor(() => screen.getByText('(1)b_200'));

  await changeInput(pageInput, '10');

  await waitFor(() => screen.getByText('page:10,size:2,totalElements:3,totalPages:2'));
  screen.getByText('no data');

  await changeInput(sizeInput, '0');
  await waitFor(() => screen.getByText('page:10,size:0,totalElements:3,totalPages:0'));
  screen.getByText('no data');

  expect(spyFetch).toHaveBeenCalledTimes(1);
});
