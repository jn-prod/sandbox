// import AuthService from '@/services/auth.service';
import type { RouteRecordRaw } from 'vue-router';
const Logout = {
  template: '<div></div>',
}

const routes: RouteRecordRaw[] = [
    {
      path: '/',
      name: 'home',
      meta: {requiresAuth: true},
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/auth/LoginView.vue')
    },
]

export default routes;