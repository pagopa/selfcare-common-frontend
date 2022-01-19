import { useDispatch } from 'react-redux';
import { AppError, appStateActions } from '../redux/slices/appStateSlice';

export default function (): (error: AppError) => void {
  const dispatch = useDispatch();
  return (error: AppError) => dispatch(appStateActions.addError(error));
}
