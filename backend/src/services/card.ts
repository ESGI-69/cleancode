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
  answer: string;
  tag: string;
}

export interface Card extends CardUserData {
  id: string;
  category: CATEGORY;
}

export const cards: Card[] = [];

export default {
  getById: function(id: string): Card | undefined {
    return cards.find((card) => card.id === id);
  },

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

  updateCategory: function(id: string): void {
    const cardIndex = cards.findIndex((card) => card.id === id);
    if (cardIndex === -1) throw new Error('Card not found');
    const card = cards[cardIndex];
    if (card.category === CATEGORY.DONE) throw new Error('Card already DONE');
    const nextCategory = Object.values(CATEGORY)[Object.values(CATEGORY).indexOf(card.category) + 1];
    cards[cardIndex].category = nextCategory;
  },
};
