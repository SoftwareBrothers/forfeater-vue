import ApiProvider from "@/provider/api.provider";

export default class ChoiceProvider extends ApiProvider {
  post(User, Order, Product) {
    return new Promise((resolve, reject) => {
      this.axios.post("/choices", {
          orderId: Order.id,
          userId: User.id,
          productId: Product.id
        })
        .then(response => {
          if (response.data[0]) {
            resolve(response.data[0]);
            return;
          }
          reject("Choice was not saved in database");
        })
        .catch(errors => {
          reject(errors);
        });
    });
  }
}