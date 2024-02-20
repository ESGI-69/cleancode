import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import MyCardsViewVue from '@/views/MyCardsView.vue';
import LoginView from '@/views/LoginView.vue';
import QuizzViewVue from '@/views/QuizzView.vue';

const isLoggedIn = true;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/my-cards',
      name: 'my-cards',
      component: MyCardsViewVue,
      beforeEnter: (to, from, next) => {
        if (!isLoggedIn) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
    },
    {
      path: '/quizz',
      name: 'quizz',
      component: QuizzViewVue,
      beforeEnter: (to, from, next) => {
        if (!isLoggedIn) {
          next({ name: 'login' });
        } else {
          next();
        }
      },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
  ],
});

export default router;
