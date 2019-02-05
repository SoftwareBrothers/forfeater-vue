import axios from 'axios';
import ApiService from './api.service';

class OrderService extends ApiService {
  find(orderId) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.base + '/orders/' + orderId, this.config)
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
      axios
        .get(this.base + '/orders', this.config)
        .then(response => {
          this.orders = response.data;
          resolve(this.orders);
        })
        .catch(errors => {
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }

  remove(orderId) {
    return new Promise((resolve, reject) => {
      axios
        .delete(this.base + '/orders/' + orderId, this.config)
        .then(response => {
          status = response.status;
          console.log(status);
          if (response.status !== 200) {
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

  store(order) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.base + '/orders', order, this.config)
        .then(response => {
          if (response.status !== 201) {
            reject(this.errors);
          }
          resolve(response.data);
        })
        .catch(errors => {
          reject('Could not create order');
        });
    });
  }

  update(order) {
    return new Promise((resolve, reject) => {
      console.log('what is sent:');
      console.log(order);

      axios
        .patch(this.base + '/orders/' + order.id, order, this.config)
        .then(response => {
          console.log(response.data);
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
}

export default new OrderService();
