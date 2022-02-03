import { AppError } from '../redux/slices/appStateSlice';
import { GENERIC_EVENT, trackEvent } from './analyticsService';

export const handleErrors = (errors: Array<AppError>) => {
  errors
    .filter((e) => e.toNotify)
    .forEach((e) => {
      trackEvent(GENERIC_EVENT, e);
    });
};
