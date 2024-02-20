import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MyCardsView from '@/views/MyCardsView.vue';
import CardDetails from '@/components/CardDetails.vue';
import { useCardStore } from '@/stores/cardStore';
import { nextTick } from 'vue';
import { MOCK_CARDS } from '@/__mocks__/mockData';

vi.mock('@/stores/cardStore');

describe('MyCardsView.vue', () => {
  it('displays loading state when cards are being fetched', async () => {
    useCardStore.mockReturnValue({
      isCardsLoading: true,
      cards: [],
      fetchCards: vi.fn(),
    });

    const wrapper = mount(MyCardsView);

    expect(wrapper.text()).toContain('Loading...');
  });

  it('displays CardDetails components for each card when cards are available', async () => {

    useCardStore.mockReturnValue({
      isCardsLoading: false,
      cards: MOCK_CARDS,
      fetchCards: vi.fn(),
    });

    const wrapper = mount(MyCardsView);

    await nextTick();

    const cardDetailsWrappers = wrapper.findAllComponents(CardDetails);
    expect(cardDetailsWrappers.length).toBe(MOCK_CARDS.length);

    cardDetailsWrappers.forEach((cardDetailsWrapper, index) => {
      const card = MOCK_CARDS[index];
      expect(cardDetailsWrapper.props()).toEqual({
        question: card.question,
        category: card.category,
        tag: card.tag,
      });
    });
  });
});
