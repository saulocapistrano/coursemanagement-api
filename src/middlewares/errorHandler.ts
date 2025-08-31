import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../errors/HttpError';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {

    console.error(err);
    if (err instanceof HttpError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Erro interno do servidor' });
    
    return res.status(500).json({
        error: 'Erro interno no servidor.',
    });
}