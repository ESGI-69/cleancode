import { NextFunction, Request, Response } from 'express';

import cardService from '../services/card';
import { isValidCardUserData, isValidTagList } from '../utils/typeGuards';
import { CustomError } from '../errors/CustomError';

export default {
  getAll: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.query.tags) {
        return res.status(200).json(cardService.getAll());
      }
      if (typeof req.query.tags === 'string') req.query.tags = [req.query.tags];
      if (!isValidTagList(req.query.tags)) throw new CustomError({ message: 'Invalid tags', statusCode: 400 });
      return res.status(200).json(cardService.getAllByTags(req.query.tags));
    } catch (error) {
      next(error);
    }
  },

  create: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!isValidCardUserData(req.body)) throw new CustomError({ message: 'Invalid card', statusCode: 400 });
      const card = cardService.create(req.body);
      res.status(201).json(card);
    } catch (error) {
      next(error);
    }
  },

  answer: (req: Request, res: Response, next: NextFunction) => {
    try {
      if (!req.params.id) throw new CustomError({ message: 'Missing card id', statusCode: 400 });
      const cardId = req.params.id;
      const currentCard = cardService.getById(cardId);
      if (!currentCard) return res.status(404).send();
      if (!req.body.isValid === undefined) throw new CustomError({ message: 'Missing validity', statusCode: 400 });
      if (typeof req.body.isValid !== 'boolean') throw new CustomError({ message: 'Invalid validity', statusCode: 400 });
      if (currentCard.category === 'DONE') throw new CustomError({ message: 'Card already learned', statusCode: 400 });
      if (!req.body.isValid) return res.sendStatus(204);
      if (req.body.isValid) {
        cardService.updateCategory(cardId);
        return res.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  },
};
