import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '@/services/utils/auth'
import routes from './routes';

Vue.use(VueRouter);

const beforeEach = (to, from, next) => {
    if (to.matched.some(record => !record.meta.requiresAuth)) {
        return next();
    }

    const auth = new Auth();
    if (auth.getToken()) {
        return next();
    }

    return next({name: 'login', params: { error: 'MISSING_AUTH' } })
};

const router = new VueRouter({
    mode: 'hash',
    base: '/',
    routes,
})

router.beforeEach(beforeEach)

export default router;