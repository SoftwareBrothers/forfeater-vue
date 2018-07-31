import axios from "axios";
import ApiProvider from '@/provider/api.provider';

class VendorProvider extends ApiProvider {
  vendor = null;
  vendors = null;
  error= [];
  
  constructor() {
    super('/vendors');
  }

  getAll() {
    return new Promise((resolve,reject)=> {
      axios
      .get(this.uri)
      .then(response => {
        this.vendors = response.data;
        resolve(this.vendors);
      })
      .catch(errors => {
        this.errors.push(errors);
        reject(this.errors);
      });
    });
  }

  getTodayVendor() {
    return new Promise((resolve,reject)=> {
      axios
      .get(this.uri)
      .then(response => {
        this.vendor = response.data[0] ? response.data[0] : null;
        resolve(this.vendor);
      })
      .catch(errors => {
        this.errors.push(errors);
        reject(this.errors);
      });
    });
  }
}

export default new VendorProvider();
