import { CourseRepository } from '../repositories/CourseRepository';
import { createCourseSchema, updateCourseSchema } from '../schemas/course.schema';

export class CourseService {
  private repository = new CourseRepository();

  async create(data: any) {
    const validated = createCourseSchema.parse(data);
    return this.repository.create(validated);
  }

  async list() {
    return this.repository.findAll();
  }

  async getById(id: string) {
    return this.repository.findById(id);
  }

  async update(id: string, data: any) {
    const validated = updateCourseSchema.parse(data);
    return this.repository.update(id, validated);
  }

  async delete(id: string) {
    return this.repository.delete(id);
  }
}
