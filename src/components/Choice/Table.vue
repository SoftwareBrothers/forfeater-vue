<template>
    <div v-if="choices.length > 0">
        <v-client-table :data="tableData" :columns="columns" :options="options">
            <router-link slot="edit" slot-scope="props" class="btn-action d-inline"
                         v-if="user && user.role === 'admin'"
                         :to="{ name: 'ChoiceEdit', params: { orderId: props.row.orderId, choiceId: props.row.id } }">
                <font-awesome-icon icon="edit"/>
            </router-link>
            <a slot="delete" slot-scope="props" class="btn-action d-inline text-danger"
                         v-if="user && user.role === 'admin'" @click="remove(props.row.id, props.row.index)"
                         href="#">
                <font-awesome-icon icon="trash" />

            </a>
        </v-client-table>
    </div>
    <div v-else><h4 class="text-center">There is no choice!</h4></div>
</template>

<script>
    import ChoiceProvider from "@/provider/choice.provider";

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
        columns: ['userFullName', 'productName', 'orderComment', 'edit', 'delete'],
        options: {
          headings: {
            userFullName: 'User',
            productName: 'Product',
            orderComment: 'Comment',
            edit: "Edit",
            delete: "Delete"
          },
          perPage: 30,
          perPageValues: [10, 30, 50, 100],
          skin: 'table table-sm table-hover table-bordered table-striped'
        }
      };
    },
    methods: {
      remove: function (choiceId, key) {
          new ChoiceProvider().remove(this.$route.params.orderId, choiceId)
          .then(choices => {
            this.choices.splice(key, 1);
          })
          .catch(errors => {
            console.log(errors);
          });
      },
        nothing: function (e) {
          e.preventDefault();
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
