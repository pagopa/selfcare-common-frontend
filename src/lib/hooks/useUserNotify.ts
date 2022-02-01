import { useDispatch } from 'react-redux';
import { UserNotify } from '../model/UserNotify';
import { appStateActions } from '../redux/slices/appStateSlice';

/** @see {@link UserNotifyHandle} */
export default function (): (notify: UserNotify) => void {
  const dispatch = useDispatch();
  return (notify: UserNotify) => dispatch(appStateActions.addNotify(notify));
}
