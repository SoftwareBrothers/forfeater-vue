<template>
    <div v-if="choices.length > 0">
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm-12">
                <div class="table-responsive">
                    <table class="table table-sm table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">User</th>
                                <th scope="col">Product</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="choices">
                            <tr v-for="(choice, key) in choices" v-bind:key="key">
                                <th scope="row">{{ choice.id }}</th>
                                <td>{{ choice.user.firstName }} {{ choice.user.lastName }}</td>
                                <td>{{ choice.product.name }}</td>
                                <td>
                                    <!-- <a class="btn-action d-inline text-danger" href="" @click="remove(choice.id, key, $event)">
                                        <font-awesome-icon icon="trash" />
                                    </a> -->
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-sm"></div>
        </div>
    </div>
    <div v-else><h4 class="text-center">There is no choice!</h4></div>
</template>

<script>
   import ChoiceService from "@/services/choice.service";

    export default {
        props: {
            choices: {
                required: true
            }
        },
        methods: {
            remove: function(orderId, key, event) {
                ChoiceService.remove(this.$route.params.orderId, choiceId)
                    .then(choices => {
                        this.choices.splice(key, 1);
                    })
                    .catch(errors => {
                        console.log(errors);
                    });
            }
        }
    }
</script>

<style lang="scss" scoped>
    
</style>
