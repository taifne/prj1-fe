import { ROLES } from '@/config/constants';
import { PERMISSIONS, STATUSES } from '@/data/users-data';

export const statuses = Object.values(STATUSES).map((status) => ({
  name: status,
  value: status,
}));
export const permissions = Object.values(PERMISSIONS).map((permission) => ({
  name: permission,
  value: permission,
}));
export const roles = Object.entries(ROLES).map(([key, value]) => ({
  name: value,
  value: key,
}));
type CreateRoleInput = {
  roleName: string;
  roleColor?: {
      a: number;
      b: number;
      g: number;
      r: number;
  } | undefined;
}

type NewRole = {
  name: string;
  users: string[];
  permissions: string[];
  color: string;
}

export function convertToNewRole(input: CreateRoleInput): NewRole {
  let colorHex: string = "#000000"; // Default color if roleColor is not provided

  // If roleColor is provided, convert it to hexadecimal
  if (input.roleColor) {
      const { r, g, b } = input.roleColor;
      colorHex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return {
      name: input.roleName,
      users: [],
      permissions: [],
      color: colorHex
  };
}

function toHex(color: number): string {
  const hex = color.toString(16);
  return hex.length === 1 ? '0' + hex : hex;
}

