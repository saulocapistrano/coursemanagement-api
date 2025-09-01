import { Router } from 'express';
import { CourseController } from '../modules/courses/controllers/CourseController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Endpoints de gerenciamento de cursos
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Lista todos os cursos
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: Lista de cursos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CourseResponse'
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
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateCourse'
 *     responses:
 *       201:
 *         description: Curso criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       400:
 *         description: Dados inválidos
 */
router.post('/', CourseController.create);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Atualiza um curso existente
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCourse'
 *     responses:
 *       200:
 *         description: Curso atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CourseResponse'
 *       400:
 *         description: Dados inválidos
 *       404:
 *         description: Curso não encontrado
 */
router.put('/:id', CourseController.update);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Remove um curso
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Curso removido com sucesso
 *       404:
 *         description: Curso não encontrado
 */
router.delete('/:id', CourseController.delete);

export default router;
