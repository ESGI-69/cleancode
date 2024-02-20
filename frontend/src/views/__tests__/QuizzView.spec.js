import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { useLearningStore } from '@/stores/learningStore';
import QuizzView from '@/views/QuizzView.vue';
import CardDetails from '@/components/CardDetails.vue';

vi.mock('@/stores/learningStore');

const MOCK_QUIZZ = [
  { id: 1, question: 'Question 1', category: 'Category 1', tag: 'Tag 1', answer: 'Answer 1' },
  // Add more mock quizz data as needed
];

describe('QuizzView.vue', () => {
  it('displays loading state when quizz is being fetched', () => {
    useLearningStore.mockReturnValue({
      isQuizzLoading: true,
      quizz: [],
      fetchQuizz: vi.fn(),
    });

    const wrapper = mount(QuizzView);

    expect(wrapper.text()).toContain('Loading...');
  });

  it('displays CardDetails components for each quizz when quizz is available', async () => {
    useLearningStore.mockReturnValue({
      isQuizzLoading: false,
      quizz: MOCK_QUIZZ,
      fetchQuizz: vi.fn(),
    });

    const wrapper = mount(QuizzView);

    await nextTick();

    const cardDetailsWrappers = wrapper.findAllComponents(CardDetails);
    expect(cardDetailsWrappers.length).toBe(MOCK_QUIZZ.length);

    cardDetailsWrappers.forEach((cardDetailsWrapper, index) => {
      const quizz = MOCK_QUIZZ[index];
      expect(cardDetailsWrapper.props()).toEqual({
        id: quizz.id,
        question: quizz.question,
        category: quizz.category,
        tag: quizz.tag,
        answer: quizz.answer,
        quizzMode: true,
      });
    });
  });
});
