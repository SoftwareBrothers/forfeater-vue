<template>
  <div>
    <input
      v-model="input"
      :class="{ 'is-invalid': error }"
      type="text"
      class="form-control"
      name="input"
      placeholder="Enter Name"
      @input="onChange"
    />
    <div class="invalid-feedback" v-show="error">{{ error }}</div>
    <ul class="autocomplete-results" v-show="isOpen">
      <li class="autocomplete-result" v-show="results.length > 0" v-for="(user, i) in results" :key="i" @click="onSelect(user)">
        {{ fullName(user) }}
      </li>
      <li class="autocomplete-error" v-show="results.length === 0 && input.length > 3">No result found</li>
    </ul>
  </div>
</template>

<script>
import { UserService } from '@/services/user.service';

export default {
  props: {
    user: {
      type: Object,
      required: false,
      default: () => ({
        id: null,
        firstName: null,
        lastName: null,
        email: null
      })
    }
  },
  data: function() {
    return {
      input: this.user.email ? this.fullName(this.user) : '',
      users: [],
      results: [],
      isOpen: false,
      error: null,
      service: new UserService()
    };
  },
  async created() {
    this.users = await this.service.getAll();
  },
  methods: {
    onSelect: function(user) {
      this.isOpen = false;
      this.$emit('update:user', user);
    },
    onChange: function() {
      if (this.input.length <= 3) {
        this.isOpen = false;
        this.error = 'Please provide at least 4 characters';
        return;
      }
      this.filterResults();
      this.isOpen = true;
    },
    filterResults: function() {
      this.results = this.users.filter(item => {
        return (
          item.lastName.toLowerCase().indexOf(this.input.toLowerCase()) > -1 ||
          item.firstName.toLowerCase().indexOf(this.input.toLowerCase()) > -1
        );
      });
    },
    fullName: user => {
      return `${user.firstName} ${user.lastName} (${user.email})`;
    }
  },
  watch: {
    user: function(user) {
      this.input = this.fullName(user);
    }
  }
};
</script>
<style lang="scss">
.autocomplete {
  position: relative;
  width: 130px;
  &-results {
    padding: 0;
    margin: 0;
    border: 1px solid #eeeeee;
    height: auto;
    overflow: auto;
  }
  &-result {
    list-style: none;
    text-align: left;
    padding: 4px 2px;
    cursor: pointer;
    &:hover {
      background-color: orange;
      color: white;
    }
  }
  &-error {
    color: red;
  }
}
</style>
