<template>
  <div class="container">
    <div class="row pt-3">
      <div class="col-sm">
        <h1 class="text-center">Change Password</h1>
      </div>
    </div>
    <div>
      <div class="row">
        <div class="col-sm-12">
          <form class="needs-validation" novalidate>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="password">Password</label>
                <input v-validate="'required|confirmed:confirmation'" v-model="password" type="password" class="form-control" name="password" placeholder="Password">
                <div class="invalid-feedback-not-work">{{ errors.first('password')}}</div>
              </div>
              <div class="form-group col-md-6">
                <label for="confirmation">Confirmation</label>
                <input type="password" class="form-control" name="confirmation" ref="confirmation" placeholder="Password">
                <div class="invalid-feedback-not-work">{{ errors.first('confirmation')}}</div>
              </div>
            </div>
            <button v-if="user.id" type="button" class="btn btn-warning" :disabled="errors.has()" @click="editUser">Change password</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        password: null
      };
    },
    computed: {
      user() {
        return this.$store.getters.user;
      }
    },
    created() {}
  };
</script>
