export const LOADING_TASK_LOGIN_CHECK = 'LOGIN_CHECK';
export const LOADING_TASK_RETRIEVE_CACHED_VALUES = 'RETRIEVE_CACHED_VALUES';

export type UserRole = 'ADMIN' | 'LIMITED' | 'ADMIN_EA';

export const emailRegexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,6}$');

const commonRolesAdminLabels = {
  shortLabelKey: 'common.roles.admin.shortLabel',
  longLabelKey: 'common.roles.admin.longLabel',
  descriptionKey: 'common.roles.admin.description',
};

/** The short and long labels used for the roles of selfcare's projects */
export const roleLabels: {
  [key in UserRole]: { shortLabelKey: string; longLabelKey: string; descriptionKey: string };
} = {
  ADMIN: commonRolesAdminLabels,
  ADMIN_EA: commonRolesAdminLabels,
  LIMITED: {
    shortLabelKey: 'common.roles.limited.shortLabel',
    longLabelKey: 'common.roles.limited.longLabel',
    descriptionKey: 'common.roles.limited.description',
  },
};

const commonRolesPnpgAdminLabels = {
  shortLabelKey: 'common.pnpgRoles.admin.shortLabel',
  longLabelKey: 'common.pnpgRoles.admin.longLabel',
  descriptionKey: 'common.pnpgRoles.admin.description',
};

/** The short and long labels used for the roles of PNPG */
export const pnpgRoleLabels: {
  [key in UserRole]: { shortLabelKey: string; longLabelKey: string; descriptionKey: string };
} = {
  ADMIN: commonRolesPnpgAdminLabels,
  ADMIN_EA: commonRolesPnpgAdminLabels,
  LIMITED: {
    shortLabelKey: 'common.pnpgRoles.limited.shortLabel',
    longLabelKey: 'common.pnpgRoles.limited.longLabel',
    descriptionKey: 'common.pnpgRoles.limited.description',
  },
};

export enum Actions {
  ManageProductGroups = 'Selc:ManageProductGroups',
  UpdateProductUsers = 'Selc:UpdateProductUsers',
  DeleteProductUsers = 'Selc:DeleteProductUsers',
  CreateProductUsers = 'Selc:CreateProductUsers',
  ListProductUsers = 'Selc:ListProductUsers',
  ListProductGroups = 'Selc:ListProductGroups',
  ViewDelegations = 'Selc:ViewDelegations',
  CreateDelegation = 'Selc:CreateDelegation',
  ViewManagedInstitutions = 'Selc:ViewManagedInstitutions',
  AccessProductBackoffice = 'Selc:AccessProductBackoffice',
  AccessProductBackofficeAdmin = 'Selc:AccessProductBackofficeAdmin',
  ListActiveProducts = 'Selc:ListActiveProducts',
  ListAvailableProducts = 'Selc:ListAvailableProducts',
  RequestProductAccess = 'Selc:RequestProductAccess',
  ViewBilling = 'Selc:ViewBilling',
  UploadLogo = 'Selc:UploadLogo',
  UpdateInstitution = 'Selc:UpdateInstitutionData',
  ViewContract = 'Selc:ViewContract',
}

export const PRODUCT_IDS = {
  PAGOPA: 'prod-pagopa',
  IO: 'prod-io',
  SEND: 'prod-pn',
  SEND_DEV: 'prod-pn-dev',
  INTEROP: 'prod-interop',
  IDPAY: 'prod-idpay',
  IO_SIGN: 'prod-io-sign',
  FD: 'prod-fd',
  FD_GARANTITO: 'prod-fd-garantito',
  DASHBOARD_PSP: 'prod-dashboard-psp',
  IO_PREMIUM: 'prod-io-premium',
  CIBAN: 'prod-ciban',
  CGN: 'prod-cgn',
  IDPAY_MERCHANT: 'prod-idpay-merchant',
};
