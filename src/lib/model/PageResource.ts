import { Page } from './Page';

export type PageResource<T> = {
  content: Array<T>;
  page: Page;
};
