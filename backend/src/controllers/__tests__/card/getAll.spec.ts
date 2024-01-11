import http from 'http';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';
import { CATEGORY, Card, cards } from '../../../services/card';

import { app } from '../../../express';

let server: http.Server;

beforeAll((done) => {
  server = app.listen(4180, () => {
    cards.push({
      id: 'id1',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag1',
      category: CATEGORY.FIRST,
    });
    cards.push({
      id: 'id2',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.FIRST,
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
      expect(response.body.map((card: Card) => card.id)).toContain('id1');
      expect(response.body.map((card: Card) => card.id)).toContain('id2');
    }));

  test('should return all cards with the provided tag', () => request(server)
    .get('/cards/?tags=Tag1')
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveLength(1);
      expect(response.body.map((card: Card) => card.id)).toContain('id1');
    }));

  test('should return all cards with the provided tags', () => request(server)
    .get('/cards/?tags=Tag1&tags=Tag2')
    .expect(200)
    .then((response) => {
      expect(response.body).toHaveLength(2);
      expect(response.body.map((card: Card) => card.id)).toContain('id1');
      expect(response.body.map((card: Card) => card.id)).toContain('id2');
    }));
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
