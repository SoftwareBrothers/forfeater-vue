import axios from "axios";
import ApiService from "./api.service";

class ChoiceService extends ApiService {

  choices = [];
  error = [];
 
  getAll(orderId) {
    return new Promise((resolve,reject)=> {
      axios
      .get(this.base + '/orders/' + orderId + '/choices', this.config)
      .then(response => {
        this.choices = response.data;
        resolve(this.choices);
      })
      .catch(errors => {
        this.errors.push(errors);
        reject(this.errors);
      });
    });
  }

}

export default new ChoiceService();
