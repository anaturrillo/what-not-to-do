import { Request, Response, Router } from 'express';

export const routes = (): Router => {
  // eslint-disable-next-line new-cap
  const router = Router();

  router.get('/', (req: Request, res: Response) => {
    res.json('pepe');
  });

  return router;
};
