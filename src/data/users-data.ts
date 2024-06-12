import { ROLES } from '@/config/constants';
import { avatarIds } from '@/utils/get-avatar';
import { getRandomArrayElement } from '@/utils/get-random-array-element';

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

export const usersData = [
  {
    id: "65f9d697f7e45289d578def8",
    email: "superadmin@gmail.com",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPgEmtQwrC7r80BUtMhPaF6okDFFu41i5fRQ&usqp=CAU",
    status: "active",
    role: "user",
    permissions: [
      "read"
    ],
    createdAt: "2024-03-19T18:16:55.871Z",
    fullName: "super admin"
  }
];
