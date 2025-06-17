import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/',
    name: 'login',
    component: () => import('../components/Auth/Signin.vue'),
    meta: { title: 'Signin' } 
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/layout/Dashboard.vue')
  },
  {
    path: '/processos',
    name: 'processos',
    component: () => import('../components/pages/Processos.vue')
  },
  {
    path: '/documentos',
    name: 'documentos',
    component: () => import('../components/pages/Documentos.vue')
  },
  {
    path: '/papeis',
    name: 'papeis',
    component: () => import('../components/pages/Papeis.vue')
  },
  {
    path: '/permissoes',
    name: 'permissoes',
    component: () => import('../components/pages/Permissoes.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Seccao` : 'Secção'
})

export default router