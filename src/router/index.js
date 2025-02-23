import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/perfil',
      name: 'perfil',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/tribunal',
      name: 'tribunal',
      component: () => import('../views/TribunailView.vue'),
    },
    {
      path: '/seccoes',
      name: 'seccoes',
      component: () => import('../views/SeccoesView.vue'),
    },
    {
      path: '/processo',
      name: 'processo',
      component: () => import('../views/ProcessoView.vue'),
    },
    {
      path: '/utilizador',
      name: 'utilizador',
      component: () => import('../views/UtilizadorView.vue'),
    },
    {
      path: '/papel',
      name: 'papel',
      component: () => import('../views/PapelView.vue'),
    },
  ],
})

export default router
