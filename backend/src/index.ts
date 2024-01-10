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

const PORT = process.env.NODE_ENV === 'test' ? 4180 : 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 8080');
});

export { app };
