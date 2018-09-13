import ApiProvider from "@/provider/api.provider";

export default class UserProvider extends ApiProvider {
  vendor = null;
  errors = [];

  uri = "/users";

  find(id) {
    return new Promise((resolve, reject) => {
      this.axios
        .get(this.uri + "/" + id, this.config)
        .then(response => {
          if (response.status !== 200) {
            reject(this.errors);
          }
          resolve(response.data);
        })
        .catch(errors => {
          console.log(errors);
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      this.axios
        .get(this.uri, this.config)
        .then(response => {
          this.users = response.data;
          resolve(this.users);
        })
        .catch(errors => {
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }

  remove(userId) {
    return new Promise((resolve, reject) => {
      this.axios
        .delete(this.uri + "/" + userId, this.config)
        .then(response => {
          status = response.data.status;
          console.log(status);
          if (status != "success") {
            reject(this.errors);
          }
          resolve(true);
        })
        .catch(errors => {
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }

  store(user) {
    return new Promise((resolve, reject) => {
      this.axios
        .post(this.uri, user, this.config)
        .then(response => {
          if (response.status !== 201) {
            reject(this.errors);
          }
          resolve(response.data);
        })
        .catch(errors => {
          console.log(errors);
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }

  update(user) {
    return new Promise((resolve, reject) => {
      this.axios
        .patch(this.uri + "/" + user.id, user, this.config)
        .then(response => {
          status = response.data.status;
          console.log(response.data);
          if (status != "success") {
            reject(this.errors);
          }
          resolve(response.data.data);
        })
        .catch(errors => {
          console.log(errors);
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }

  changePassword(user, password) {
    return new Promise((resolve, reject) => {
      this.axios
        .put(this.uri + "/" + user.id + '/password', {"newPassword": password}, this.config)
        .then(response => {
          status = response.data.status;
          console.log(response.data);
          if (status != "success") {
            reject(this.errors);
          }
          resolve(response.data.message);
        })
        .catch(errors => {
          console.log(errors);
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }

}
