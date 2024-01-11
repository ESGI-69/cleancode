import http from 'http';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { CATEGORY, cards } from '../../../services/card';

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
    });
    cards.push({
      id: '77dc8805-e48d-41cb-9b3c-778a2177e55a',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.FIRST,
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
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(36);
        expect(response.body).toHaveProperty('question');
        expect(response.body.question).toBe('Question');
        expect(response.body).toHaveProperty('answer');
        expect(response.body.answer).toBe('Answer');
        expect(response.body).toHaveProperty('tag');
        expect(response.body.tag).toBe('Tag');
        expect(response.body).toHaveProperty('category');
        expect(response.body.category).toBe(CATEGORY.FIRST);
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
