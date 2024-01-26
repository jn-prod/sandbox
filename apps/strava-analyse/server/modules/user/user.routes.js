// node_modules
const Router = require('koa-router');

const router = (db) => {
    const {getUser, patchUser, deleteUser, dashboard} = require('./user.middleware')(db);
    const routes = new Router();

    routes.get('/:reference', getUser)

    routes.patch('/:reference', patchUser)

    routes.get('/:user/delete', deleteUser)

    routes.get('/:user/dashboard', dashboard)

    return routes
}

module.exports = router;
