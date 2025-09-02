import { prisma } from '@db/client';
import { CreateCourseDTO, UpdateCourseDTO } from '../schemas/course.schema';
import { ICourseRepository } from './ICourseRepository';
import { Course, Class } from '@prisma/client';

export class CourseRepository implements ICourseRepository {
  async create(data: CreateCourseDTO): Promise<Course & { classes: Class[] }> {
    return prisma.course.create({
      data: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        themes: data.themes,
        classes: {
          create: data.classes.map(cls => ({
            title: cls.title,
            description: cls.description,
            capacity: cls.capacity,
            status: cls.status,
            startDate: new Date(cls.startDate),
            endDate: new Date(cls.endDate)
          }))
        }
      },
      include: { classes: true }
    });
  }

  async findAll() {
    return prisma.course.findMany();
  }

  async findById(id: number) {
    return prisma.course.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateCourseDTO): Promise<Course & { classes: Class[] }> {
    const updateData: any = {};

    if (typeof data.title !== 'undefined') updateData.title = data.title;
    if (typeof data.description !== 'undefined') updateData.description = data.description;
    if (typeof data.imageUrl !== 'undefined') updateData.imageUrl = data.imageUrl;
    if (typeof data.themes !== 'undefined') updateData.themes = data.themes;

    if (typeof data.classes !== 'undefined') {
      await prisma.class.deleteMany({ where: { courseId: id } });

      updateData.classes = {
        create: data.classes.map(cls => ({
          title: cls.title,
          description: cls.description,
          capacity: cls.capacity,
          status: cls.status,
          startDate: new Date(cls.startDate),
          endDate: new Date(cls.endDate)
        }))
      };
    }

    return prisma.course.update({
      where: { id },
      data: updateData,
      include: { classes: true }
    });
  }

  async delete(id: number) {
    return prisma.course.delete({ where: { id } });
  }
}
