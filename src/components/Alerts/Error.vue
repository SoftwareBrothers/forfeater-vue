<template>
  <Message v-if="content || title" :title="title" type="is-danger">{{ content }}</Message>
</template>
<script lang="ts">
import Vue from 'vue';
import Message from 'buefy/src/components/mesage/Message.vue';

export default Vue.extend({
  name: 'ErrorAlert',
  props: {
    content: {
      type: String,
      required: false,
      default: null
    },
    title: {
      type: String,
      required: false,
      default: '🤕 Error, szwagier'
    }
  },
  components: { Message }
});
</script>
<style lang="scss" scoped>
@import '~buefy/src/scss/components/_message.scss';
</style>
