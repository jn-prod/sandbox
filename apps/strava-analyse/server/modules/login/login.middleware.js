const jwt = require("jsonwebtoken");
const StravaService = require("../../common/services/strava.service");
const UserService = require("../user/user.service");
const _ = require("lodash");

module.exports = (dbClient) => {
  const userService = new UserService(dbClient);
  const stravaService = new StravaService();

  return {
    login: async (ctx, next) => {
      if (!ctx.state.user) {
        ctx.response.status = 403;
        return (ctx.body = `Vous n'ètes pas authentifié.`);
      }
      ctx.body = { message: "GRANTED" };
      return next();
    },

    getToken: async (ctx, next) => {
      const { request } = ctx;

      try {
        // 1. get granted access from strava API
        const { data = {}, status } = await stravaService.getToken(request.body.code);
        const { athlete = {}, access_token: stravaToken } = data;

        // 2. generate service token
        const token = jwt.sign(
          {
            data: athlete,
            stravaToken,
          },
          process.env.API_SECRET,
          { expiresIn: "2h" }
        );

        // 3. save or update user in db
        const { firstname, lastname, reference: id } = (await userService.createOrUpdateUser(null, athlete)) || {};

        ctx.status = status;
        ctx.body = {
          jwt: token,
          user: {
            firstname,
            lastname,
            id,
          },
        };
        ctx.headers.authorization = `Bearer ${token}`;

        return next();
      } catch (err) {
        const { response } = err;
        if (!response) return ctx;

        const { data, status } = err.response;
        ctx.status = status;
        ctx.body = data;
        return ctx;
      }
    },
  };
};
