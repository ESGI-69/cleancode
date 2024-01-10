import { NextFunction, Request, Response } from 'express';
import cardService from '../services/card';

export default {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try {
      const cards = cardService.getAll();
      res.status(200).json(cards);
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
