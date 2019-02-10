<template>
  <BNotification v-if="type" :type="type" has-icon>{{message}}</BNotification>
</template>
<script lang="ts">
import Vue from 'vue';
import BNotification from 'buefy/src/components/notification/Notification.vue';

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
      switch (this.notification.type) {
        case 'error':
          return 'is-danger';
        default:
          return null;
      }
    },
    message(){
        return this.$t(this.notification.message);
    }
  },
  mounted() {
    this.$store.watch(function (state) {
        return state.notification
    }, (notification) => {
      console.warn(notification);
      this.notification = notification;
    });
  },
  components: { BNotification }
});
</script>
