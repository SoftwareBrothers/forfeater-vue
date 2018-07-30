import axios from "axios";

class ProductProvider {
  url = null;
  products = [];
  error = [];

  constructor() {
    this.url = process.env.API_URL + "/products";
  }

  getAllActiveByVendor(vendorId) {
    return new Promise((resolve, reject) => {
      axios
        .get(this.url, {
          params: {
            active: 1,
            vendorId: vendorId
          }
        })
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
