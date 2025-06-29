import { createWebHistory, createRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
const routes = [
  { path: '/',
    name: 'login',
    component: () => import('../components/Auth/Signin.vue'),
    meta: { title: 'Signin', requiresAuth: false } 
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../components/layout/Dashboard.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/processos',
    name: 'processos',
    component: () => import('../components/pages/Processos.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/documentos',
    name: 'documentos',
    component: () => import('../components/pages/Documentos.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/tribunais',
    name: 'tribunais',
    component: () => import('../components/pages/Tribunais.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/logs',
    name: 'logs',
    component: () => import('../components/pages/Logs.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/seccoes',
    name: 'seccoes',
    component: () => import('../components/pages/Seccoes.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/utilizadores',
    name: 'utilizadores',
    component: () => import('../components/pages/Utilizadores.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/papeis',
    name: 'papeis',
    component: () => import('../components/pages/Papeis.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/permissoes',
    name: 'permissoes',
    component: () => import('../components/pages/Permissoes.vue'),
    meta: { requiresAuth: true }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    // Se a rota requer autenticação e o usuário não está autenticado
    next('/')
  } else if (to.name === '/' && authStore.isAuthenticated) {
    // Se o usuário está autenticado e tenta acessar a página de login
    next('/dashboard')
  } else {
    // Verifica se o token precisa ser renovado
    if (authStore.isAuthenticated) {
      try {
        // Você pode adicionar uma verificação de token expirado aqui
        // e chamar authStore.refreshAccessToken() se necessário
      } catch (error) {
        authStore.signOut()
        next('/')
        return
      }
    }
    next()
  }
}),
router.beforeEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Seccao` : 'Secção'
})

export default router