/**
 * router/index.ts
 *
 * Manual route configuration
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { components } from 'vuetify/dist/vuetify-labs.js'
import { useAuth } from '@/stores/auth.js'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/pages/LoginPage.vue'),
  },
  {
    path: '/processo',
    name: 'processos',
    component: () => import('@/pages/ProcessosPage.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/perfil',
    name: 'perfl',
    component: () => import('@/pages/PerfilPage.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/Tribunal',
    name: 'tribunal',
    component: () => import('@/pages/TribunalPage.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/seccao',
    name: 'seccao',
    component: () => import('@/pages/SeccaoPage.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/add-processo',
    name: 'add-processo',
    component: () => import('@/pages/AddProcesso.vue')
  },
  {
    path: '/utilizador',
    name: 'utilizador',
    component: () => import('@/pages/UtilizadorPage.vue'),
    meta: {
      auth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFound.vue'),
  }

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

router.beforeEach( async(to, from, next) =>{
  if(to.meta?.auth){
    const auth = useAuth();
    if(auth.token && auth.user){
      const isAuthenticated = await auth.checkToken();
      console.log(isAuthenticated);
      if(isAuthenticated){
        next();
      }else{
        next({name: 'login'});
      }
    }else{
      next({name: 'login'});
    }
  }else{
    next();
  }
})


export default router
