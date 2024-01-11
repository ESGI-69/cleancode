import http from 'http';
import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import request from 'supertest';

import { app } from '../../../express';

let server: http.Server;

beforeAll((done) => {
  server = app.listen(4180, () => {
    done();
  });
});

describe('Retrive cards', () => {
  describe('given no tags is provided', () => {
    test('should return all cards', () => request(server)
      .get('/cards/')
      .expect(200)
      .then((response) => {
        expect(response.body).toHaveLength(0);
      }));
  });

  describe('given tags is provided', () => {
    describe('given tags is a string', () => {
      test('should return all cards with the provided tag', () => request(server)
        .get('/cards/?tags=tag')
        .expect(200)
        .then((response) => {
          expect(response.body).toHaveLength(0);
        }));
    });

    describe('given tags is an array', () => {
      test('should return all cards with the provided tags', () => request(server)
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
        expect(response.body).toHaveProperty('question');
        expect(response.body).toHaveProperty('answer');
        expect(response.body).toHaveProperty('tag');
        expect(response.body).toHaveProperty('category');
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
