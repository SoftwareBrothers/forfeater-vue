import ApiProvider from "@/provider/api.provider";

export default class OderProvider extends ApiProvider {
  getActive() {
    return new Promise((resolve, reject) => {
      this.axios
        .get("/orders", {
          params: { active: 1 },
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
