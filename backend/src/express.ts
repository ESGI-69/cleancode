import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import routes from './routes';
import errorHandler from './middlewares/errorHandler';

const app = express();
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(process.env.BASE_PATH || '/', routes);
app.use(errorHandler);

export { app };
