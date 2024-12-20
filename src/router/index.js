import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/docs',
      name: 'docs',
      beforeEnter(to, from, next) {
        if (typeof window !== 'undefined') {
          console.log('Redirecting to /docs/');
          window.location.href = '/docs/';
        } else {
          next();
        }
      }
    }
  ],
})

export default router
