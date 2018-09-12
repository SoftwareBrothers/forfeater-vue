<template>
  <div class="container">
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
  import axios from "axios";
  import UserProvider from "@/provider/user.provider";
  import UserForm from "@/components/User/Form";
  
  export default {
    data() {
      return {
        User: {
          firstName: null,
          lastName: null,
          role: null,
          email: null,
          password: null
        }
      };
    },
    beforeCreate() {
      new UserProvider().find(this.$route.params.id)
        .then(user => {     
          this.User = user;       
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      UserForm
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
