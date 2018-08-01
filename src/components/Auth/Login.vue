<template>
    <div class="container pt-5">
        <div class="row">
            <div class="col-sm-4 mx-auto w-100">
                <form @submit.prevent="login()">
                    <div class="form-group">
                        <div class="col-sm">
                            <label for="username">Username</label>
                            <input v-model="username" :class="{'is-invalid': errors.has('username')}" v-validate="'required|email'" type="text" class="form-control" name="username" placeholder="Your e-mail address">
                            <small class="invalid-feedback" :if="errors.has('username')">{{errors.first('username')}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm">
                            <label for="password">Password</label>
                            <input v-model="password" :class="{'is-invalid': errors.has('password')}" v-validate="'required'" type="password" class="form-control" name="password" placeholder="Your e-mail address">
                            <small class="invalid-feedback" :if="errors.has('password')">{{errors.first('password')}}</small>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm text-center">
                            <button type="submit" class="btn btn-warning" :disabled="disabled()">Send</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: "",
                password: ""
            };
        },
        methods: {
            login() {
                console.log(this.username, this.password)
            },
            disabled() {
                return this.username.length === 0 || this.password.length === 0 || this.errors.any();
            }
        }
    };
</script>
