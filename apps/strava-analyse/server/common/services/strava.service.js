const axios = require("axios");

module.exports = class StravaService {
  instance;
  constructor() {
    this.instance = axios.create({
      timeout: 5 * 1000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.defaults.baseURL = "https://www.strava.com/api/v3";
  }

  async getToken(code) {
    if (!code) {
      throw http.Error(404, { data: "Missing code params in body" });
    }

    const url = '/oauth/token';
    const payload = {
      client_id: process.env.STRAVA_CLIENT_ID,
      client_secret: process.env.STRAVA_CLIENT_SECRET,
      code: code,
      grant_type: "authorization_code",
    };

    try {
        const {data, status } = await this.instance.post(url, payload);
        if (status !== 200 || !data.access_token) {
          throw http.Error(status, { data: "Missing granted authentification from strava API" });
        }
    
        return { data, status };

    } catch(err) {
        throw err
    }
  }
};
