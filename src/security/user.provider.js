import axios from "axios";

class UserProvider {
  provide(credential) {
    return new Promise((resolve, reject) => {
      axios
        .post(process.env.VUE_APP_API_URL + "/auth", {
          username: credential.username,
          password: credential.password
        })
        .then(res => {
          if (res.data[0]) {
            return resolve(res.data[0]);
          }
          return reject("User not logged");
        })
        .catch(err => {
          return reject(err);
        });
    });
  }

  exampleUser = {
    firstName: "Marek",
    lastName: "F",
    role: "admin",
    email: "marek@test.pl"
  };
}

export default new UserProvider();
