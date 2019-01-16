<template>
  <div class="container">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><router-link :to="{ name: 'Home' }">Home</router-link></li>
        <li class="breadcrumb-item"><router-link :to="{ name: 'UserList' }">Users</router-link></li>
        <li class="breadcrumb-item active" aria-current="page">Create</li>
      </ol>
    </nav>
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Create user</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <UserForm></UserForm>
        </div>
        <div class="col-sm"></div>
      </div>
    </div>
  </div>
</template>

<script>
import UserForm from "@/components/User/Form";

export default {
  data() {
    return {};
  },
  components: {
    UserForm
  }
};
</script>

<style lang="scss" scoped>
</style>
