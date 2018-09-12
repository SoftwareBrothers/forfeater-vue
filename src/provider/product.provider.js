import ApiProvider from '@/provider/api.provider';

export default class ProductProvider extends ApiProvider {
  products = [];
  error = [];
  
  getAllActiveByVendor(vendorId) {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`/vendors/${vendorId}/products`, {
          params: {
            active: 1,
            vendorId: vendorId
          },
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