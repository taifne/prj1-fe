import { z } from 'zod';

// form zod validation schema
export const rolePermissionSchema = z.object({
  post: z.array(z.string()).optional(),
  user: z.array(z.string()).optional(),
  group: z.array(z.string()).optional(),

});

// generate form types from zod validation schema
export type RolePermissionInput = z.infer<typeof rolePermissionSchema>;
