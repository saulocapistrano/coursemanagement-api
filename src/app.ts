import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';
import { setupSwagger } from './swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);
setupSwagger(app);

export default app;