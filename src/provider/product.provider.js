import axios from "axios";
import ApiProvider from '@/provider/api.provider';

class ProductProvider extends ApiProvider {
  products = [];
  error = [];
  
  getAllActiveByVendor(vendorId) {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.api}/vendors/${vendorId}/products`, {
          params: {
            active: 1,
            vendorId: vendorId
          },
          headers: this.config.headers
        },)
        .then(response => {
          this.products = response.data ? response.data : null;
          resolve(this.products);
        })
        .catch(errors => {
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }
}

export default new ProductProvider();
