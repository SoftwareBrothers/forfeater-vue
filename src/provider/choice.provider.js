import ApiProvider from "@/provider/api.provider";

export default class ChoiceProvider extends ApiProvider {
  find(id) {
    return new Promise((resolve, reject) => {
      this.axios
        .get("/choices/" + id)
        .then(response => {
          if (response.data) {
            resolve(response.data);
            return;
          }
          reject("There is no choice!");
        })
        .catch(errors => {
          reject(errors);
        });
    });
  }

  getFromOrder(orderId) {
    return new Promise((resolve, reject) => {
      this.axios
        .get("/orders/" + orderId + "/choice")
        .then(response => {
          if (response.data) {
            resolve(response.data);
            return;
          }
          reject("There is no choice!");
        })
        .catch(errors => {
          reject(errors);
        });
    });
  }

  getFromProduct(Product) {
    return new Promise((resolve, reject) => {
      this.axios
        .get(
          "/vendors/" +
            Product.vendorId +
            "/products/" +
            Product.id +
            "/choices"
        )
        .then(response => {
          if (response.data) {
            resolve(response.data);
            return;
          }
          reject("There is no choice!");
        })
        .catch(errors => {
          reject(errors);
        });
    });
  }

  store(User, Order, Product, comment) {
    return new Promise((resolve, reject) => {
      this.axios
        .put("/orders/" + Order.id + "/choices", {
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

  rate(orderId, Score) {
    return new Promise((resolve, reject) => {
      this.axios
        .patch("/orders/" + orderId + "/ratings", {
          mark: Score.score,
          scoreComment: Score.comment
        })
        .then(response => {
          if (response.data) {
            resolve(response.data);
            return;
          }
          reject("Your rate is not saved");
        })
        .catch(errors => {
          reject(errors);
        });
    });
  }

  remove(Order) {
    return new Promise((resolve, reject) => {
      this.axios
        .delete("/orders/" + Order.id + "/choices/" + Order.choice.id)
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
