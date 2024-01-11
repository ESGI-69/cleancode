import { app } from './express';

const PORT = process.env.NODE_ENV === 'test' ? 4180 : 8080;

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port 8080');
});
