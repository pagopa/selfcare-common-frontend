export type JwtUser = {
  uid: string;
  fiscal_number?: string;
  name?: string;
  family_name?: string;
  email?: string;
  exp: string;
  iss?: string;
};
