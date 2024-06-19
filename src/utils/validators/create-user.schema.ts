import { z } from 'zod';
import { messages } from '@/config/messages';
import { validateEmail } from '@/utils/validators/common-rules';

// form zod validation schema
export const createUserSchema = z.object({
  fullName: z.string().min(1, { message: messages.fullNameIsRequired }),
  email: validateEmail,
  role: z.string().min(1, { message: messages.roleIsRequired }),
  permissions: z.string().min(1, { message: messages.permissionIsRequired }),
  status: z.string().min(1, { message: messages.statusIsRequired }),
});

export const createNewsSchema = z.object({
  title: z.string().min(1, { message: "title is required" }),
  description: z.string().min(1, { message: "description is required" }),
  startDay: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  endDay: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  link: z.string().optional().nullable(),
  image: z.union([z.string().url().optional().nullable(), z.literal("null")])

});
export const eventSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  location: z.string().min(1),
  start: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Assuming date format YYYY-MM-DD
  end: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),   // Assuming date format YYYY-MM-DD
  group: z.string().min(1),
});

export const questionSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1)
});


// generate form types from zod validation schema
export type CreateUserInput = z.infer<typeof createUserSchema>;
export type CreateNewInput = z.infer<typeof createNewsSchema>;
export type CreateEventInput = z.infer<typeof eventSchema>;
export type CreateQuestionInput = z.infer<typeof questionSchema>;
