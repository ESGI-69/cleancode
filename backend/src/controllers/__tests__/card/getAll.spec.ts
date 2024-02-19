import http from 'http';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { CATEGORY, Card, CardWithDate, cards } from '../../../services/card';

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
    done();
  });
});

describe('Retrive cards', () => {
  test('should return all cards if not tag is provided', () => request(server)
    .get('/cards/')
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveLength(2);
      expect(response.body.map((card: Card) => card.id)).toContain('a357aacf-0638-4691-aeac-3ef83198d874');
      expect(response.body.map((card: Card) => card.id)).toContain('77dc8805-e48d-41cb-9b3c-778a2177e55a');
      // createdAt is not present in the response
      expect(response.body.map((card: CardWithDate) => card.createdAt)).toContain(undefined);
    }));

  test('should return all cards with the provided tag', () => request(server)
    .get('/cards/?tags=Tag1')
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveLength(1);
      expect(response.body.map((card: Card) => card.id)).toContain('a357aacf-0638-4691-aeac-3ef83198d874');
      expect(response.body.map((card: CardWithDate) => card.createdAt)).toContain(undefined);
    }));

  test('should return all cards with the provided tags', () => request(server)
    .get('/cards/?tags=Tag1&tags=Tag2')
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveLength(2);
      expect(response.body.map((card: Card) => card.id)).toContain('a357aacf-0638-4691-aeac-3ef83198d874');
      expect(response.body.map((card: Card) => card.id)).toContain('77dc8805-e48d-41cb-9b3c-778a2177e55a');
      expect(response.body.map((card: CardWithDate) => card.createdAt)).toContain(undefined);
    }));
});

afterAll((done) => {
  server.close();
  done();
});
