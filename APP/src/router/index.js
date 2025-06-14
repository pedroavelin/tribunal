import { createWebHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/',
    name: 'login',
    component: () => import('../components/Auth/Signin.vue'),
    meta: { title: 'Signin' } 
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