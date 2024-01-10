import { describe, expect, test } from '@jest/globals';
import request from 'supertest';

import { app } from '../../../index';

describe('Retrive cards', () => {
  describe('given no tags is provided', () => {
    test('should return all cards', () => request(app)
      .get('/cards/')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(0);
      }));
  });

  describe('given tags is provided', () => {
    describe('given tags is a string', () => {
      test('should return all cards with the provided tag', () => request(app)
        .get('/cards/?tags=tag')
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(0);
        }));
    });

    describe('given tags is an array', () => {
      test('should return all cards with the provided tags', () => request(app)
        .get('/cards/?tags=tag1&tags=tag2')
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(0);
        }));
    });
  });
});

describe('Create card', () => {
  describe('given a valid card', () => {
    test('should return the created card', () => request(app)
      .post('/cards/')
      .send({
        question: 'Question',
        answer: 'Answer',
        tag: 'Tag',
      })
      .expect(201)
      .then((response) => {
        expect(response.body).toHaveProperty('id');
        expect(response.body).toHaveProperty('question');
        expect(response.body).toHaveProperty('answer');
        expect(response.body).toHaveProperty('tag');
        expect(response.body).toHaveProperty('category');
      }));
  });

  describe('given an invalid card', () => {
    test('should return an error', () => request(app)
      .post('/cards/')
      .send({
        question: 'Question',
        tag: 'Tag',
      })
      .expect(400));
  });
});

