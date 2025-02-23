/**
 * router/index.ts
 *
 * Manual route configuration
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { components } from 'vuetify/dist/vuetify-labs.js'
import ProcessosPage from '@/pages/ProcessosPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import PerfilPage from '@/pages/PerfilPage.vue'
import Seccoes from '@/pages/Seccoes.vue'
import { useAuth } from '@/stores/auth.js'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage,
  },
  {
    path: '/Processo',
    name: 'processos',
    component: ProcessosPage,
    meta: {
      auth: true
    }
  },
  {
    path: '/Perfil',
    name: 'perfl',
    component: PerfilPage,
    meta: {
      auth: true
    }
  },
  // {
  //   path: '/Tribunal',
  //   name: 'tribunal',
  //   component: Tribunal,
  //   meta: {
  //     auth: true
  //   }
  // },
  {
    path: '/Seccoes',
    name: 'seccoes',
    component: Seccoes,
    meta: {
      auth: true
    }
  },
  // {
  //   path: '/Permisoes',
  //   name: 'permisoes',
  //   component: Permisoes,
  //   meta: {
  //     auth: true
  //   }
  // }
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
