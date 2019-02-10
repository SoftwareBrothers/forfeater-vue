<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'OrderList' }">Orders</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Score your order</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <div>
            Product:
            <strong>{{ Choice.product.name }}</strong>
          </div>
          <div>
            Rate:
            <strong>{{ Choice.score }}</strong>
          </div>
          <div>
            Comment:
            <strong>{{ Choice.scoreComment }}</strong>
          </div>
          <ScoreForm :score="score"></ScoreForm>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center mt-4">
      <button
        :disabled="!score.score"
        class="btn btn-lg btn-warning col-white"
        v-on:click="sendForm"
      >Send</button>
    </div>
  </div>
</template>

<script>
import ScoreForm from '@/components/Choice/ScoreForm';
import { ChoiceService } from '@/services/choice.service';

export default {
  data() {
    return {
      score: {
        score: null,
        comment: null
      },
      Choice: {
        orderId: null,
        userId: null,
        productId: null,
        orderComment: null,
        score: null,
        scoreComment: null,
        order: {},
        product: {}
      },
      service: new ChoiceService()
    };
  },
  methods: {
    sendForm: async function() {
      if (this.score.score) {
        this.service.rate(this.$route.params.id, this.score).then(response => {
          this.Choice = response.data;
        });
      }
    }
  },
  beforeCreate() {
    this.service.getFromOrder(this.$route.params.id).then(response => {
      this.Choice = response.data;
    });
  },
  components: { ScoreForm }
};
</script>
