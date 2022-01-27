export type UserNotify = {
  /** The identifier used to recognize the error: it cannot be possible to have the same error id at the same time */
  id: string;
  /** The title to show in the popup */
  title: string;
  /** The body to show in the popup */
  message: React.ReactNode;
  /** The logo to be rendered. As default a confirm logo will be used */
  logo?: React.ElementType;
  /** The color used for the left border */
  leftBorderColor?: string;
};
