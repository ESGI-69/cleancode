import http from 'http';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { CATEGORY, Card, cards } from '../../../services/card';

import { app } from '../../../express';

let server: http.Server;

const port = Math.floor(Math.random() * 1000) + 3000;

beforeAll((done) => {
  server = app.listen(port, () => {
    cards.push({
      id: 'a357aacf-0638-4691-aeac-3ef83198d874',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag1',
      category: CATEGORY.FIRST,
      createdAt: new Date(),
    });
    cards.push({
      id: '77dc8805-e48d-41cb-9b3c-778a2177e55a',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.FIRST,
      createdAt: new Date(),
    });
    cards.push({
      id: '66b20919-636c-419c-b0ba-9c47f6db0a4a',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.DONE,
      createdAt: new Date(),
    });
    done();
  });
});

describe('Answer card', () => {
  test('should return 204 if the card is not learned', () => request(server)
    .patch('/cards/a357aacf-0638-4691-aeac-3ef83198d874/answer')
    .send({
      isValid: false,
    })
    .expect(204)
    .then((response) => {
      expect(response.body).toEqual({});
      expect(cards.find((card: Card) => card.id === 'a357aacf-0638-4691-aeac-3ef83198d874')?.category).toBe(CATEGORY.FIRST);
    }));

  test('should return 204 if the card is learned', () => request(server)
    .patch('/cards/a357aacf-0638-4691-aeac-3ef83198d874/answer')
    .send({
      isValid: true,
    })
    .expect(204)
    .then((response) => {
      expect(response.body).toEqual({});
      expect(cards.find((card: Card) => card.id === 'a357aacf-0638-4691-aeac-3ef83198d874')?.category).toBe(CATEGORY.SECOND);
    }));

  test('should return 404 if the card id is not valid', () => request(server)
    .patch('/cards/id42/answer')
    .send({
      isValid: false,
    })
    .expect(404));

  test('should return 400 if the card is already answered', () => request(server)
    .patch('/cards/66b20919-636c-419c-b0ba-9c47f6db0a4a/answer')
    .send({
      isValid: false,
    })
    .expect(400));

  test('should return 400 if the validity is not provided', () => request(server)
    .patch('/cards/a357aacf-0638-4691-aeac-3ef83198d874/answer')
    .expect(400));

  test('should return 400 if the validity is not a boolean', () => request(server)
    .patch('/cards/a357aacf-0638-4691-aeac-3ef83198d874/answer')
    .send({
      isValid: 'false',
    })
    .expect(400));
});

afterAll((done) => {
  server.close();
  done();
});
