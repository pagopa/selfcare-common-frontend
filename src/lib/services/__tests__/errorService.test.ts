import { AppError } from '../../redux/slices/appStateSlice';
import { trackAppError } from '../analyticsService';
import { handleErrors } from '../errorService';

jest.mock('../analyticsService', () => ({ trackAppError: jest.fn() }));

test('test', () => {
  const appErrors: Array<AppError> = [...Array(5).keys()].map((i) => ({
    id: `ERROR_${i}`,
    blocking: false,
    toNotify: i % 2 == 0,
    techDescription: `ERROR_DESC_${i}`,
    error: new Error(),
  }));
  handleErrors(appErrors);

  expect(trackAppError).toHaveBeenCalledTimes(3);

  expect(trackAppError).toHaveBeenCalledWith(appErrors[0]);
  expect(trackAppError).toHaveBeenCalledWith(appErrors[2]);
  expect(trackAppError).toHaveBeenCalledWith(appErrors[4]);
});
