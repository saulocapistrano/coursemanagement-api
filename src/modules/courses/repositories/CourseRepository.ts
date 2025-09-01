import { prisma } from '@db/client';
import { Prisma } from '@prisma/client';
import { CreateCourseDTO } from '../schemas/course.schema';

export class CourseRepository {
  async create(data: CreateCourseDTO) {
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
  
  async update(id: number, data: CreateCourseDTO) {
    await prisma.class.deleteMany({ where: { courseId: id } });

    return prisma.course.update({
      where: { id },
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
  
  
  async delete(id: number) {
    return prisma.course.delete({ where: { id } });
  }
}
