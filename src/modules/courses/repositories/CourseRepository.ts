import { prisma } from '@db/client';
import { Prisma } from '@prisma/client';

export class CourseRepository {
  async create(data: Prisma.CourseCreateInput) {
    return prisma.course.create({ data });
  }

  async findAll() {
    return prisma.course.findMany();
  }

  async findById(id: string) {
    return prisma.course.findUnique({ where: { id } });
  }

  async update(id: string, data: Prisma.CourseCreateInput) {
    return prisma.course.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.course.delete({ where: { id } });
  }
}
