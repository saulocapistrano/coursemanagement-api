import { Router } from 'express';
import { CourseController } from '../modules/courses/controllers/CourseController';

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Endpoints de gerenciamento de cursos
 */

const router = Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lista de cursos
 */
router.get('/', CourseController.list);

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Busca um curso por ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Curso encontrado
 *       404:
 *         description: Curso não encontrado
 */
router.get('/:id', CourseController.get);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Cria um novo curso
 *     tags: [Courses]
 */
router.post('/', CourseController.create);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Atualiza um curso
 *     tags: [Courses]
 */
router.put('/:id', CourseController.update);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Remove um curso
 *     tags: [Courses]
 */
router.delete('/:id', CourseController.delete);

export default router;
