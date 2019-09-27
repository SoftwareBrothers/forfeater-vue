<template>
  <div class="columns is-mobile is-centered">
    <div class="column is-half">
      <b-notification
        v-if="type"
        :type="type"
        has-icon
        auto-close
        @close="close()"
        >{{ message }}</b-notification
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'Notification',
  data() {
    return {
      notification: {
        type: null,
        message: null,
      },
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
        case 'warning':
          return 'is-warning';
        case 'success':
          return 'is-success';
        default:
          return null;
      }
    },
    message() {
      return this.notification.message;
    },
  },
  mounted() {
    this.$store.watch(
      function(state) {
        return state.notification;
      },
      notification => {
        this.notification = notification;
      },
    );
  },
  methods: {
    close() {
      this.$store.dispatch('removeNotification');
    },
  },
};
</script>
