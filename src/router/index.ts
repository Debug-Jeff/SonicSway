import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/history',
      name: 'history',
      component: () => import('../views/MoodHistory.vue')
    }
  ]
})

export default router