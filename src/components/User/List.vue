<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm"></div>
      <div class="col-sm">
        <h1 class="text-center">User list</h1>
      </div>
      <div class="col-sm"></div>
    </div>
    <div v-if="users">
      <div class="row">
        <div class="col-sm"></div>
        <div class="col-sm-12">
          <router-link class="nav-link d-inline" :to="{ name: 'UserCreate' }">Create user</router-link>
          <div class="table-responsive">
            <table class="table table-sm table-hover table-bordered table-striped">
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
                <tr v-for="(user, key) in users" v-bind:key="key">
                  <th scope="row">{{ user.id }}</th>
                  <td>{{ user.firstName }}</td>
                  <td>{{ user.lastName }}</td>
                  <td>{{ user.email}}</td>
                  <td>{{ user.role}}</td>
                  <td>
                    <router-link class="nav-link d-inline" :to="{ name: 'UserEdit' }">
                      <font-awesome-icon icon="edit" />
                    </router-link>
                    <a class="nav-link d-inline text-danger" href="" @click="removeUser(user.id, key)">
                      <font-awesome-icon icon="trash" />
                    </a>
                    <!-- <button type="button" class="nav-link d-inline text-danger" @click="removeUser(user.id, key)">Delete</button> -->
                  </td>
                </tr>
              </tbody>
            </table>
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
  import Vue from "vue";
  
  export default {
    data() {
      return {
        users: {}
      };
    },
    methods: {
      removeUser: function(userId, key) {
        UserProvider.remove(userId)
          .then(user => {
            this.users.splice(key, 1);
          })
          .catch(errors => {
            console.log(errors);
          });
      }
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
