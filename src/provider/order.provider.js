import axios from "axios";
import ApiProvider from "@/provider/api.provider";

class OderProvider extends ApiProvider {
  constructor() {
    super("/orders");
  }

  getActive() {
    return new Promise((resolve, reject) => {
      axios
        .get(this.uri, {
          params: { active: 1 }
        })
        .then(response => {
          if (response.data[0]) {
            resolve(response.data[0]);
            return;
          }
          reject("No order in database");
        })
        .catch(errors => {
          reject(errors);
        });
    });
  }
}

export default new OderProvider();
