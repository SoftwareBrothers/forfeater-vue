import axios from "axios";
var qs = require("qs");

const config = {
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
};
class UserProvider {
  authorize(credential) {
    return new Promise((resolve, reject) => {
      const data = {
        grant_type: "password",
        username: credential.username,
        password: credential.password,
        client_id: process.env.VUE_APP_API_CLIENT_ID || "forfeaterWeb",
        client_secret:
          process.env.VUE_APP_API_CLIENT_SECRET || "forfeaterSecrect"
      };
      axios
        .post(
          `${process.env.VUE_APP_API_URL}/auth/login`,
          qs.stringify(data),
          config
        )
        .then(response => {
          if (response.status === 200) {
            return resolve(response.data);
          }
          return reject("Can't log in user");
        })
        .catch(err => {
          return reject(err);
        });
    });
  }
  provide(access_token) {
    return new Promise((resolve, reject) => {
      Object.assign(config.headers, {
        Authorization: `Bearer ${access_token}`
      });

      axios
        .get(`${process.env.VUE_APP_API_URL}/auth/user`, config)
        .then(response => {
          if (response.status === 200) {
            return resolve(response.data);
          }
          reject(`${res.code}: Can't get user data`);
        })
        .catch(error => reject(error));
    });
  }
}

export default new UserProvider();
