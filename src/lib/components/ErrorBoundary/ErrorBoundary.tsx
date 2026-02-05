import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { TFunction } from 'i18next';
import { uniqueId } from 'lodash';
import { Component, ErrorInfo, Fragment, ReactNode } from 'react';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import i18n from '../../locale/locale-utils';
import { AppError, appStateActions, appStateSelectors } from '../../redux/slices/appStateSlice';
import { handleErrors } from '../../services/errorService';
import SessionModal from '../SessionModal';
import Toast from '../Toast';
import BlockingErrorPage from './components/BlockingErrorPage';

interface Props {
  children: ReactNode;
  assistanceEmail?: string;
  minHeight?: '52vh' | '100vh';
  t: TFunction<'translation', undefined>;
  showCloseIcon?: boolean;
}

interface ConnectedProps {
  errors: Array<AppError>;
  addError: (error: AppError) => void;
  removeError: (error: AppError) => void;
}

/** This feature is based on react-redux library and require to register the reducer build in appStateSlice into the application's redux store.
It allows to dispatch errors in order to display a warning or the error page to the user.
Errors dispatched will be notified using errorService

To use this feature you have to put ErrorBoundary in your App as a child of a redux Provider component.
In order to dispatch an error you have to use the custom hook useErrorDispatcher which will return a fuction to be used to dispatch the error. */
class ErrorBoundary extends Component<Props & ConnectedProps> {
  constructor(props: Props & ConnectedProps) {
    super(props);
    this.buildNotBlockingError.bind(this);
    this.buildErrorModal.bind(this);
    this.buildErrorToast.bind(this);
    this.handleClose.bind(this);
    this.popError.bind(this);
    this.retryError.bind(this);
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.props.addError({
      id: uniqueId('uncaught-'),
      techDescription: 'Uncaught error',
      error,
      errorInfo,
      blocking: true,
      toNotify: true,
    });
  }

  public render() {
    const hasError = this.props.errors.length > 0;
    const blockingErrors = this.props.errors.filter((e) => e.blocking);
    const hasBlockingError = blockingErrors.length > 0;

    if (hasError) {
      handleErrors(this.props.errors);
    }

    if (!hasBlockingError) {
      return (
        <Fragment>
          {this.props.children}
          {hasError && this.buildNotBlockingError(this.props.errors)}
        </Fragment>
      );
    } else {
      return (
        <BlockingErrorPage
          description={blockingErrors[0].displayableDescription}
          assistanceEmail={this.props.assistanceEmail}
          minHeight={this.props.minHeight}
        />
      );
    }
  }

  buildNotBlockingError(errors: Array<AppError>): ReactNode {
    const errorModal = errors.find((e) => e.component === 'SessionModal');
    const errorToast = errors.find((e) => e.component === 'Toast');

    return (
      <>
        {errorModal && this.buildErrorModal(errorModal)}
        {errorToast && this.buildErrorToast(errorToast)}
      </>
    );
  }

  buildErrorToast(error: AppError) {
    if (error.autoclosable === 'timer') {
      setTimeout(() => this.handleClose(error), error.autocloseMilliseconds);
    }
    return (
      <Toast
        open={true}
        title={error.displayableTitle ?? this.props.t('common.errorBoundary.toastError')}
        message={error.displayableDescription ?? this.props.t('common.errorBoundary.toastMessage')}
        logo={ErrorOutlineOutlinedIcon}
        toastColorIcon="#FE6666"
        leftBorderColor="#FE6666"
        onCloseToast={() => this.handleClose(error)}
        width={error.width}
        showToastCloseIcon={error.showCloseIcon}
      />
    );
  }

  buildErrorModal(error: AppError) {
    return (
      <SessionModal
        open={true}
        title={error.displayableTitle ?? this.props.t('common.errorBoundary.sessionModalTitle')}
        message={
          error.displayableDescription ?? this.props.t('common.errorBoundary.sessionModalMessage')
        }
        onConfirm={error.onRetry ? () => this.retryError(error) : undefined}
        handleClose={() => this.handleClose(error)}
        width={error.width}
        showCloseIcon={error.showCloseIcon}
        t={i18n.t}
      />
    );
  }

  retryError(error: AppError) {
    this.popError(error);
    if (error.onRetry) {
      error.onRetry();
    }
  }

  popError(error: AppError) {
    this.props.removeError(error);
  }

  handleClose(error: AppError) {
    this.popError(error);
    if (error.onClose) {
      error.onClose();
    }
  }
}

function mapStateToProps(state: any) {
  return {
    errors: appStateSelectors.selectErrors(state),
  };
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
  addError: (error: AppError) => dispatch(appStateActions.addError(error)),
  removeError: (error: AppError) => dispatch(appStateActions.removeError(error)),
});

const ErrorBoundaryConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(ErrorBoundary) as React.ComponentType<Props>;

export default withTranslation()(ErrorBoundaryConnected) as React.ComponentType<Props>;
