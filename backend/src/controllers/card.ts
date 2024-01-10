import { NextFunction, Request, Response } from 'express';

import cardService from '../services/card';
import { isValidTagList } from '../utils/typeGuards';

export default {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.query.tags) {
        return res.status(200).json(cardService.getAll());
      }
      if (typeof req.query.tags === 'string') req.query.tags = [req.query.tags];
      if (!isValidTagList(req.query.tags)) throw new Error('Invalid tags');
      return res.status(200).json(cardService.getAllByTags(req.query.tags));
    } catch (error) {
      next(error);
    }
  },

  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      const card = cardService.create(req.body);
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  },
};
