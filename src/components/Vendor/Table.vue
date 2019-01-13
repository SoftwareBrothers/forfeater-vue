<template>
    <div v-if="vendors">
        <div class="row">
            <div class="col-sm"></div>
            <div class="col-sm-12">
                <router-link class="nav-link btn btn-warning btn-custom col-white" :to="{ name: 'VendorCreate' }">Create vendor</router-link>
                <div class="table-responsive">
                    <table class="table table-sm table-hover table-bordered table-striped">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Url</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody v-if="vendors">
                            <tr v-for="(vendor, key) in vendors" v-bind:key="key">
                                <th scope="row">{{ vendor.id }}</th>
                                <td>{{ vendor.name }}</td>
                                <td>{{ vendor.url }}</td>
                                <td>
                                    <router-link class="btn-action d-inline text-warning" :to="{ name: 'ProductList', params: { vendorId: vendor.id } }">
                                        <font-awesome-icon icon="list" />
                                    </router-link>
                                    <router-link class="btn-action d-inline" :to="{ name: 'VendorEdit', params: { id: vendor.id } }">
                                        <font-awesome-icon icon="edit" />
                                    </router-link>
                                    <a class="btn-action d-inline text-danger" href="" @click="remove(vendor.id, key, $event)">
                                        <font-awesome-icon icon="trash" />
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="col-sm"></div>
        </div>
    </div>
</template>

<script>
import VendorProvider from "@/provider/vendor.provider";

export default {
  props: {
    vendors: {
      required: true
    }
  },
  methods: {
    remove: function(vendorId, key, event) {
      new VendorProvider()
        .remove(vendorId)
        .then(vendor => {
          this.vendors.splice(key, 1);
        })
        .catch(errors => {
          console.log(errors);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
