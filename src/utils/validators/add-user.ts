import { z } from 'zod';
import { messages } from '@/config/messages';

// form zod validation schema
export const addUserToGroupSchema = z.object({
  roleName: z
    .string()
    .min(1, { message: messages.roleNameIsRequired })
    .min(3, { message: messages.roleNameLengthMin })
});

// generate form types from zod validation schema
export type AddUserInput = z.infer<typeof addUserToGroupSchema>;
