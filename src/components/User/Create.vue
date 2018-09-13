<template>
  <div class="container">
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
