import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { setupSwagger } from './swagger';
import { errorHandler } from '@middlewares/errorHandler';

dotenv.config();

const app = express();

// Middlewares globais
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', router);

// Swagger
setupSwagger(app);

// Middleware de erro
app.use(errorHandler);
export default app;