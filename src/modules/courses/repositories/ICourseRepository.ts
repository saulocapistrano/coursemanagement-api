import { Course, Class } from '@prisma/client';
import { CreateCourseDTO, UpdateCourseDTO } from '../schemas/course.schema';

export interface ICourseRepository {
  create(data: CreateCourseDTO): Promise<Course & { classes: Class[] }>;
  findAll(): Promise<Course[]>;
  findById(id: number): Promise<Course | null>;
  update(id: number, data: UpdateCourseDTO): Promise<Course & { classes: Class[] }>;
  delete(id: number): Promise<Course>;
}
