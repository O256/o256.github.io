import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DrawView from '../views/DrawView.vue'
import BallView from '../views/BallView.vue'
import EarthView from '../views/EarthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/draw',
      name: 'draw',
      component: DrawView
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
    },
    {
      path: '/ball',
      name: 'ball',
      component: BallView
    },
    {
      path: '/earth',
      name: 'earth',
      component: EarthView
    }
  ],
})

export default router
