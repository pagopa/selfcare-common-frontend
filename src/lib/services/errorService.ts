import { AppError } from '../redux/slices/appStateSlice';

export const handleErrors = (errors: Array<AppError>) => {
  errors
    .filter((e) => e.toNotify)
    .forEach((e) => {
      console.error('An error occurred: ', e);
    });
};
