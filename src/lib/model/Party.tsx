export type UserRole = 'ADMIN' | 'LIMITED';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED';

export type Party = {
  institutionId: string;
  description: string;
  digitalAddress: string;
  status: UserStatus;
  userRole: UserRole;
  category?: string;
  urlLogo?: string;
  fiscalCode: string;
};
