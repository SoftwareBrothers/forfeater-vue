<template>
  <div>
    <input v-model="input" v-bind:class="{'is-invalid': error}" type="text" class="form-control" name="input" placeholder="Enter Name" @input="onChange">
    <div class="invalid-feedback" v-show="error">{{ error }}</div>
    <ul class="autocomplete-results" v-show="isOpen">
      <li class="autocomplete-result" v-show="results.length > 0" v-for="(user, i) in results" :key="i" @click="onSelect(user)">
        {{user.firstName}} {{user.lastName}} ({{user.email}})
      </li>
      <li class="autocomplete-error" v-show="results.length == 0 && input.length > 3">
        No result found
      </li>
    </ul>
  </div>
</template>

<script>
import UserProvider from "@/provider/user.provider";
export default {
  data: function() {
    return {
      appErrors: [],
      users: [],
      input: "",
      results: [],
      isOpen: false,
      error: false
    };
  },
  created() {
    new UserProvider().getAll()
      .then(users => {
        this.users = users;
      })
      .catch(errors => {
        appErrors.push(errors);
      });
  },
  methods: {
    onSelect: function(user) {
      this.isOpen = false;
      this.input = `${user.firstName} ${user.lastName} (${user.email})`;
      this.$emit("userSelected", user);
    },
    onChange: function() {
      if (this.input.length <= 3) {
        this.isOpen = false;
        this.error = "Please provide at least 4 characters";
        return;
      }
      this.error = false;
      this.filterResults();
      this.isOpen = true;
    },
    filterResults: function() {
      this.results = this.users.filter(item => {
        return (
          item.lastName.toLowerCase().indexOf(this.input.toLowerCase()) > -1 || item.firstName.toLowerCase().indexOf(this.input.toLowerCase()) > -1 
        );
      });
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