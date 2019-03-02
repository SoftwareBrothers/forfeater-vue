<template>
  <button class="btn btn-outline-info text-center" @click="doPrint()">
    <slot name="buttonText"></slot>
    <font-awesome-icon icon="print" />
  </button>
</template>
<script>
export default {
  name: 'Print',
  methods: {
    doPrint() {
      window.print();
    }
  }
};
</script>
<style lang="scss" scoped>
@page {
  margin: 0;
}

button {
  svg {
    margin-left: 0.5rem;
  }
}
</style>
