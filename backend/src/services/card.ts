import { v4 as uuidv4 } from 'uuid';

export enum CATEGORY {
  FIRST = 'FIRST',
  SECOND = 'SECOND',
  THIRD = 'THIRD',
  FOURTH = 'FOURTH',
  FIFTH = 'FIFTH',
  SIXTH = 'SIXTH',
  SEVENTH = 'SEVENTH',
  DONE = 'DONE',
}

export interface CardUserData {
  question: string;
  awnser: string;
  tag: string;
}

export interface Card extends CardUserData {
  id: string;
  category: CATEGORY;
}

const cards: Card[] = [];

export default {
  getAll: function(): Card[] {
    return cards;
  },

  getAllByTags: function(tags?: string[]): Card[] {
    if (!tags) return cards;
    return cards.filter((card) => tags.includes(card.tag));
  },

  create: function(card: CardUserData): Card {
    const createdCard = {
      ...card,
      category: CATEGORY.FIRST,
      id: uuidv4(),
    };
    cards.push(createdCard);
    return createdCard;
  },
};
