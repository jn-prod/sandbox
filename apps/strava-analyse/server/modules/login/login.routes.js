const Router = require("koa-router");

const authenticated = require("../../common/middlewares/authenticated.middleware");

module.exports = (db) => {
  const { login, getToken } = require("./login.middleware")(db);
  const routes = new Router();

  // NOT authenticated routes
  routes.post("/", getToken);

  // authenticated routes next
  routes.use(authenticated);

  routes.get("/", login);

  return routes;
};
