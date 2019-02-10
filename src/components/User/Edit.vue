<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li class="breadcrumb-item">
          <router-link :to="{ name: 'UserList' }">Users</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">Edit</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Edit user</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <UserForm :User="User"></UserForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from '@/components/User/Form';
import { UserService } from '@/services/user.service';

export default {
  data() {
    return {
      User: {
        firstName: null,
        lastName: null,
        role: null,
        email: null,
        password: null
      },
      service: new UserService()
    };
  },
  async mounted() {
    try {
      const response = await this.service.find(this.$route.params.id);
      this.User = response.data;
    } catch (error) {}
  },
  components: { UserForm }
};
</script>