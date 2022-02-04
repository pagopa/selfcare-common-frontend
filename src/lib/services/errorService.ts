import { AppError } from '../redux/slices/appStateSlice';
import { trackAppError } from './analyticsService';

export const handleErrors = (errors: Array<AppError>) => {
  errors
    .filter((e) => e.toNotify)
    .forEach((e) => {
      trackAppError(e);
    });
};
