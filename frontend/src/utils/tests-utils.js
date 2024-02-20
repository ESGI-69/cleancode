import { createRouter, createMemoryHistory } from 'vue-router';

export function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: '/',
        name: 'home',
        component: { template: '<h1>Home</h1>' },
      },
      {
        path: '/my-cards',
        name: 'my-cards',
        component: { template: '<h1>My Cards</h1>' },
      },
      {
        path: '/login',
        name: 'login',
        component: { template: '<h1>Login</h1>' },
      },
    ],
  });
}
