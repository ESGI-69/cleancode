import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MyCardsView from '@/views/MyCardsView.vue';
import CardDetails from '@/components/CardDetails.vue';
import { useCardStore } from '@/stores/cardStore';
import { nextTick } from 'vue';
import { MOCK_CARDS } from '@/__mocks__/mockData';
import { useLearningStore } from '@/stores/learningStore';

vi.mock('@/stores/cardStore');
vi.mock('@/stores/learningStore');

describe('MyCardsView.vue', () => {
  it('displays loading state when cards are being fetched', async () => {
    useCardStore.mockReturnValue({
      isCardsLoading: true,
      cards: [],
      fetchCards: vi.fn(),
    });

    useLearningStore.mockReturnValue({
      isPacthAnswerLoading: false,
      patchAnswer: vi.fn(),
      fetchQuizz: vi.fn(),
    });

    const wrapper = mount(MyCardsView);

    expect(wrapper.text()).toContain('Loading...');
  });

  it('calls fetchCards with entered tags when "Search by tag" button is clicked', async () => {
    const fetchCardsMock = vi.fn();
    useCardStore.mockReturnValue({
      isCardsLoading: false,
      cards: [],
      fetchCards: fetchCardsMock,
    });

    const wrapper = mount(MyCardsView);

    const tags = [ 'test', 'caca' ];

    for (let i = 1; i < tags.length; i++) {
      await wrapper.find('#add-tag-button').trigger('click');
    }

    tags.forEach((tag, index) => {
      wrapper.find(`#tag-input-${index}`).setValue(tag);
    });

    await wrapper.find('#search-by-tag').trigger('click');

    expect(fetchCardsMock).toHaveBeenCalledWith(tags);
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
        answer: '',
        id: card.id,
        quizzMode: false,
      });
    });
  });
});
