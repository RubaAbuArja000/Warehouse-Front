import { UserRole } from '../../../enums/user-role-enum';

export type TagSeverity = 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast';

export const ROLE_SEVERITY: Record<string, TagSeverity> = {
  [UserRole.Admin]:      'danger',
  [UserRole.Management]: 'warn',
  [UserRole.Auditor]:    'info',
};

export const ROLE_OPTIONS = [
  { label: 'Admin',      value: UserRole.Admin      },
  { label: 'Management', value: UserRole.Management  },
  { label: 'Auditor',    value: UserRole.Auditor     },
];

export const PAGE_TITLE = {
  users:     'User Management',
  userNew:   'New User',
  userEdit:  'Edit User',
  logs:      'Activity Logs',
  settings:  'Settings',
} as const;

export interface CreateUserDto {
  fullName: string;
  email:    string;
  password: string;
  role:     string;
}

export interface UpdateUserDto {
  fullName: string;
  role:     string;
  isActive: boolean;
}
