/* eslint-disable @typescript-eslint/no-explicit-any */
import QueryString from 'qs';
import { CardUserData } from '../services/card';

export function isValidTagList(tags: string | QueryString.ParsedQs | string[] | QueryString.ParsedQs[]): tags is string[] {
  if (!(tags instanceof Array)) return false;
  return tags.every((tag) => typeof tag === 'string');
}

export function isValidCardUserData(card: any): card is CardUserData {
  return typeof card.question === 'string'
    && typeof card.answer === 'string'
    && typeof card.tag === 'string';
}
