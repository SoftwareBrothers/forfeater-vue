<template>
  <div class="container">
    <nav class="breadcrumb">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index"
          :class="{ 'is-active': isLast(index) }"
        >
          <router-link :to="item.path">{{ showName(item) }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumbs',
  data() {
    return {
      list: this.$route.matched,
    };
  },
  methods: {
    isLast(index) {
      return index === this.list.length - 1;
    },
    showName(item) {
      return (item.meta && item.meta.label) || item.name;
    },
  },
};
</script>
