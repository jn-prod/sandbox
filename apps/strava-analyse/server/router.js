const Router = require("koa-router");
const authenticated = require("./common/middlewares/authenticated.middleware");
const user = require("./modules/user/user.routes");
const login = require("./modules/login/login.routes");
const sendBody = require("./common/middlewares/sendBody.middleware");

const router = (db) => {
  const routes = new Router();
  const index = new Router();

  index.get("/", async (ctx) => {
    ctx.body = "";
  });

  // NOT FULL authenticated routes
  routes.use(index.routes());
  routes.use("/login", login(db).routes());

  // authenticated routes listed next
  routes.use(authenticated);
  routes.use('/user', user(db).routes());

  routes.use(sendBody);

  return routes.routes();
};

module.exports = router;
