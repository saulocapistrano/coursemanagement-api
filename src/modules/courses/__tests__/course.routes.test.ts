import request from 'supertest';
import app from '../../../app';
import { prisma } from '@db/client';

let createdCourseId: number;

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.class.deleteMany();
  await prisma.course.deleteMany();
  await prisma.$disconnect();
});

describe('Courses API', () => {
  it('deve criar um novo curso', async () => {
    const response = await request(app)
      .post('/api/courses')
      .send({
        title: 'Curso de Testes',
        description: 'Aprendendo Jest',
        imageUrl: 'https://example.com/image.jpg',
        themes: ['tecnologia'],
        classes: [
          {
            title: 'Módulo 1',
            description: 'Introdução',
            capacity: 25,
            status: 'aberto',
            startDate: '2025-09-01T00:00:00Z',
            endDate: '2025-09-30T00:00:00Z'
          }
        ]
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('Curso de Testes');

    createdCourseId = response.body.id;
  });

  it('deve retornar erro 400 para dados inválidos', async () => {
    const response = await request(app)
      .post('/api/courses')
      .send({
        title: '',
        description: '',
        imageUrl: 'not-a-url',
        themes: [],
        classes: []
      });

    expect(response.status).toBe(400);
  });

  it('deve listar todos os cursos', async () => {
    const response = await request(app).get('/api/courses');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('deve buscar um curso por ID', async () => {
    const response = await request(app).get(`/api/courses/${createdCourseId}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(createdCourseId);
  });

  it('deve retornar 404 para curso não encontrado', async () => {
    const response = await request(app).get('/api/courses/999999');
    expect(response.status).toBe(404);
  });

  it('deve atualizar um curso existente', async () => {
    const response = await request(app)
      .put(`/api/courses/${createdCourseId}`)
      .send({
        title: 'Curso Atualizado',
        themes: ['empreendedorismo']
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Curso Atualizado');
    expect(response.body.themes).toContain('empreendedorismo');
  });

  it('deve retornar 404 ao tentar atualizar um curso inexistente', async () => {
    const response = await request(app)
      .put('/api/courses/999999')
      .send({ title: 'Qualquer coisa' });

    expect(response.status).toBe(404);
  });

  it('deve retornar 400 ao tentar atualizar com dados inválidos', async () => {
    const response = await request(app)
      .put(`/api/courses/${createdCourseId}`)
      .send({ imageUrl: 'url-invalida', themes: ['desconhecido'] });

    expect(response.status).toBe(400);
  });

  it('deve deletar um curso existente', async () => {
    const response = await request(app).delete(`/api/courses/${createdCourseId}`);
    expect(response.status).toBe(204);
  });

  it('deve retornar 404 ao tentar deletar um curso inexistente', async () => {
    const response = await request(app).delete(`/api/courses/${createdCourseId}`);
    expect(response.status).toBe(404);
  });
});
