import express from 'express';
import { routes } from './api/routes';

const app = express();

app.use('/api', routes());

app.listen(3008, () => {
  // eslint-disable-next-line no-console
  console.log('app listening');
});
