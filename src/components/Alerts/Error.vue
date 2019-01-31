<template>
  <b-message v-if="content || title" :title="title" type="is-danger">{{content}}</b-message>
</template>
<script lang="ts">
import Vue from 'vue';

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
  }
});
</script>
