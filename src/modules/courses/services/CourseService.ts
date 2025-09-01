import { CourseRepository } from '../repositories/CourseRepository';
import { createCourseSchema, updateCourseSchema, CreateCourseDTO, UpdateCourseDTO } from '../schemas/course.schema';
import { BadRequestError, NotFoundError } from '@errors/customErrors';

export class CourseService {
  private repository = new CourseRepository();

  async create(data: any): Promise<unknown> {
    try {
      const validated = createCourseSchema.parse(data);
      return this.repository.create(validated); // Aqui agora usa o tipo correto
    } catch (err) {
      throw new BadRequestError('Dados inválidos para criação do curso');
    }
  }

  async list() {
    return this.repository.findAll();
  }

  async getById(id: string | number) {
    const course = await this.repository.findById(Number(id));
    if (!course) throw new NotFoundError('Curso não encontrado');
    return course;
  }

  async update(id: string | number, data: any): Promise<unknown> {
    try {
      const validated = updateCourseSchema.parse(data);
      const course = await this.repository.findById(Number(id));
      if (!course) throw new NotFoundError('Curso não encontrado');
      return this.repository.update(Number(id), validated as CreateCourseDTO); 
    } catch (err) {
      throw new BadRequestError('Dados inválidos para atualização do curso');
    }
  }

  async delete(id: string | number) {
    const course = await this.repository.findById(Number(id));
    if (!course) throw new NotFoundError('Curso não encontrado');
    return this.repository.delete(Number(id));
  }
}
