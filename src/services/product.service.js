import axios from "axios";
import ApiService from "./api.service";

class ProductService extends ApiService {

  products = [];
  error = [];
 
  getAll(vendorId) {
    return new Promise((resolve,reject)=> {
      axios
      .get(this.base + '/vendors/' + vendorId + '/products')
      .then(response => {
        this.products = response.data;
        resolve(this.products);
      })
      .catch(errors => {
        this.errors.push(errors);
        reject(this.errors);
      });
    });
  }

  remove(vendorId, productId) {
    return new Promise((resolve,reject)=> {
      axios
      .delete(this.base + '/vendors/' + vendorId + '/products/' + productId)
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

  store(product) {
    return new Promise((resolve,reject)=> {
      axios
      .post(this.base + '/vendors/' + product.vendorId + '/products', product)
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

}

export default new ProductService();
