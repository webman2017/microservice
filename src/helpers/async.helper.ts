import { Request, Response, NextFunction } from 'express';

const aSync = (controller: (req: Request, res: Response) => Promise<void>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await controller(req, res);
    } catch (error) {
      next(error);
    }
  };

export = aSync;
