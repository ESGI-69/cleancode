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
      id: '1',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag1',
      category: CATEGORY.FIRST,
      createdAt: new Date(),
    });
    cards.push({
      id: '2',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.FIRST,
      createdAt: new Date(),
    });
    cards.push({
      id: '3',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.SECOND,
      createdAt: new Date(),
    });
    cards.push({
      id: '4',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.THIRD,
      createdAt: new Date(),
    });

    cards.push({
      id: '5',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.FOURTH,
      createdAt: new Date(),
    });
    cards.push({
      id: '6',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.FIFTH,
      createdAt: new Date(),
    });
    cards.push({
      id: '7',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.SIXTH,
      createdAt: new Date(),
    });
    cards.push({
      id: '8',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.SEVENTH,
      createdAt: new Date(),
    });
    cards.push({
      id: '9',
      question: 'Question',
      answer: 'Answer',
      tag: 'Tag2',
      category: CATEGORY.DONE,
      createdAt: new Date(),
    });
    done();
  });
});

describe('Given the date is day 0', () => {
  test('should only return cards from the first category', () => request(server)
    .get('/cards/quizz')
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(8);
      body.forEach((card: Card) => {
        expect(card.category).not.toBe(CATEGORY.DONE);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 1', () => {
  test('should only return cards from the first and second category', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(2);
      body.forEach((card: Card) => {
        expect(card.category).toBe(CATEGORY.FIRST);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 2', () => {
  test('should only return cards from the first and second categories', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(3);
      body.forEach((card: Card) => {
        expect([
          CATEGORY.FIRST,
          CATEGORY.SECOND,
        ]).toContain(card.category);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      expect(ids).toContain('3');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 3', () => {
  test('should only return cards from the first category', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 3).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(2);
      body.forEach((card: Card) => {
        expect(card.category).toBe(CATEGORY.FIRST);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 4', () => {
  test('should only return cards from the first, second and third categories', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 4).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(4);
      body.forEach((card: Card) => {
        expect([
          CATEGORY.FIRST,
          CATEGORY.SECOND,
          CATEGORY.THIRD,
        ]).toContain(card.category);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      expect(ids).toContain('3');
      expect(ids).toContain('4');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 5', () => {
  test('should only return cards from the first category', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(2);
      body.forEach((card: Card) => {
        expect(card.category).toBe(CATEGORY.FIRST);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 6', () => {
  test('should only return cards from the first and second categories', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 6).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(3);
      body.forEach((card: Card) => {
        expect([CATEGORY.FIRST, CATEGORY.SECOND]).toContain(card.category);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      expect(ids).toContain('3');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 7', () => {
  test('should only return cards from the first category', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(2);
      body.forEach((card: Card) => {
        expect(card.category).toBe(CATEGORY.FIRST);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 8', () => {
  test('should only return cards from the first, second, third and fourth categories', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 8).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(5);
      body.forEach((card: Card) => {
        expect([
          CATEGORY.FIRST,
          CATEGORY.SECOND,
          CATEGORY.THIRD,
          CATEGORY.FOURTH,
        ]).toContain(card.category);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      expect(ids).toContain('3');
      expect(ids).toContain('4');
      expect(ids).toContain('5');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 16', () => {
  test('should only return cards from the first, second, third, fourth, fifth, sixth and seventh categories', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 16).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(6);
      body.forEach((card: Card) => {
        expect([
          CATEGORY.FIRST,
          CATEGORY.SECOND,
          CATEGORY.THIRD,
          CATEGORY.FOURTH,
          CATEGORY.FIFTH,
          CATEGORY.SIXTH,
          CATEGORY.SEVENTH,
        ]).toContain(card.category);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      expect(ids).toContain('3');
      expect(ids).toContain('4');
      expect(ids).toContain('5');
      expect(ids).toContain('6');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 32', () => {
  test('should only return cards from the first, second, third, fourth, fifth, sixth and seventh categories', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 32).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(7);
      body.forEach((card: Card) => {
        expect([
          CATEGORY.FIRST,
          CATEGORY.SECOND,
          CATEGORY.THIRD,
          CATEGORY.FOURTH,
          CATEGORY.FIFTH,
          CATEGORY.SIXTH,
          CATEGORY.SEVENTH,
        ]).toContain(card.category);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      expect(ids).toContain('3');
      expect(ids).toContain('4');
      expect(ids).toContain('5');
      expect(ids).toContain('6');
      expect(ids).toContain('7');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

describe('Given the date is day 64', () => {
  test('should only return cards from the first, second, third, fourth, fifth, sixth and seventh categories', () => request(server)
    .get(`/cards/quizz?date=${new Date(Date.now() + 1000 * 60 * 60 * 24 * 64).toISOString()}`)
    .expect(200)
    .then(({ body }) => {
      expect(body.length).toBe(8);
      body.forEach((card: Card) => {
        expect([
          CATEGORY.FIRST,
          CATEGORY.SECOND,
          CATEGORY.THIRD,
          CATEGORY.FOURTH,
          CATEGORY.FIFTH,
          CATEGORY.SIXTH,
          CATEGORY.SEVENTH,
        ]).toContain(card.category);
      });
      const ids = body.map((card: Card) => card.id);
      expect(ids).toContain('1');
      expect(ids).toContain('2');
      expect(ids).toContain('3');
      expect(ids).toContain('4');
      expect(ids).toContain('5');
      expect(ids).toContain('6');
      expect(ids).toContain('7');
      expect(ids).toContain('8');
      body.forEach((card: CardWithDate) => {
        expect(card.createdAt).toBeUndefined();
      });
    }));
});

afterAll((done) => {
  server.close();
  done();
});
