<template>
  <div v-if="users">
    <div class="row">
      <div class="col-sm"></div>
      <div class="col-sm-12">
        <router-link
          class="nav-link btn btn-warning btn-custom col-white"
          :to="{ name: 'UserCreate' }"
        >Create user</router-link>
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
                  <router-link
                    class="btn-action d-inline"
                    :to="{ name: 'UserEdit', params: { id: user.id } }"
                  >
                    <font-awesome-icon icon="edit"/>
                  </router-link>
                  <button class="btn btn-action d-inline text-danger" @click="remove(user.id, key)">
                    <font-awesome-icon icon="trash"/>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="col-sm"></div>
    </div>
  </div>
</template>

<script>
import { UserService } from '@/services/user.service';

export default {
  props: {
    users: {
      required: true
    }
  },
  data() {
    return {
      service: new UserService()
    };
  },
  methods: {
    remove: function(userId, key) {
      this.service
        .remove(userId)
        .then(user => {
          this.users.splice(key, 1);
          this.$emit('users:update', this.users);
        })
        .catch(errors => {});
    }
  }
};
</script>