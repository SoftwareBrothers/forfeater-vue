import axios from "axios";
import ApiProvider from "@/provider/api.provider";

class ChoiceProvider extends ApiProvider {
  constructor() {
    super("/choices");
  }

  post(User, Order, Product) {
    return new Promise((resolve, reject) => {
      axios
        .post(this.uri, {
          orderId: Order.id,
          userId: User.id,
          productId: Product.id
        })
        .then(response => {
          if (response.data[0]) {
            resolve(response.dat[0]);
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

export default new ChoiceProvider();
