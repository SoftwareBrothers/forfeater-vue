import ApiProvider from "@/provider/api.provider";

export default class VendorProvider extends ApiProvider {
  vendor = null;
  vendors = null;
  errors = [];

  uri = "/vendors";

  find(id) {
    return new Promise((resolve, reject) => {
      this.axios
        .get(this.uri + "/" + id, this.config)
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
      this.axios
        .get(this.uri, this.config)
        .then(response => {
          this.vendors = response.data;
          resolve(this.vendors);
        })
        .catch(errors => {
          this.errors.push(errors);
          reject(this.errors);
          console.log(errors);
        });
    });
  }

  getTodayVendor() {
    return new Promise((resolve, reject) => {
      this.axios
        .get(this.uri, this.config)
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

  remove(vendorId) {
    return new Promise((resolve, reject) => {
      this.axios
        .delete(this.uri + "/" + vendorId, this.config)
        .then(response => {
          status = response.data.status;
          console.log(status);
          if (status != "success") {
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

  store(vendor) {
    return new Promise((resolve, reject) => {
      this.axios
        .post(this.uri, vendor, this.config)
        .then(response => {
          if (response.status !== 201) {
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

  update(vendor) {
    return new Promise((resolve, reject) => {
      this.axios
        .patch(this.uri + "/" + vendor.id, vendor, this.config)
        .then(response => {
          status = response.data.status;
          console.log(response.data);
          if (status != "success") {
            reject(this.errors);
          }
          resolve(response.data.data);
        })
        .catch(errors => {
          console.log(errors);
          this.errors.push(errors);
          reject(this.errors);
        });
    });
  }
}
