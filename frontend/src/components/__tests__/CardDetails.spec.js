import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CardDetails from '@/components/CardDetails.vue';

describe('CardDetails.vue', () => {
  it('renders question, category, and tag props correctly', () => {
    const question = 'Test question';
    const category = 'Test category';
    const tag = 'Test tag';
    const wrapper = mount(CardDetails, {
      props: { question, category, tag },
    });

    expect(wrapper.text()).toContain(question);
    expect(wrapper.text()).toContain(`Category: ${category}`);
    expect(wrapper.text()).toContain(tag);
  });
});
