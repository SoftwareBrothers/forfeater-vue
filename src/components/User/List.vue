<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">User list</h1>
      </div>
    </div>
    <UserTable :users="users"></UserTable>
  </div>
</template>

<script>
  import UserProvider from "@/provider/user.provider";
  import UserTable from "@/components/User/Table";
  
  export default {
    data() {
      return {
        users: {}
      };
    },
    created() {
      new UserProvider().getAll()
        .then(users => {
          this.users = users;
        })
        .catch(errors => {
          console.log(errors);
        });
    },
    components: {
      UserTable
    }
  };
</script>

<style lang="scss" scoped>
  
</style>
