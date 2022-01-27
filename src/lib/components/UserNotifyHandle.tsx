import { useDispatch, useSelector } from 'react-redux';
import { Toast } from '..';
import { appStateActions, appStateSelectors } from '../redux/slices/appStateSlice';

function UserNotifyHandle() {
  const notifies = useSelector(appStateSelectors.selectNotifies);
  const hasNotify = notifies.length > 0;
  const notify = hasNotify ? notifies[0] : undefined;
  const dispatch = useDispatch();

  return (
    <Toast
      open={hasNotify}
      title={notify?.title ?? 'NOTIFY'}
      message={notify?.message ?? 'YOU GET A NOTIFY!'}
      logo={notify?.logo}
      leftBorderColor={notify?.leftBorderColor}
      onCloseToast={() => dispatch(appStateActions.removeNotify(notify))}
    />
  );
}

export default UserNotifyHandle;
