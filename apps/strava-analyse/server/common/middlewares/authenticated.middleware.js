const jwt = require("jsonwebtoken");

module.exports = (ctx, next) => {
  try {
    const { authorization } = ctx.headers;
    if (!authorization) return (ctx.response.status = 403);

    const token = authorization.split(" ").pop();
    ctx.state.user = jwt.verify(token, process.env.API_SECRET);

    if (!ctx.state.user) return (ctx.response.status = 403);

    return next();
  } catch (err) {
    ctx.response.status = 403;
    ctx.response.body = "Vous n'ètes pas authentifié.";
    return;
  }
};
