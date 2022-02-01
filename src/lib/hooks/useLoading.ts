import { uniqueId } from 'lodash';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { appStateActions } from '../redux/slices/appStateSlice';

/** @see {@link LoadingOverlay} */
export default function (task: string): (loading: boolean) => void {
  const dispatch = useDispatch();
  const ref = useRef(uniqueId());
  return (loading: boolean) =>
    dispatch(appStateActions.setLoading({ task: `${task}[${ref.current}]`, loading }));
}
