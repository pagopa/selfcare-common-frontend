import { useSelector } from 'react-redux';
import { appStateSelectors } from '../../redux/slices/appStateSlice';
import LoadingOverlayComponent from '../LoadingOverlayComponent';

/** This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to draw a loader when an async task to wait is running.

To use this feature you have to put LoadingOverlay in your App as a child of a redux Provider component.
In order to register the start of an async task you have to use the custom hook useLoading passing the id of the task to await, which will return a setter function used to start and end the loading behavior. */
export default function LoadingOverlay() {
  const loading = useSelector(appStateSelectors.selectLoading);

  return <LoadingOverlayComponent open={loading} />;
}
