<template>
  <nav class="breadcrumb">
    <ul>
      <li v-for="(item, index) in list" :key="index" :class="{ 'is-active': isLast(index) }">
        <a href="#" v-if="isLast(index)">{{ showName(item) }}</a>
        <router-link :to="item.path" v-else>{{ showName(item) }}</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'Breadcrumbs',
  data() {
    return {
      list: this.$route.matched
    };
  },
  methods: {
    isLast(index) {
      return index === this.list.length - 1;
    },
    showName(item) {
      return (item.meta && item.meta.label) || item.name;
    }
  }
};
</script>
<style lang="sass" src="bulma/bulma.sass" scoped></style>
