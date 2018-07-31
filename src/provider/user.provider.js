import axios from "axios";
import ApiProvider from '@/provider/api.provider';

class UserProvider extends ApiProvider {
  vendor = null;
  error= [];
  
  constructor() {
    super('/users');
  }

  getAllUsers() {
    return new Promise((resolve,reject)=> {
      axios
      .get(this.uri)
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
