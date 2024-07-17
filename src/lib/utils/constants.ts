export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';
export const LOADING_TASK_RETRIEVE_CACHED_VALUES = 'RETRIEVE_CACHED_VALUES';

export type UserRole = 'ADMIN' | 'LIMITED' | 'ADMIN_EA';

export const emailRegexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,6}$');

/** The short and long labels used for the roles of selfcare's projects */
export const roleLabels: {
  [key in UserRole]: { shortLabelKey: string; longLabelKey: string; descriptionKey: string };
} = {
  ADMIN: {
    shortLabelKey: 'common.roles.admin.shortLabel',
    longLabelKey: 'common.roles.admin.longLabel',
    descriptionKey: 'common.roles.admin.description',
  },
  ADMIN_EA: {
    shortLabelKey: 'common.roles.admin.shortLabel',
    longLabelKey: 'common.roles.admin.longLabel',
    descriptionKey: 'common.roles.admin.description',
  },
  LIMITED: {
    shortLabelKey: 'common.roles.limited.shortLabel',
    longLabelKey: 'common.roles.limited.longLabel',
    descriptionKey: 'common.roles.limited.description',
  },
};

/** The short and long labels used for the roles of PNPG */
export const pnpgRoleLabels: {
  [key in UserRole]: { shortLabelKey: string; longLabelKey: string; descriptionKey: string };
} = {
  ADMIN: {
    shortLabelKey: 'common.pnpgRoles.admin.shortLabel',
    longLabelKey: 'common.pnpgRoles.admin.longLabel',
    descriptionKey: 'common.pnpgRoles.admin.description',
  },
  ADMIN_EA: {
    shortLabelKey: 'common.pnpgRoles.admin.shortLabel',
    longLabelKey: 'common.pnpgRoles.admin.longLabel',
    descriptionKey: 'common.pnpgRoles.admin.description',
  },
  LIMITED: {
    shortLabelKey: 'common.pnpgRoles.limited.shortLabel',
    longLabelKey: 'common.pnpgRoles.limited.longLabel',
    descriptionKey: 'common.pnpgRoles.limited.description',
  },
};

export enum Actions {
  ManageProductGroups = "Selc:ManageProductGroups",
  ManageProductUsers = "Selc:ManageProductUsers",
  ViewDelegations = "Selc:ViewDelegations",
  ViewManagedInstitutions = "Selc:ViewManagedInstitutions",
  AccessProductBackoffice = "Selc:AccessProductBackoffice",
  ListActiveProducts = "Selc:ListActiveProducts",
  ListAvailableProducts = "Selc:ListAvailableProducts",
  RequestProductAccess = "Selc:RequestProductAccess",
  ViewBilling = "Selc:ViewBilling",
  UploadLogo = "Selc:UploadLogo",
}
