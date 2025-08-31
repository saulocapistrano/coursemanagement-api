import { Request, Response } from 'express';
import { CourseService } from '../services/CourseService';

const service = new CourseService();

export const CourseController = {
  async create(req: Request, res: Response) {
    const course = await service.create(req.body);
    res.status(201).json(course);
  },

  async list(req: Request, res: Response) {
    const courses = await service.list();
    res.json(courses);
  },

  async get(req: Request, res: Response) {
    const course = await service.getById(req.params.id);
    if (!course) return res.status(404).json({ error: 'Course not found' });
    res.json(course);
  },

  async update(req: Request, res: Response) {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  },

  async delete(req: Request, res: Response) {
    await service.delete(req.params.id);
    res.status(204).send();
  },
};
