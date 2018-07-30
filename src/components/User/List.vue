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
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody v-if="users">
              <tr v-for="(user) in users" v-bind:key="user.id">
                <th scope="row">{{ user.id }}</th>
                <td>{{ user.firstName }}</td>
                <td>{{ user.lastName }}</td>
                <td>{{ user.email}}</td>
                <td>{{ user.role}}</td>
                <td>TODO</td>
              </tr>
            </tbody>
          </table>
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
