<template>
  <div style="margin-top: 20px;">
    <div class="row justify-content-center mt-4">
      <div class="col-sm-6">
        <label for="score">Rate</label>
        <select v-model="score.score" class="custom-select border-warning" name="score" >
          <option :value="null" disabled>Please rate</option>
          <option v-for="(value,key) in 6" :key="key" :value="value">{{ value }}</option>
        </select>
      </div>
    </div>
    <div class="row justify-content-center mt-4">
      <div class="col-sm-6">
        <span>Comment:</span>
        <textarea v-model="score.comment" class="form-control border-warning"></textarea>
      </div>
    </div>
  </div>
</template>

<script>

  export default {

      props: {
          score: {
              score: null,
              comment: null
          },
          Choice: {
              type: Object,
              required: false,
              default: () => ({
                  orderId: null,
                  userId: null,
                  productId: null,
                  orderComment: null,
                  score: null,
                  scoreComment: null
              }),
          }
      },

  };
</script>
