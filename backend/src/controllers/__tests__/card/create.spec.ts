import http from 'http';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { CATEGORY, CardWithDate, cards } from '../../../services/card';

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

describe('Create card', () => {
  describe('given a valid card', () => {
    test('should return the created card', () => request(server)
      .post('/cards/')
      .send({
        question: 'Question',
        answer: 'Answer',
        tag: 'Tag',
      })
      .expect(201)
      .then((response) => {
        const card = response.body as CardWithDate;
        expect(card).toHaveProperty('id');
        expect(card.id).toHaveLength(36);
        expect(card).toHaveProperty('question');
        expect(card.question).toBe('Question');
        expect(card).toHaveProperty('answer');
        expect(card.answer).toBe('Answer');
        expect(card).toHaveProperty('tag');
        expect(card.tag).toBe('Tag');
        expect(card).toHaveProperty('category');
        expect(card.category).toBe(CATEGORY.FIRST);
        expect(card).not.toHaveProperty('createdAt');
      }));
  });

  describe('given an invalid card', () => {
    test('should return an error is key is missing', () => request(server)
      .post('/cards/')
      .send({
        question: 'Question',
        tag: 'Tag',
      })
      .expect(400));
    test('should return an error is key at the wrong type', () => request(server)
      .post('/cards/')
      .send({
        question: 'Question',
        answer: 'Answer',
        tag: 666,
      })
      .expect(400));
  });
});

afterAll((done) => {
  server.close();
  done();
});
