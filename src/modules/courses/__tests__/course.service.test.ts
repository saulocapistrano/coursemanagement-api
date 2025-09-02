import { CourseService } from '../services/CourseService';
import { ICourseRepository } from '../repositories/ICourseRepository';
import { createMockedRepository } from './utils/createMockedRepository';

describe('CourseService', () => {
  let service: CourseService;
  let repo: jest.Mocked<ICourseRepository>;

  beforeEach(() => {
    repo = createMockedRepository<ICourseRepository>([
      'create',
      'findAll',
      'findById',
      'update',
      'delete'
    ]);

    service = new CourseService(repo); 
  });

  it('deve criar curso com sucesso', async () => {
    const dto = {
      title: 'Novo Curso',
      description: 'Desc',
      imageUrl: 'https://img.com/img.jpg',
      themes: ['tecnologia'],
      classes: [{
        title: 'Módulo 1',
        description: 'Intro',
        capacity: 20,
        status: 'aberto',
        startDate: '2025-09-01T00:00:00Z',
        endDate: '2025-09-10T00:00:00Z'
      }]
    };

    repo.create.mockResolvedValue({ id: 1, ...dto } as any);

    const result = await service.create(dto);

    expect(repo.create).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Novo Curso',
      themes: ['tecnologia']
    }));

    expect(result).toHaveProperty('id');
  });

  it('deve lançar erro ao criar curso com dados inválidos', async () => {
    await expect(service.create({})).rejects.toThrow('Dados inválidos para criação do curso');
  });

  it('deve retornar curso por ID se existir', async () => {
    repo.findById.mockResolvedValue({ id: 1, title: 'Curso X' } as any);

    const result = await service.getById(1);

    expect(result).toHaveProperty('id', 1);
  });

  it('deve atualizar curso com sucesso', async () => {
    repo.findById.mockResolvedValue({ id: 1 } as any);
    repo.update.mockResolvedValue({ id: 1, title: 'Atualizado' } as any);

    const result = await service.update(1, { title: 'Atualizado' });

    expect(repo.update).toHaveBeenCalledWith(1, expect.objectContaining({ title: 'Atualizado' }));
    expect(result).toHaveProperty('title', 'Atualizado');
  });

  it('deve lançar erro ao atualizar curso inexistente', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(service.update(999, { title: 'X' })).rejects.toThrow('Curso não encontrado');
  });

  it('deve lançar erro ao atualizar com dados inválidos', async () => {
    repo.findById.mockResolvedValue({ id: 1 } as any);

    await expect(service.update(1, { themes: ['inválido'] })).rejects.toThrow('Dados inválidos para atualização do curso');
  });

  it('deve deletar curso com sucesso', async () => {
    repo.findById.mockResolvedValue({ id: 1 } as any);
    repo.delete.mockResolvedValue(undefined as any);

    await expect(service.delete(1)).resolves.toBeUndefined();
    expect(repo.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro ao deletar curso inexistente', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(service.delete(123)).rejects.toThrow('Curso não encontrado');
  });
});
