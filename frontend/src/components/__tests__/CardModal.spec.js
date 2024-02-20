
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import CardModal from '@/components/CardModal.vue';
import { useCardStore } from '@/stores/cardStore';
import { nextTick } from 'vue';

vi.mock('@/stores/cardStore');

const TEST_QUESTION = 'Test Question';
const TEST_ANSWER = 'Test Answer';
const TEST_TAG = 'Test Tag';

let cardStore;

function wrapperSetup(isPostCardLoading) {
  cardStore = {
    isPostCardLoading,
    postCard: vi.fn(),
  };
  useCardStore.mockReturnValue(cardStore);
  const wrapper = mount(CardModal);
  wrapper.vm.isModalOpen = true;
  return { wrapper, cardStore };
}

describe('CardModal.vue', () => {
  describe('when postCard is not loading', () => {
    let wrapper;

    beforeEach(() => {
      ({ wrapper, cardStore } = wrapperSetup(false));
    });

    it('renders the modal when isModalOpen is true', () => {
      expect(wrapper.find('.modal').exists()).toBe(true);
      const form = wrapper.find('#cardForm');
      expect(form.exists()).toBe(true);
    });

    it('closes the modal when the close button is clicked', async () => {
      await wrapper.find('#closeModal').trigger('click');
      expect(wrapper.vm.isModalOpen).toBe(false);
    });

    it('calls postCard when the form is submitted', async () => {
      const card = { question: TEST_QUESTION, answer: TEST_ANSWER, tag: TEST_TAG };

      await wrapper.find('#cardQuestion').setValue(card.question);
      await wrapper.find('#cardAnswer').setValue(card.answer);
      await wrapper.find('#cardTag').setValue(card.tag);

      await wrapper.find('form').trigger('submit.prevent');

      expect(cardStore.postCard).toHaveBeenCalledWith(card);
    });

    it('toggles the modal state when changeModalState is called', async () => {
      expect(wrapper.vm.isModalOpen).toBe(true);
      wrapper.vm.changeModalState();
      await nextTick();
      expect(wrapper.vm.isModalOpen).toBe(false);
      wrapper.vm.changeModalState();
      await nextTick();
      expect(wrapper.vm.isModalOpen).toBe(true);
    });

    it('does not render the modal when isModalOpen is false', async () => {
      wrapper.vm.isModalOpen = false;
      await nextTick();
      expect(wrapper.find('.modal').exists()).toBe(false);
    });
  });

  describe('when postCard is loading', () => {
    let wrapper;

    beforeEach(() => {
      ({ wrapper, cardStore } = wrapperSetup(true));
    });

    it('disables submit button when isPostCardLoading is true', async () => {
      expect(wrapper.find('button[type="submit"]').element.disabled).toBe(true);
    });

    it('shows loading text when isPostCardLoading is true', async () => {
      expect(wrapper.text()).toContain('Loading...');
    });
  });
});
