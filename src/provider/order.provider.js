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
          params: { active: 1 },
          headers: this.config.headers
        })
        .then(response => {
          if (response.data) {
            resolve(response.data);
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
