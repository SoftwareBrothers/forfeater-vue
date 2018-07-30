import axios from "axios";

class UserProvider {
  url = null;
  vendor = null;
  error= [];
  
  constructor() {
    this.url = process.env.VUE_APP_API_URL + '/users';
  }

  getAllUsers() {
    return new Promise((resolve,reject)=> {
      axios
      .get(this.url)
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
}

export default new UserProvider();
