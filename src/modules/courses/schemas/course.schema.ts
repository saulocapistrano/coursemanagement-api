import { z } from 'zod';

export const createCourseSchema = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    imageUrl: z.string().url(),
    themes: z.array(z.string()).min(1),
  });
  
export const updateCourseSchema = createCourseSchema.partial();