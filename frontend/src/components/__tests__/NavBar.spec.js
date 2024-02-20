import { describe, it, expect, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import NavBar from '../NavBar.vue';
import { createTestRouter } from '@/utils/tests-utils';

const TEST_USER_NAME = 'John';
const HOME_LINK = '/';
const MY_CARDS_LINK = '/my-cards';
const PROFILE_LINK = '/#';
const LOGIN_LINK = '/login';

let router;
const createWrapperOptions = (isLogged, userName = TEST_USER_NAME) => ({
  props: {
    userName,
    isLogged,
  },
  global: {
    plugins: [ router ],
  },
});

beforeAll(() => {
  router = createTestRouter();
});

describe('NavBar', () => {
  describe('when the user is logged in', () => {
    it('renders the user\'s profile name', async () => {
      const wrapper = mount(NavBar, createWrapperOptions(true));

      await router.isReady();

      expect(wrapper.text()).toContain(`${TEST_USER_NAME}'s profile`);
    });

    it('renders the correct links', async () => {
      const wrapper = mount(NavBar, createWrapperOptions(true));

      await router.isReady();

      expect(wrapper.get('#home-link').attributes('href')).toBe(HOME_LINK);
      expect(wrapper.get('#my-cards-link').attributes('href')).toBe(MY_CARDS_LINK);
      expect(wrapper.get('#profile-link').attributes('href')).toBe(PROFILE_LINK);
    });
  });

  describe('when the user is not logged in', () => {
    it('renders the login text', async () => {
      const wrapper = mount(NavBar, createWrapperOptions(false));

      await router.isReady();

      expect(wrapper.text()).toContain('Login');
    });

    it('renders the correct links', async () => {
      const wrapper = mount(NavBar, createWrapperOptions(false));

      await router.isReady();

      expect(wrapper.get('#home-link').attributes('href')).toBe(HOME_LINK);
      expect(wrapper.find('#my-cards-link').exists()).toBe(false);
      expect(wrapper.get('#login-link').attributes('href')).toBe(LOGIN_LINK);
    });
  });
});
