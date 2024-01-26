import { createRouter, createWebHistory, type Router, type RouteLocationNormalized, type NavigationGuardNext } from 'vue-router';
import routes from './routes';
import { client } from '../services/supabase.service';


const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

/**
 * Before each route
 * - set locale based on url
 * - check if route requires authentification
 */
router.beforeEach(async (to: RouteLocationNormalized, _, next) => {
  // const { data } = await client.auth.getSession()
  // const { data: { user } } = await client.auth.getUser()
  // console.log('getSession', data, user)
  // const session = data.session
  // if (to.name !== 'login' && !session) {
  //   return {
  //     name: 'login',
  //   };
  // } else if(to.name === 'logout') {
  //   await client.auth.signOut()
  // }
  if (to.params?.access_token) {
    window.localStorage.setItem('jwt', to.params.access_token as string)
  }
  // get current user info
  const currentUser = await client.auth.getUser(window.localStorage.getItem('jwt') as string);
  // const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if(!currentUser) next('/login')
  else next();
});

export default router;