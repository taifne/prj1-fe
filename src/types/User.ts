import { ROLES } from '@/config/constants';
export const PERMISSIONS = {
    Read: 'Read',
    Write: 'Write',
    Delete: 'Delete',
  } as const;
  
  export const STATUSES = {
    Pending: 'Pending',
    Active: 'Active',
    Deactivated: 'Deactivated',
  } as const;
  
export type User = {
    _id: string;
    avatar: string;
    fullName: string;
    email: string;
    role: keyof typeof ROLES;
    createdAt: Date;
    permissions: keyof typeof PERMISSIONS;
    status: keyof typeof STATUSES;
  };
  

