import axios from "axios";

class VendorProvider {
  url = null;
  vendor = null;
  error= [];
  
  constructor() {
    this.url = process.env.API_URL + '/vendors';
  }

  getTodayVendor() {
    return new Promise((resolve,reject)=> {
      axios
      .get(this.url)
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
