<template>
    <div v-if="choices.length > 0">
        <v-client-table :data="tableData" :columns="columns" :options="options">
            <router-link slot="actions" slot-scope="props" class="btn-action d-inline"
                         v-if="user && user.role === 'admin'"
                         :to="{ name: 'ChoiceEdit', params: { orderId: props.row.orderId, choiceId: props.row.id } }">
                <font-awesome-icon icon="edit" />
            </router-link>
        </v-client-table>
        <!--<div class="row">-->
            <!--<div class="col-sm"></div>-->
            <!--<div class="col-sm-12">-->
                <!--<div class="table-responsive">-->
                    <!--<table class="table table-sm table-hover table-bordered table-striped">-->
                        <!--<thead>-->
                        <!--<tr>-->
                            <!--<th scope="col">User</th>-->
                            <!--<th scope="col">Product</th>-->
                            <!--<th scope="col">Comment</th>-->
                            <!--<th scope="col">Actions</th>-->
                        <!--</tr>-->
                        <!--</thead>-->
                        <!--<tbody v-if="choices">-->
                        <!--<tr v-for="(choice, key) in choices" v-bind:key="key">-->
                            <!--<td>{{ choice.user.firstName }} {{ choice.user.lastName }}</td>-->
                            <!--<td>{{ choice.product.name }}</td>-->
                            <!--<td>{{ choice.orderComment }}</td>-->
                            <!--<td>-->
                                <!--&lt;!&ndash; <a class="btn-action d-inline text-danger" href="" @click="remove(choice.id, key, $event)">-->
                                    <!--<font-awesome-icon icon="trash" />-->
                                <!--</a> &ndash;&gt;-->
                            <!--</td>-->
                        <!--</tr>-->
                        <!--</tbody>-->
                    <!--</table>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="col-sm"></div>-->
        <!--</div>-->
    </div>
    <div v-else><h4 class="text-center">There is no choice!</h4></div>
</template>

<script>
  import ChoiceService from "@/services/choice.service";

  export default {
    props: {
      choices: {
        required: true
      },
      tableData: {
        required: true
      }
    },
    data() {
      return {
        columns: ['userFullName', 'productName', 'orderComment', 'actions'],
        options: {
          headings: {
            userFullName: 'User',
            productName: 'Product',
            orderComment: 'Comment',
            actions: "Actions"
          },
          perPage: 30,
          perPageValues: [10, 30, 50, 100],
          skin: 'table table-sm table-hover table-bordered table-striped'
        }
      };
    },
    methods: {
      remove: function (orderId, key, event) {
        ChoiceService.remove(this.$route.params.orderId, choiceId)
          .then(choices => {
            this.choices.splice(key, 1);
          })
          .catch(errors => {
            console.log(errors);
          });
      }
    },
      computed: {
          user() {
              return this.$store.getters.user;
          }
      },
  }
</script>

<style lang="scss" scoped>

</style>
