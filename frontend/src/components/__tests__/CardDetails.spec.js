import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CardDetails from '@/components/CardDetails.vue';
import { useLearningStore } from '@/stores/learningStore';
import { createPinia } from 'pinia';

vi.mock('@/stores/learningStore');

let learningStore;

function wrapperSetup(isPacthAnswerLoading) {
  learningStore = {
    isPacthAnswerLoading,
    patchAnswer: vi.fn(),
    fetchQuizz: vi.fn(),
  };
  useLearningStore.mockReturnValue(learningStore);

  const pinia = createPinia();
  pinia.use(learningStore);

  const wrapper = mount(CardDetails, {
    global: {
      plugins: [ pinia ],
    },
    props: {
      id: 'test-id',
      question: 'Test question',
      category: 'Test category',
      tag: 'Test tag',
      answer: 'Test answer',
      quizzMode: true,
    },
  });

  return { wrapper, learningStore };
}

describe('CardDetails.vue', () => {
  describe('when patchAnswer is not loading', () => {
    let wrapper;

    beforeEach(() => {
      ({ wrapper, learningStore } = wrapperSetup(false));
    });

    it('renders question, category, and tag props correctly', () => {
      const question = 'Test question';
      const category = 'Test category';
      const tag = 'Test tag';

      expect(wrapper.text()).toContain(question);
      expect(wrapper.text()).toContain(`Category: ${category}`);
      expect(wrapper.text()).toContain(tag);
    });

  });
  describe('when quizzMode is true', () => {
    let wrapper;

    beforeEach(() => {
      ({ wrapper, learningStore } = wrapperSetup(false, true));
    });

    it('shows the answer when the "Submit Answer" button is clicked', async () => {
      await wrapper.find('button').trigger('click');

      expect(wrapper.text()).toContain('The answer is : Test answer');
    });

    it('calls patchAnswer and fetchQuizz when the "I\'m right" button is clicked', async () => {
      await wrapper.find('button').trigger('click');
      await wrapper.find('.card__quizz__submit button').trigger('click');

      expect(learningStore.patchAnswer).toHaveBeenCalledWith('test-id', { isValid: true });
      expect(learningStore.fetchQuizz).toHaveBeenCalled();
    });

    it('calls patchAnswer and fetchQuizz when the "I\'m wrong" button is clicked', async () => {
      await wrapper.find('button').trigger('click');
      await wrapper.findAll('.card__quizz__submit button')[1].trigger('click');

      expect(learningStore.patchAnswer).toHaveBeenCalledWith('test-id', { isValid: false });
      expect(learningStore.fetchQuizz).toHaveBeenCalled();
    });

    it('hides the answer after the answer is submitted', async () => {
      await wrapper.find('button').trigger('click');
      await wrapper.find('.card__quizz__submit button').trigger('click');

      expect(wrapper.text()).not.toContain('The answer is : Test answer');
    });
  });
});
