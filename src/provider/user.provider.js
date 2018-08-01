import axios from "axios";
import ApiProvider from '@/provider/api.provider';

class UserProvider extends ApiProvider {
  vendor = null;
  error= [];
  
  constructor() {
    super('/users');
  }

    find(id) {
    return new Promise((resolve,reject)=> {
      axios
      .get(this.uri + '/' + id)
      .then(response => {
        if(response.status !== 200) {
          reject(this.errors);
        }
        resolve(response.data);
      })
      .catch(errors => {
        console.log(errors)
        this.errors.push(errors);
        reject(this.errors);
      });
    });
  }

  getAll() {
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

  remove(userId) {
    return new Promise((resolve,reject)=> {
      axios
      .delete(this.uri + '/' + userId)
      .then(response => {
        status = response.data.status;
        console.log(status);
        if(status != 'success') {
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
    return new Promise((resolve,reject)=> {
      axios
      .post(this.uri, user)
      .then(response => {
        if(response.status !== 201) {
          reject(this.errors);
        }
        resolve(response.data);
      })
      .catch(errors => {
        console.log(errors)
        this.errors.push(errors);
        reject(this.errors);
      });
    });
  }

  update(user) {
    return new Promise((resolve,reject)=> {
      axios
      .patch(this.uri + '/' + user.id, user)
      .then(response => {
        status = response.data.status;
        console.log(response.data)
        if(status != 'success') {
          reject(this.errors);
        }
        resolve(response.data.data);
      })
      .catch(errors => {
        console.log(errors)
        this.errors.push(errors);
        reject(this.errors);
      });
    });
  }

}

export default new UserProvider();
