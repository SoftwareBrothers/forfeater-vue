<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-sm"></div>
      <div class="col-sm">
        <h1 class="text-center">User list</h1>
      </div>
      <div class="col-sm"></div>
    </div>
    <div v-if="users">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm-10">
          <div class="form-group">
  
            <ul v-if="users" class="list-group list-group-flush">
              <li v-for="(user) in users" v-bind:key="user.id" class="list-group-item">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="product" :id="`user-${user.id}`" :value="`${user.id}`">
                  <label class="form-check-label" :for="`product-${user.id}`">
                        {{ user.firstName }} {{ user.lastName }} - {{ user.email}}
                    </label>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import UserProvider from "@/provider/user.provider";
  
  export default {
    data() {
      return {
        users: {},
        errors: []
      };
    },
    created() {
      UserProvider.getAllUsers()
        .then(users => {
          this.users = users;
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  };
</script>

<style lang="scss" scoped>
</style>
