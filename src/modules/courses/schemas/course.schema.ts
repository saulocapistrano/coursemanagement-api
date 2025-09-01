import { z } from 'zod';

export const createCourseSchema = z.object({
  title: z.string().min(1, { message: 'O título é obrigatório' }),
  description: z.string().min(1, { message: 'A descrição é obrigatória' }),
  imageUrl: z.string().url({ message: 'URL da imagem inválida' }),
  themes: z.array(z.enum(['inovação', 'tecnologia', 'marketing', 'empreendedorismo', 'agro']))
    .min(1, { message: 'Informe ao menos um tema válido' }),

  classes: z.array(
    z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      capacity: z.number().min(1),
      status: z.enum(['aberto', 'encerrado']),
      startDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Data de início inválida',
      }),
      endDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: 'Data de término inválida',
      }),
    })
  ).min(1)
});

export const updateCourseSchema = createCourseSchema.partial();
export type CreateCourseDTO = z.infer<typeof createCourseSchema>;
export type UpdateCourseDTO = z.infer<typeof updateCourseSchema>;