<template>
    <span>{{ hours | two_digits }}:{{ minutes | two_digits }}:{{ seconds | two_digits }}</span>
</template>

<script>
const moment = require("moment");
export default {
  props: {
    end: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      now: Math.trunc(new Date().getTime() / 1000)
    };
  },
  mounted: function() {
    setInterval(() => {
      this.now = Math.trunc(new Date().getTime() / 1000);
    }, 1000);
  },
  computed: {
    date() {
      return Math.trunc(Date.parse(this.end) / 1000);
    },
    seconds() {
      return (this.date - this.now) % 60;
    },

    minutes() {
      return Math.trunc((this.date - this.now) / 60) % 60;
    },

    hours() {
      return Math.trunc((this.date - this.now) / 60 / 60) % 24;
    },

    days() {
      return Math.trunc((this.date - this.now) / 60 / 60 / 24);
    }
  }
};
</script>
