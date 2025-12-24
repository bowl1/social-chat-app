import { z } from "zod";

export const contentSchema = z.object({
  text: z.string().max(2000).optional().nullable(),
  imageUrl: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || v.startsWith("http") || v.startsWith("/"), "Invalid image url"),
  videoUrl: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || v.startsWith("http") || v.startsWith("/"), "Invalid video url"),
});

export const postCreateSchema = z.object({
  content: contentSchema.default({}),
  groupId: z.string().min(1, "groupId is required"),
});

export const commentCreateSchema = z.object({
  content: z.any(),
  postId: z.string().min(1, "postId is required"),
  groupId: z.string().min(1, "groupId is required"),
  parentId: z.string().optional().nullable(),
});

export const authMeSchema = z.object({
  username: z.string().min(1).optional(),
  email: z.string().email().optional(),
  avatar: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || v.startsWith("http") || v.startsWith("/"), "Invalid url"),
  gender: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
});

export const userUpdateSchema = z.object({
  username: z.string().optional(),
  gender: z.string().optional(),
  language: z.string().optional(),
  country: z.string().optional(),
  avatar: z
    .string()
    .optional()
    .nullable()
    .refine((v) => !v || v.startsWith("http") || v.startsWith("/"), "Invalid url"),
});
