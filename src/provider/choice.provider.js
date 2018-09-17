import ApiProvider from "@/provider/api.provider";

export default class ChoiceProvider extends ApiProvider {
  store(User, Order, Product, comment) {
    return new Promise((resolve, reject) => {
      this.axios.put('/orders/' + Order.id + '/choices', {
          orderId: Order.id,
          userId: User.id,
          productId: Product.id,
          orderComment: comment
        })
        .then(response => {
          if (response.data) {
            resolve(response.data);
            return;
          }
          reject("Choice was not saved in database");
        })
        .catch(errors => {
          reject(errors);
        });
    });
  }

  remove(Order) {
    return new Promise((resolve, reject) => {
      this.axios.delete('/orders/' + Order.id + '/choices/' + Order.choice.id)
        .then(response => {
          if (response.data) {
            resolve(response.data);
            return;
          }
          reject("Choice was not deleted");
        })
        .catch(errors => {
          reject(errors);
        });
    });
  }
}