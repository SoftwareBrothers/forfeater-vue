<template>
  <div class="container" v-if="type">
    <div class="columns">
      <div class="column"></div>
      <div class="column is-8">
        <b-notification :type="type" has-icon auto-close @close="close()">{{message}}</b-notification>
      </div>
      <div class="column"></div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Notification',
  data() {
    return {
      notification: {
        type: null,
        message: null
      }
    };
  },
  computed: {
    type() {
      if (!this.notification) {
        return null;
      }
      switch (this.notification.type) {
        case 'error':
          return 'is-danger';
        default:
          return null;
      }
    },
    message() {
      return this.notification.message;
    }
  },
  mounted() {
    this.$store.watch(
      function(state) {
        return state.notification;
      },
      notification => {
        this.notification = notification;
      }
    );
  },
  methods: {
    close() {
      this.$store.dispatch('removeNotification');
    }
  }
});
</script>
