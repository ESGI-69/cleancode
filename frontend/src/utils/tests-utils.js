import { createRouter, createMemoryHistory } from 'vue-router';

export function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: { template: '<div>Home</div>' },
      },
      {
        path: '/about',
        name: 'about',
        component: { template: '<div>About</div>' },
      },
    ],
  });
}
