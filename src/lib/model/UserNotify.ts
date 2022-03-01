export type UserNotify = {
  /** The identifier used to recognize the user notify: it cannot be possible to have the same error id at the same time */
  id: string;
  /** The title to show in the popup or toast */
  title: string;
  /** The body to show in the popup or toast */
  message: React.ReactNode;
  /** If component === 'Toast'. The logo to be rendered. As default a confirm logo will be used */
  logo?: React.ElementType;
  /** If component === 'Toast'. The notify will be autoclosed using this configuration, as default timer.
   * If none, it will not be closed automatically.
   * If timer, it will be closed after autocloseMilliseconds milliseconds
   */
  autoclosable?: 'none' | 'timer';
  /** If component === 'Toast' and autoclosable === 'timer'. The millisecond after which close the notify. As default 10000 */
  autocloseMilliseconds?: number;
  /** If component === 'Toast'. The color used for the left border */
  leftBorderColor?: string;
  /** If component === 'SessionModal'. If defined, it will render a confirm button which will execute this function */
  onConfirm?: () => void;
  /** If component === 'SessionModal'. If present, this string will rappresent the confirm button label */
  confirmLabel?: string;
  /** If defined, it will be executed when closing the popup */
  onClose?: () => void;
  /** If component === 'SessionModal'. The close button label */
  closeLabel?: string;
  /** Can render a SessionModal or Toast component */
  component?: 'SessionModal' | 'Toast';
  /** The SessionModal or Toast width */
  width?: string | undefined;
};
