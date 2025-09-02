import { ICourseRepository } from '../repositories/ICourseRepository';
import { CreateCourseDTO, UpdateCourseDTO, createCourseSchema, updateCourseSchema } from '../schemas/course.schema';
import { BadRequestError, NotFoundError } from '@errors/customErrors';

export class CourseService {
  constructor(private repository: ICourseRepository) {}

  async create(data: any) {
    try {
      const validated = createCourseSchema.parse(data);
      return this.repository.create(validated);
    } catch {
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

  async update(id: string | number, data: any) {
    // 1) Validação apenas
    let validated: UpdateCourseDTO;
    try {
      validated = updateCourseSchema.parse(data);
    } catch {
      throw new BadRequestError('Dados inválidos para atualização do curso');
    }

    // 2) Checar existência fora do try/catch para não mascarar 404 como 400
    const exists = await this.repository.findById(Number(id));
    if (!exists) throw new NotFoundError('Curso não encontrado');

    // 3) Passar o DTO parcial mesmo
    return this.repository.update(Number(id), validated as CreateCourseDTO);
  }

  async delete(id: string | number) {
    const course = await this.repository.findById(Number(id));
    if (!course) throw new NotFoundError('Curso não encontrado');
    return this.repository.delete(Number(id));
  }
}
