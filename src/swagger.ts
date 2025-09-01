import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Course Management API',
      version: '1.0.0',
      description: 'API para gerenciamento de cursos, turmas e matrículas',
    },
    components: {
      schemas: {
        CreateCourse: {
          type: 'object',
          required: ['title', 'description', 'themes', 'imageUrl'],
          properties: {
            title: {
              type: 'string',
              example: 'Curso de Marketing Digital'
            },
            description: {
              type: 'string',
              example: 'Curso completo sobre estratégias digitais'
            },
            themes: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['inovação', 'tecnologia', 'marketing', 'empreendedorismo', 'agro']
              },
              example: ['marketing', 'tecnologia']
            },
            imageUrl: {
              type: 'string',
              example: 'https://example.com/imagem.jpg'
            },
            classes: {
              type: 'array',
              items: { $ref: '#/components/schemas/CourseClass' }
            }
          }
        },
        UpdateCourse: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Novo título' },
            description: { type: 'string', example: 'Descrição atualizada' },
            themes: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['inovação', 'tecnologia', 'marketing', 'empreendedorismo', 'agro']
              },
              example: ['empreendedorismo']
            },
            imageUrl: { type: 'string', example: 'https://img.com/novo.jpg' },
            classes: {
              type: 'array',
              items: { $ref: '#/components/schemas/CourseClass' }
            }
          }
        },
        CourseResponse: {
          type: 'object',
          properties: {
            id: { type: 'string', example: '1' },
            title: { type: 'string', example: 'Curso de Empreendedorismo' },
            description: { type: 'string', example: 'Aprenda a criar e gerir negócios.' },
            themes: {
              type: 'array',
              items: {
                type: 'string',
                enum: ['inovação', 'tecnologia', 'marketing', 'empreendedorismo', 'agro']
              },
              example: ['empreendedorismo', 'inovação']
            },
            imageUrl: { type: 'string', example: 'https://img.com/exemplo.jpg' },
            classes: {
              type: 'array',
              items: { $ref: '#/components/schemas/CourseClass' }
            }
          }
        },
        CourseClass: {
          type: 'object',
          required: ['title', 'description', 'capacity', 'status', 'startDate', 'endDate'],
          properties: {
            title: { type: 'string', example: 'Módulo 1' },
            description: { type: 'string', example: 'Introdução ao conteúdo' },
            capacity: { type: 'integer', example: 30 },
            status: {
              type: 'string',
              enum: ['aberto', 'encerrado'],
              example: 'aberto'
            },
            startDate: {
              type: 'string',
              format: 'date-time',
              example: '2025-09-01T09:00:00Z'
            },
            endDate: {
              type: 'string',
              format: 'date-time',
              example: '2025-12-01T18:00:00Z'
            }
          }
        }
        
      }},
    tags: [
      {
        name: 'Courses',
        description: 'Endpoints de gerenciamento de cursos',
      }
    ],
    servers: [
      {
        url: 'http://localhost:3010/api',
        description: 'Servidor local',
      }
    ]
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
