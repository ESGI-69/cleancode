import { describe, it, expect, beforeEach } from 'vitest';
import { createRouter, createMemoryHistory } from 'vue-router';
import { mount } from '@vue/test-utils';
import NavBar from '../NavBar.vue';

let router;

beforeEach(() => {
  router = createRouter({
    history: createMemoryHistory(),
    routes: [],
  });
});

describe('NavBar', () => {
  it('renders profile text when logged in', async () => {
    const wrapper = mount(NavBar, {
      props: {
        userName: 'John',
        isLogged: true,
      },
      global: {
        plugins: [ router ],
      },
    });

    await router.isReady();

    expect(wrapper.text()).toContain('John\'s profile');
  });

  it('renders login text when not logged in', async () => {
    const wrapper = mount(NavBar, {
      props: {
        userName: '',
        isLogged: false,
      },
      global: {
        plugins: [ router ],
      },
    });

    await router.isReady();

    expect(wrapper.text()).toContain('Login');
  });

  it('renders correct links when logged in', async () => {
    const wrapper = mount(NavBar, {
      props: {
        userName: 'John',
        isLogged: true,
      },
      global: {
        plugins: [ router ],
      },
    });

    await router.isReady();

    const links = wrapper.findAll('a');
    expect(links[0].attributes('href')).toBe('/');
    expect(links[1].attributes('href')).toBe('/about');
    expect(links[2].attributes('href')).toBe('/#');
  });

  it('renders correct links when not logged in', async () => {
    const wrapper = mount(NavBar, {
      props: {
        userName: '',
        isLogged: false,
      },
      global: {
        plugins: [ router ],
      },
    });

    await router.isReady();

    const links = wrapper.findAll('a');
    expect(links[0].attributes('href')).toBe('/');
    expect(links[1].attributes('href')).toBe('/about');
    expect(links[2].attributes('href')).toBe('/#');
  });
});
